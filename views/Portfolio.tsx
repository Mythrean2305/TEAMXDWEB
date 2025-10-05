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
  youtubeId?: string;
  websiteUrl?: string;
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
              .media-container {
                position: relative;
                padding-bottom: 56.25%; /* 16:9 */
                height: 0;
                overflow: hidden;
                max-width: 100%;
                background: #000;
              }
              .media-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            `}</style>
            <h3 className="text-xl sm:text-2xl text-[var(--color-text)] mb-4">{project.title}</h3>
            
            {project.youtubeId && (
              <div className="media-container mb-4 rounded-lg overflow-hidden border border-[var(--color-border)]/50">
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            {project.websiteUrl && (
              <div className="media-container mb-4 rounded-lg overflow-hidden border border-[var(--color-border)]/50">
                <iframe
                  src={project.websiteUrl}
                  title={project.title}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            <p className="text-[var(--color-muted)] mb-2"><strong>&gt; Client:</strong> {project.client}</p>
            <p className="text-[var(--color-muted)] mb-4"><strong>&gt; Type:</strong> {project.type}</p>
            <p className="text-[var(--color-muted)] mb-6 text-base sm:text-lg">{project.description}</p>
            <button onClick={onClose} className="w-full sm:w-auto bg-[var(--color-text)] text-[var(--color-bg)] font-bold py-2 px-6 rounded transition duration-300 hover:brightness-90">
                Close
            </button>
        </div>
    </div>
);


// HOW TO EDIT:
// To change the wording, just edit the text in `title`, `client`, `type`, and `description` below.
// To change the video, find the YouTube video ID and paste it into the `youtubeId` field.
// To change the website, paste the full URL (e.g., "https://example.com") into the `websiteUrl` field.
const projects: Project[] = [
  { id: 'phoenix', file: 'valorantedit.mov', size: '', date: 'May 7', title: 'Project Valo', client: 'Reconnecting Gaming', type: 'Gaming Video', description: 'A high-energy editing video with flowy edits of the gameplay valorant under 10 seconds.', youtubeId: 'ZEpBnEPP8Jg' /* <-- PASTE YOUR YOUTUBE ID HERE */ },
  { id: 'cascade', file: 'project_cascade.web', size: '1.2M', date: 'Apr 28', title: 'Cascade Web Platform', client: 'AquaCorp', type: 'Website Design', description: 'A fully responsive and interactive web platform for a water conservation initiative. The design focuses on data visualization and user engagement.', websiteUrl: 'http://welcome.hackclubvit.xyz' /* <-- PASTE YOUR WEBSITE URL HERE */ },
//   { id: 'nova', file: 'brand_identity_nova.pdf', size: '850K', date: 'Mar 19', title: 'Nova Brand Identity', client: 'Orion Cosmetics', type: 'Graphic Design', description: 'A complete branding package including logo design, color palette, typography, and marketing asset templates for a new line of organic cosmetics.' },
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                    <div 
                        key={p.id} 
                        onClick={() => handleOpenProject(p)}
                        className="bg-[var(--color-secondary-bg)] border border-[var(--color-border)]/50 rounded-lg p-5 text-left cursor-pointer transition-all duration-300 hover:border-[var(--color-border)] hover:shadow-[0_0_15px_var(--color-border)] hover:-translate-y-1"
                    >
                        <h4 className="text-xl text-[var(--color-text)] mb-2 truncate">{p.file}</h4>
                        <p className="text-sm text-[var(--color-muted)]">client: {p.client}</p>
                        <p className="text-sm text-[var(--color-muted)] mb-3">type: {p.type}</p>
                        <p className="text-right text-xs text-zinc-500 mt-4">{p.size} - {p.date}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleGoBack} className="mt-12 bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-3 px-6 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)]">
                Go Back
            </button>
            
            {selectedProject && <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />}
        </div>
    );
};

export default Portfolio;