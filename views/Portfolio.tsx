import React from 'react';
import Typewriter from '../components/Typewriter';
import { playClickSound } from '../utils/sounds';

interface Project {
  id: string;
  title: string;
  client: string;
  thumbnailUrl: string;
  youtubeUrl: string;
}

const projects: Project[] = [
  { 
    id: 'phoenix', 
    title: 'Project Phoenix', 
    client: 'Stark Industries',
    thumbnailUrl: 'https://i.ytimg.com/vi/3h0_1H601-Y/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=3h0_1H601-Y'
  },
  { 
    id: 'cascade', 
    title: 'Cascade Web Platform', 
    client: 'AquaCorp',
    thumbnailUrl: 'https://i.ytimg.com/vi/V-h0_Ga_U4s/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=V-h0_Ga_U4s'
  },
  { 
    id: 'nova', 
    title: 'Nova Motion Reel', 
    client: 'Orion Dynamics',
    thumbnailUrl: 'https://i.ytimg.com/vi/U3m_n02r_4k/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=U3m_n02r_4k'
  },
];

interface PortfolioProps {
  onGoBack: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onGoBack }) => {
    
    const handleGoBack = () => {
        playClickSound();
        onGoBack();
    }

    return (
        <div>
            <h2 className="text-3xl sm:text-4xl mb-8">
                <Typewriter text="&gt; open /portfolio --view=grid" />
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <a 
                        key={project.id}
                        href={project.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-[var(--color-secondary-bg)] rounded-lg overflow-hidden border border-[var(--color-border)] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[var(--color-border)]/20"
                        onClick={() => playClickSound()}
                    >
                        <div className="relative">
                            <img src={project.thumbnailUrl} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="text-lg font-bold text-[var(--color-text)] truncate">{project.title}</h4>
                            <p className="text-sm text-[var(--color-muted)]">Client: {project.client}</p>
                        </div>
                    </a>
                ))}
            </div>

            <button onClick={handleGoBack} className="mt-12 bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-3 px-6 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)]">
                Go Back
            </button>
        </div>
    );
};

export default Portfolio;