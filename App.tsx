import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import Home from './views/Home';
import GetStarted from './views/GetStarted';
import Portfolio from './views/Portfolio';
import Team from './views/Team';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AdminDashboard from './views/AdminDashboard';
import AdminProjectDetail from './views/AdminProjectDetail';
import { supabase } from './supabaseClient';
import Typewriter from './components/Typewriter';
import { Session, User } from '@supabase/supabase-js';

type View = 'home' | 'getStarted' | 'portfolio' | 'team' | 'login' | 'dashboard' | 'adminDashboard' | 'adminProjectDetail';

export type ProjectStatus = 'IN_PROGRESS' | 'AWAITING_FEEDBACK' | 'COMPLETED' | 'ON_HOLD';

export interface Project {
  id: string;
  name: string;
  client: string;
  email?: string;
  status: ProjectStatus;
  clientBrief: string;
  files: { name: string; size: string; type: 'mov' | 'pdf' | 'png' | 'zip' }[];
  user_id?: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isAdmin = session?.user?.email?.toLowerCase() === 'admin@teamxd.com';

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      // Don't fetch if there's no active session.
      if (!session) {
        setProjects([]);
        setLoading(false);
        return;
      }
      setLoading(true);

      let query = supabase.from('projects').select('*');

      // If the user is not an admin, filter projects by their user ID to respect RLS policies.
      if (!isAdmin) {
        query = query.eq('user_id', session.user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching projects:', error);
        alert('Since no projects are found under your name . Mock projects will be shown');
      } else if (data) {
        setProjects(data as Project[]);
      }
      setLoading(false);
    };

    fetchProjects();
  }, [session, isAdmin]);
  
  useEffect(() => {
    // Redirect logic
    if (session && currentView === 'login') {
      navigateTo(isAdmin ? 'adminDashboard' : 'dashboard');
    }
    // Protect dashboard routes
    if (!session && (currentView === 'dashboard' || currentView === 'adminDashboard' || currentView === 'adminProjectDetail')) {
      navigateTo('home');
    }
  }, [session, currentView, isAdmin]);


  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSelectedProjectId(null);
    navigateTo('home');
  };
  
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    navigateTo('adminProjectDetail');
  }

  const handleBackToAdminDashboard = () => {
    setSelectedProjectId(null);
    navigateTo('adminDashboard');
  }

  const handleStatusChange = async (projectId: string, newStatus: ProjectStatus) => {
    setProjects(prevProjects => 
        prevProjects.map(p => p.id === projectId ? { ...p, status: newStatus } : p)
    );
    // The optimistic update is already handled. The original function in AdminProjectDetail
    // now handles the DB update directly. This function is just to update the parent state.
  };

  const renderView = () => {
    if (loading) {
        return <div className="text-center text-lg"><Typewriter text="Initializing system..." /></div>;
    }
    
    switch(currentView) {
      case 'home':
        return <Home 
          onGetStarted={() => navigateTo('getStarted')} 
          onViewPortfolio={() => navigateTo('portfolio')}
          onViewTeam={() => navigateTo('team')}
        />;
      case 'getStarted':
        return <GetStarted onGoBack={() => navigateTo('home')} session={session} />;
      case 'portfolio':
        return <Portfolio onGoBack={() => navigateTo('home')} />;
      case 'team':
        return <Team onGoBack={() => navigateTo('home')} />;
      case 'login':
        return <Login onGoBack={() => navigateTo('home')} />;
      case 'dashboard':
        return <Dashboard projects={projects} user={session?.user} />;
      case 'adminDashboard':
        return <AdminDashboard projects={projects} onSelectProject={handleSelectProject} />;
      case 'adminProjectDetail': {
        const selectedProject = projects.find(p => p.id === selectedProjectId);
        if (selectedProject) {
            return <AdminProjectDetail 
                project={selectedProject} 
                onGoBack={handleBackToAdminDashboard}
                onStatusChange={handleStatusChange}
            />;
        }
        // If project not found (e.g. due to RLS change), go back to dashboard
        navigateTo('adminDashboard');
        return <AdminDashboard projects={projects} onSelectProject={handleSelectProject} />;
      }
      default:
        return <Home 
          onGetStarted={() => navigateTo('getStarted')} 
          onViewPortfolio={() => navigateTo('portfolio')}
          onViewTeam={() => navigateTo('team')}
        />;
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen p-4 sm:p-10">
      <Terminal
        isAuthenticated={!!session}
        isAdmin={isAdmin}
        onLogin={() => navigateTo('login')}
        onDashboard={() => navigateTo('dashboard')}
        onAdminDashboard={() => navigateTo('adminDashboard')}
        onLogout={handleLogout}
      >
        {renderView()}
      </Terminal>
    </div>
  );
};

export default App;
