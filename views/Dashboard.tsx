import React from 'react';
import Typewriter from '../components/Typewriter';
import { Project } from '../App';
import { User } from '@supabase/supabase-js';

interface DashboardProps {
    projects: Project[];
    user?: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, user }) => {

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

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl sm:text-4xl">
                    <Typewriter text={welcomeMessage} />
                </h2>
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
                            <p className="text-[var(--color-muted)]">No active projects found.</p>
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
