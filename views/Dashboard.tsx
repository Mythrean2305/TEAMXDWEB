import React from 'react';
import Typewriter from '../components/Typewriter';
import { Project } from '../App';
import { User } from '@supabase/supabase-js';
import { playClickSound } from '../utils/sounds';

interface DashboardProps {
    projects: Project[];
    user?: User | null;
    onInitiateNewProject: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, user, onInitiateNewProject }) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'IN_PROGRESS': return 'text-yellow-400';
            case 'AWAITING_FEEDBACK': return 'text-blue-400';
            case 'COMPLETED': return 'text-green-400';
            case 'ON_HOLD': return 'text-gray-400';
            default: return 'text-[var(--color-muted)]';
        }
    };
    
    const welcomeMessage = user?.email ? `> Welcome back, ${user.email}.` : '> Welcome back, Client.';

    const handleNewProjectClick = () => {
        playClickSound();
        onInitiateNewProject();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h2 className="text-3xl sm:text-4xl">
                    <Typewriter text={welcomeMessage} />
                </h2>
                <button
                    onClick={handleNewProjectClick}
                    className="bg-transparent border-2 border-[var(--color-text)] text-[var(--color-text)] py-2 px-4 cursor-pointer text-sm transition duration-300 rounded hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
                >
                    + Submit New Brief
                </button>
            </div>

            <div className="space-y-12">
                {/* Project Status Section */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt ls --status /projects</h3>
                    <div className="text-base sm:text-lg pl-4 border-l-2 border-[var(--color-border)]/50">
                        {projects.length > 0 ? (
                            projects.map(p => (
                                <div key={p.id} className="flex">
                                    <span className={`inline-block w-52 flex-shrink-0 ${getStatusColor(p.status)}`}>[{p.status}]</span>
                                    <span>{p.name}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-[var(--color-muted)]">No active projects found. Use the button above to submit a new brief.</p>
                        )}
                    </div>
                </div>

                {/* Recent Activity Section (Placeholder) */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt tail -f /var/log/activity.log</h3>
                    <div className="text-base sm:text-lg whitespace-pre-wrap pl-4 border-l-2 border-[var(--color-border)]/50 font-mono">
                        <p className="text-[var(--color-muted)]">Activity log feature coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;