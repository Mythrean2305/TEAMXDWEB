import React, { useState } from 'react';
import Typewriter from '../components/Typewriter';
import { playClickSound } from '../utils/sounds';

interface Project {
  id: string;
  file: string;
  size: string;
  date: string;
  title: string;
  client: string;
  type: string;
  description: string;
}

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

// Modal component defined within the same file for simplicity
const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
        <div className="bg-[var(--color-bg)] border-2 border-[var(--color-border)] rounded-lg p-6 sm:p-8 max-w-2xl w-full text-white animate-fade-in" onClick={e => e.stopPropagation()}>
            <style>{`
              @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
              .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
            <h3 className="text-xl sm:text-2xl text-[var(--color-text)] mb-4">{project.title}</h3>
            <p className="text-[var(--color-muted)] mb-2"><strong>&gt; Client:</strong> {project.client}</p>
            <p className="text-[var(--color-muted)] mb-4"><strong>&gt; Type:</strong> {project.type}</p>
            <p className="text-[var(--color-muted)] mb-6 text-base sm:text-lg">{project.description}</p>
            <button onClick={onClose} className="w-full sm:w-auto bg-[var(--color-text)] text-[var(--color-bg)] font-bold py-2 px-6 rounded transition duration-300 hover:brightness-90">
                Close
            </button>
        </div>
    </div>
);


const projects: Project[] = [
  { id: 'phoenix', file: 'project_phoenix.mov', size: '4.5M', date: 'May 12', title: 'Project Phoenix', client: 'Stark Industries', type: 'Promotional Video', description: 'A high-energy promotional video showcasing the launch of a new tech product line, featuring dynamic motion graphics and a powerful cinematic score.' },
  { id: 'cascade', file: 'project_cascade.web', size: '1.2M', date: 'Apr 28', title: 'Cascade Web Platform', client: 'AquaCorp', type: 'Website Design', description: 'A fully responsive and interactive web platform for a water conservation initiative. The design focuses on data visualization and user engagement.' },
  { id: 'nova', file: 'brand_identity_nova.pdf', size: '850K', date: 'Mar 19', title: 'Nova Brand Identity', client: 'Orion Cosmetics', type: 'Graphic Design', description: 'A complete branding package including logo design, color palette, typography, and marketing asset templates for a new line of organic cosmetics.' },
];

interface PortfolioProps {
  onGoBack: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onGoBack }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleOpenProject = (project: Project) => {
        playClickSound();
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        playClickSound();
        setSelectedProject(null);
    };
    
    const handleGoBack = () => {
        playClickSound();
        onGoBack();
    }

    return (
        <div>
            <h2 className="text-3xl sm:text-4xl mb-8">
                <Typewriter text="&gt; ls /portfolio" />
            </h2>
            <div className="text-base sm:text-lg whitespace-pre-wrap">
                <p className="text-[var(--color-muted)]">Permissions  Size   Date      Name</p>
                <p className="text-[var(--color-muted)]">-----------  -----  --------  ----</p>
                {projects.map(p => (
                    <p key={p.id}>
                        <span className="text-zinc-500">-rw-r--r-- </span>
                        <span className="inline-block w-12 text-right">{p.size}</span>
                        <span className="inline-block w-16 text-right">{p.date}</span>
                        {'  '}
                        <button onClick={() => handleOpenProject(p)} className="text-[var(--color-text)] hover:underline focus:outline-none focus:bg-[var(--color-text)]/20 rounded px-1">
                            {p.file}
                        </button>
                    </p>
                ))}
            </div>
            <button onClick={handleGoBack} className="mt-8 bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-3 px-6 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)]">
                Go Back
            </button>
            {selectedProject && <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />}
        </div>
    );
};

export default Portfolio;