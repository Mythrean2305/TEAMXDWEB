import React, { useState } from 'react';
import Terminal from './components/Terminal';
import Home from './views/Home';
import GetStarted from './views/GetStarted';
import Portfolio from './views/Portfolio';
import Team from './views/Team';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AdminDashboard from './views/AdminDashboard';
import AdminProjectDetail from './views/AdminProjectDetail';

type View = 'home' | 'getStarted' | 'portfolio' | 'team' | 'login' | 'dashboard' | 'adminDashboard' | 'adminProjectDetail';

export type ProjectStatus = 'IN_PROGRESS' | 'AWAITING_FEEDBACK' | 'COMPLETED' | 'ON_HOLD';

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  clientBrief: string;
  files: { name: string; size: string; type: 'mov' | 'pdf' | 'png' | 'zip' }[];
}

const mockProjects: Project[] = [
    { id: 'p1', name: 'Project Phoenix', client: 'Stark Industries', status: 'IN_PROGRESS', clientBrief: 'Need a high-impact promo video for the new Arc Reactor line. Think fast cuts, dynamic visuals, and a modern feel. Target audience is tech investors and general public. Deadline is tight.', files: [{name: 'brief_v1.pdf', size: '1.2M', type: 'pdf'}, {name: 'raw_footage.zip', size: '2.5G', type: 'zip'}, {name: 'promo_draft_v1.mov', size: '150M', type: 'mov'}] },
    { id: 'p2', name: 'Project Cascade', client: 'AquaCorp', status: 'AWAITING_FEEDBACK', clientBrief: 'The current web platform feels dated. We need a full redesign focusing on user engagement and data visualization for water consumption metrics. Must be mobile-first and highly interactive.', files: [{name: 'design_mockups_v2.pdf', size: '12.5M', type: 'pdf'}, {name: 'user_feedback.csv', size: '300K', type: 'pdf'}, {name: 'style_guide.pdf', size: '2.1M', type: 'pdf'}] },
    { id: 'p3', name: 'Project Nova', client: 'Orion Cosmetics', status: 'COMPLETED', clientBrief: 'Launching a new line of organic cosmetics. Require a full brand identity package: logo, color palette, typography, and social media templates. The vibe should be minimalist, elegant, and natural.', files: [{name: 'final_logo_pack.zip', size: '5.8M', type: 'zip'}, {name: 'brand_guidelines.pdf', size: '3.4M', type: 'pdf'}] },
    { id: 'p4', name: 'Skynet Initiative', client: 'Cyberdyne Systems', status: 'IN_PROGRESS', clientBrief: 'Develop a global AI-powered defense network. UI needs to be intuitive for military personnel. Focus on real-time threat analysis and response automation.', files: [{name: 'technical_spec.pdf', size: '15M', type: 'pdf'}] },
    { id: 'p5', name: 'Gotham Knight Protocol', client: 'Wayne Enterprises', status: 'ON_HOLD', clientBrief: 'Project is currently on hold pending board approval. The goal is a new secure communication network for internal use. All assets need to be encrypted.', files: [{name: 'preliminary_brief.pdf', size: '800K', type: 'pdf'}] },
];


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  const handleLogin = (isAdminLogin: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdminLogin);
    navigateTo(isAdminLogin ? 'adminDashboard' : 'dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
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

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(prevProjects => 
        prevProjects.map(p => p.id === projectId ? { ...p, status: newStatus } : p)
    );
  };

  const renderView = () => {
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
        return <Dashboard projects={projects} />;
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
        // Fallback if no project is selected (shouldn't happen in normal flow)
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