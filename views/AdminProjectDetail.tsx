import React, { useState } from 'react';
import { Project, ProjectStatus } from '../App';
import Typewriter from '../components/Typewriter';
import { playClickSound } from '../utils/sounds';

interface AdminProjectDetailProps {
    project: Project;
    onGoBack: () => void;
    onStatusChange: (projectId: string, newStatus: ProjectStatus) => void;
}

const statusOptions: ProjectStatus[] = ['IN_PROGRESS', 'AWAITING_FEEDBACK', 'COMPLETED', 'ON_HOLD'];

const AdminProjectDetail: React.FC<AdminProjectDetailProps> = ({ project, onGoBack, onStatusChange }) => {
    const [currentStatus, setCurrentStatus] = useState<ProjectStatus>(project.status);
    
    const handleGoBack = () => {
        playClickSound();
        onGoBack();
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        playClickSound();
        const newStatus = e.target.value as ProjectStatus;
        setCurrentStatus(newStatus);
        onStatusChange(project.id, newStatus); // Update state in App.tsx
    }
    
    const getStatusColor = (status: ProjectStatus) => {
        switch (status) {
            case 'IN_PROGRESS': return 'text-yellow-400 border-yellow-400';
            case 'AWAITING_FEEDBACK': return 'text-blue-400 border-blue-400';
            case 'COMPLETED': return 'text-green-400 border-green-400';
            case 'ON_HOLD': return 'text-gray-400 border-gray-400';
            default: return 'text-[var(--color-muted)] border-[var(--color-muted)]';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl sm:text-3xl max-w-3xl">
                    <Typewriter text={`> Viewing Project: ${project.name}`} />
                </h2>
                <button onClick={handleGoBack} className="bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-2 px-4 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)] text-sm flex-shrink-0">
                    &lt; Back to Panel
                </button>
            </div>

            <div className="space-y-10">
                {/* Metadata and Status */}
                <div className="pl-4 border-l-2 border-[var(--color-border)]/50">
                    <p className="text-lg"><span className="text-[var(--color-muted)]">Client:</span> {project.client}</p>
                    <div className="flex items-center mt-2">
                        <label htmlFor="status-select" className="text-lg text-[var(--color-muted)] mr-3">Status:</label>
                        <select
                            id="status-select"
                            value={currentStatus}
                            onChange={handleSelectChange}
                            className={`bg-transparent border-2 rounded px-2 py-1 text-lg font-bold outline-none focus:ring-0 focus:border-[var(--color-text)] transition-colors ${getStatusColor(currentStatus)}`}
                        >
                            {statusOptions.map(option => (
                                <option key={option} value={option} className="bg-[var(--color-bg)] text-white">
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* Client Brief */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt; cat /docs/client_brief.txt</h3>
                     <div className="text-base sm:text-lg whitespace-pre-wrap pl-4 border-l-2 border-[var(--color-border)]/50 bg-[var(--color-secondary-bg)] p-4 rounded">
                        <p className="text-[var(--color-muted)]">{project.clientBrief}</p>
                    </div>
                </div>

                {/* Project Files */}
                <div>
                    <h3 className="text-2xl mb-4 cursor-blink">&gt; ls -l /assets</h3>
                    <div className="text-base sm:text-lg whitespace-pre-wrap pl-4 border-l-2 border-[var(--color-border)]/50 font-mono">
                        <p className="text-[var(--color-muted)]">Permissions  Size      Name</p>
                        <p className="text-[var(--color-muted)]">-----------  --------  ----</p>
                        {project.files.map((file, index) => (
                            <p key={index}>
                                <span className="text-zinc-500">-rw-r--r-- </span>
                                <span className="inline-block w-16 text-right">{file.size}</span>
                                {'  '}
                                <span className="text-cyan-400">{file.name}</span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProjectDetail;