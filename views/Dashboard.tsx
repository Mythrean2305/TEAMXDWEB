import React from 'react';
import Typewriter from '../components/Typewriter';

interface DashboardProps {}

const mockProjects = [
    { status: 'IN_PROGRESS', name: 'Project Nova - Brand Identity' },
    { status: 'AWAITING_FEEDBACK', name: 'Project Cascade - Web Platform v2' },
    { status: 'COMPLETED', name: 'Project Phoenix - Promo Video' },
];

const mockActivity = [
    { timestamp: '2023-10-27 14:30', event: '[COMMENT] You: "Looks great! Just one small revision on the logo."' },
    { timestamp: '2023-10-27 10:15', event: '[UPLOAD]  StudioX uploaded \'logo_draft_v3.png\'' },
    { timestamp: '2023-10-26 18:00', event: '[STATUS]  Project Nova changed to \'AWAITING_FEEDBACK\'' },
];

const Dashboard: React.FC<DashboardProps> = () => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'IN_PROGRESS': return 'text-yellow-400';
            case 'AWAITING_FEEDBACK': return 'text-blue-400';
            case 'COMPLETED': return 'text-green-400';
            default: return 'text-[var(--color-muted)]';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl sm:text-4xl">
                    <Typewriter text="> Welcome back, Client." />
                </h2>
            </div>

            <div className="space-y-12">
                {/* Project Status Section */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt; ls --status /projects</h3>
                    <div className="text-base sm:text-lg pl-4 border-l-2 border-[var(--color-border)]/50">
                        {mockProjects.map(p => (
                            <div key={p.name} className="flex">
                                <span className={`inline-block w-52 flex-shrink-0 ${getStatusColor(p.status)}`}>[{p.status}]</span>
                                <span>{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt; tail -f /var/log/activity.log</h3>
                    <div className="text-base sm:text-lg whitespace-pre-wrap pl-4 border-l-2 border-[var(--color-border)]/50 font-mono">
                        {mockActivity.map((act, index) => (
                            <p key={index}>
                                <span className="text-[var(--color-muted)] mr-4">{act.timestamp}</span>
                                <span>{act.event}</span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;