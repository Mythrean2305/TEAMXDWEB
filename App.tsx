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
import ClientProjectDetail from './views/ClientProjectDetail';
import { supabase, Project, ProjectStatus } from './supabaseClient';
import Typewriter from './components/Typewriter';

type View = 'home' | 'getStarted' | 'portfolio' | 'team' | 'login' | 'dashboard' | 'adminDashboard' | 'adminProjectDetail' | 'clientProjectDetail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        const userIsAdmin = session.user.email?.toLowerCase() === 'admin@teamxd.com';
        setIsAdmin(userIsAdmin);

        let query = supabase.from('projects').select('*');
        if (!userIsAdmin) {
          query = query.eq('email', session.user.email);
        }
        
        const { data, error } = await query;

        if (error) {
          console.error('Error fetching projects:', error);
          alert('Could not fetch project data.');
        } else if (data) {
          setProjects(data as Project[]);
        }
        
        // If already on a public page, stay there. Otherwise, go to dashboard.
        if (!['home', 'getStarted', 'portfolio', 'team'].includes(currentView)) {
           navigateTo(userIsAdmin ? 'adminDashboard' : 'dashboard');
        }

      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setProjects([]);
        if (currentView !== 'home') {
            navigateTo('home');
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  const handleLogin = (isAdminLogin: boolean) => {
    // onAuthStateChange will handle navigation and state updates
    setIsAuthenticated(true);
    setIsAdmin(isAdminLogin);
    navigateTo(isAdminLogin ? 'adminDashboard' : 'dashboard');
  };

  const handleLogout = async () => {
    setSelectedProjectId(null);
    await supabase.auth.signOut();
  };
  
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    navigateTo('adminProjectDetail');
  }

  const handleSelectClientProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    navigateTo('clientProjectDetail');
  }

  const handleBackToAdminDashboard = () => {
    setSelectedProjectId(null);
    navigateTo('adminDashboard');
  }
  
  const handleBackToDashboard = () => {
    setSelectedProjectId(null);
    navigateTo('dashboard');
  }

  const handleStatusChange = async (projectId: string, newStatus: ProjectStatus) => {
    // Optimistic UI update
    setProjects(prevProjects => 
        prevProjects.map(p => p.id === projectId ? { ...p, status: newStatus } : p)
    );
    // Persist to DB
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', projectId);
    
    if (error) {
      console.error("Error updating status:", error);
      alert("Failed to save status change. Reverting.");
      // Revert on failure by re-fetching, or rollback local state (easier)
      const originalProject = projects.find(p => p.id === projectId);
      if (originalProject) {
         setProjects(prevProjects => 
            prevProjects.map(p => p.id === projectId ? originalProject : p)
        );
      }
    }
  };

  const renderView = () => {
    if (loading && currentView !== 'home') {
        return <div className="text-center text-lg"><Typewriter text="Establishing secure connection..." /></div>;
    }
    
    switch(currentView) {
      case 'home':
        return <Home 
          onGetStarted={() => navigateTo('getStarted')} 
          onViewPortfolio={() => navigateTo('portfolio')}
          onViewTeam={() => navigateTo('team')}
        />;
      case 'getStarted':
        return <GetStarted onGoBack={() => navigateTo('home')} />;
      case 'portfolio':
        return <Portfolio onGoBack={() => navigateTo('home')} />;
      case 'team':
        return <Team onGoBack={() => navigateTo('home')} />;
      case 'login':
        return <Login onLogin={handleLogin} onGoBack={() => navigateTo('home')} />;
      case 'dashboard':
        return <Dashboard projects={projects} onSelectProject={handleSelectClientProject} />;
      case 'adminDashboard':
        return <AdminDashboard projects={projects} onSelectProject={handleSelectProject} />;
      case 'clientProjectDetail': {
        const selectedProject = projects.find(p => p.id === selectedProjectId);
        if (selectedProject) {
            return <ClientProjectDetail
                project={selectedProject} 
                onGoBack={handleBackToDashboard}
            />;
        }
        return <Dashboard projects={projects} onSelectProject={handleSelectClientProject} />;
      }
      case 'adminProjectDetail': {
        const selectedProject = projects.find(p => p.id === selectedProjectId);
        if (selectedProject) {
            return <AdminProjectDetail 
                project={selectedProject} 
                onGoBack={handleBackToAdminDashboard}
                onStatusChange={handleStatusChange}
            />;
        }
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
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLogin={() => navigateTo('login')}
        onDashboard={() => navigateTo(isAdmin ? 'adminDashboard' : 'dashboard')}
        onAdminDashboard={() => navigateTo('adminDashboard')}
        onLogout={handleLogout}
      >
        {renderView()}
      </Terminal>
    </div>
  );
};

export default App;