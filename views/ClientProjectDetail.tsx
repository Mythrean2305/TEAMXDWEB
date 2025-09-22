import React from 'react';
import { Project, ProjectStatus } from '../supabaseClient';
import Typewriter from '../components/Typewriter';
import { playClickSound } from '../utils/sounds';

interface ClientProjectDetailProps {
    project: Project;
    onGoBack: () => void;
}

const ClientProjectDetail: React.FC<ClientProjectDetailProps> = ({ project, onGoBack }) => {
    
    const handleGoBack = () => {
        playClickSound();
        onGoBack();
    }
    
    const getStatusColor = (status: ProjectStatus) => {
        switch (status) {
            case 'IN_PROGRESS': return 'text-yellow-400';
            case 'AWAITING_FEEDBACK': return 'text-blue-400';
            case 'COMPLETED': return 'text-green-400';
            case 'ON_HOLD': return 'text-gray-400';
            default: return 'text-[var(--color-muted)]';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl sm:text-3xl max-w-3xl">
                    <Typewriter text={`> Viewing Project: ${project.name}`} />
                </h2>
                <button onClick={handleGoBack} className="bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-2 px-4 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)] text-sm flex-shrink-0">
                    &lt; Back to Dashboard
                </button>
            </div>
            
            <div className="space-y-10">
                {/* Metadata and Status */}
                <div className="pl-4 border-l-2 border-[var(--color-border)]/50">
                    <p className="text-lg">
                        <span className="text-[var(--color-muted)]">Status: </span> 
                        <span className={`font-bold ${getStatusColor(project.status)}`}>{project.status.replace('_', ' ')}</span>
                    </p>
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
                        {(project.files && project.files.length > 0) ? (
                            project.files.map((file, index) => (
                                <p key={index}>
                                    <span className="text-zinc-500">-rw-r--r-- </span>
                                    <span className="inline-block w-16 text-right">{file.size}</span>
                                    {'  '}
                                    <span className="text-cyan-400">{file.name}</span>
                                </p>
                            ))
                        ) : (
                             <p className="text-zinc-500">No files uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProjectDetail;