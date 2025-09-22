import React from 'react';
import Typewriter from '../components/Typewriter';
import { Project, ProjectStatus } from '../supabaseClient';
import { playClickSound } from '../utils/sounds';

interface AdminDashboardProps {
    projects: Project[];
    onSelectProject: (id: string) => void;
}

const mockStats = [
    { label: 'Total Projects', value: 27 },
    { label: 'Active Clients', value: 12 },
    { label: 'Pending Briefs', value: 3 },
];

const mockSubmissions = [
    { timestamp: '2023-10-28 09:15', event: '[NEW_BRIEF] From: j.doe@example.com, Service: Website Design' },
    { timestamp: '2023-10-28 11:45', event: '[NEW_BRIEF] From: s.smith@example.com, Service: Video Editing' },
    { timestamp: '2023-10-28 16:20', event: '[NEW_BRIEF] From: m.jones@example.com, Service: Graphic Design' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, onSelectProject }) => {

    const getStatusColor = (status: ProjectStatus) => {
        switch (status) {
            case 'IN_PROGRESS': return 'text-yellow-400';
            case 'AWAITING_FEEDBACK': return 'text-blue-400';
            case 'COMPLETED': return 'text-green-400';
            case 'ON_HOLD': return 'text-gray-400';
            default: return 'text-[var(--color-muted)]';
        }
    };

    const handleProjectClick = (id: string) => {
        playClickSound();
        onSelectProject(id);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl sm:text-4xl">
                    <Typewriter text="&gt; Admin Control Panel" />
                </h2>
            </div>

            <div className="space-y-12">
                {/* System Stats */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt; cat /proc/sys/stats</h3>
                    <div className="text-base sm:text-lg pl-4 border-l-2 border-[var(--color-border)]/50 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2">
                        {mockStats.map(stat => (
                           <div key={stat.label}>
                                <span className="text-[var(--color-muted)]">{stat.label}: </span>
                                <span className="text-white font-bold">{stat.value}</span>
                           </div>
                        ))}
                    </div>
                </div>

                {/* All Projects Monitor */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt; ps -aux --view-projects</h3>
                    <div className="text-base sm:text-lg pl-4 border-l-2 border-[var(--color-border)]/50">
                        {projects.map(p => (
                            <button key={p.id} onClick={() => handleProjectClick(p.id)} className="w-full text-left flex flex-wrap hover:bg-[var(--color-text)]/10 rounded px-2 py-0.5 transition-colors">
                                <span className="inline-block w-48 flex-shrink-0 text-cyan-400">[{p.client}]</span>
                                <span className={`inline-block w-52 flex-shrink-0 ${getStatusColor(p.status)}`}>[{p.status}]</span>
                                {/* Fix: Corrected property access to 'name' to match the Project interface. */}
                                <span>{p.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Submissions */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt; tail -f /var/log/submissions.log</h3>
                    <div className="text-base sm:text-lg whitespace-pre-wrap pl-4 border-l-2 border-[var(--color-border)]/50 font-mono">
                        {mockSubmissions.map((act, index) => (
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

export default AdminDashboard;