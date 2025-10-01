import React, { useState } from 'react';
import Typewriter from '../components/Typewriter';
import { playClickSound } from '../utils/sounds';

// Define the project structure
interface Project {
  id: string;
  title: string;
  client: string;
  thumbnailUrl: string;
  category: 'Video Editing' | 'Website Design' | 'Graphic Design';
  youtubeUrl?: string; // For videos
  liveUrl?: string;    // For websites
}

// Simple Modal for viewing graphic design images
const ImageModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4" onClick={onClose}>
        <div className="relative max-w-4xl max-h-full" onClick={e => e.stopPropagation()}>
             <style>{`
              @keyframes fade-in-zoom {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
              }
              .animate-fade-in-zoom { animation: fade-in-zoom 0.3s ease-out forwards; }
            `}</style>
            <img src={imageUrl} alt="Project Detail" className="animate-fade-in-zoom max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
            <button onClick={onClose} className="absolute -top-4 -right-4 bg-[var(--color-text)] text-[var(--color-bg)] h-10 w-10 rounded-full flex items-center justify-center font-bold text-xl hover:brightness-90 transition-transform hover:scale-110">
                &times;
            </button>
        </div>
    </div>
);


// Expanded project data with all three categories
const projects: Project[] = [
  { 
    id: 'phoenix', 
    title: 'Project Phoenix Reel', 
    client: 'Stark Industries',
    category: 'Video Editing',
    thumbnailUrl: 'https://i.ytimg.com/vi/3h0_1H601-Y/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=3h0_1H601-Y'
  },
  { 
    id: 'cascade', 
    title: 'Cascade Web Platform', 
    client: 'AquaCorp',
    category: 'Website Design',
    thumbnailUrl: 'https://cdn.dribbble.com/userupload/4151817/file/original-b233a76c8135868a287961962a9391f1.png?resize=1200x900',
    liveUrl: 'https://example.com/cascade'
  },
   { 
    id: 'nova-brand', 
    title: 'Nova Brand Identity', 
    client: 'Orion Cosmetics',
    category: 'Graphic Design',
    thumbnailUrl: 'https://cdn.dribbble.com/users/105483/screenshots/1781295/media/e4854b735c82669e4a35048a129f5d6f.png?resize=800x600&vertical=center',
  },
  { 
    id: 'nova', 
    title: 'Nova Motion Reel', 
    client: 'Orion Dynamics',
    category: 'Video Editing',
    thumbnailUrl: 'https://i.ytimg.com/vi/U3m_n02r_4k/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=U3m_n02r_4k'
  },
  {
    id: 'cyberspace-solutions',
    title: 'CyberSpace Solutions Site',
    client: 'CyberSpace LLC',
    category: 'Website Design',
    thumbnailUrl: 'https://cdn.dribbble.com/userupload/11993437/file/original-a7b055310619280d45330335e206b83f.jpg?resize=1200x900',
    liveUrl: 'https://example.com/cyberspace',
  },
  {
    id: 'vertex-logo',
    title: 'Vertex Logistics Logo',
    client: 'Vertex Logistics',
    category: 'Graphic Design',
    thumbnailUrl: 'https://cdn.dribbble.com/users/385410/screenshots/1786143/vertex-logo.png?resize=800x600&vertical=center'
  }
];

const categories: ('All' | Project['category'])[] = ['All', 'Video Editing', 'Website Design', 'Graphic Design'];

type FilterType = 'All' | Project['category'];


const Portfolio: React.FC<{ onGoBack: () => void }> = ({ onGoBack }) => {
    const [filter, setFilter] = useState<FilterType>('All');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleGoBack = () => {
        playClickSound();
        onGoBack();
    }
    
    const handleProjectClick = (project: Project) => {
        playClickSound();
        switch (project.category) {
            case 'Video Editing':
                if (project.youtubeUrl) window.open(project.youtubeUrl, '_blank', 'noopener,noreferrer');
                break;
            case 'Website Design':
                if (project.liveUrl) window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                break;
            case 'Graphic Design':
                setSelectedImage(project.thumbnailUrl);
                break;
        }
    };
    
    const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

    const getIconForCategory = (category: Project['category']) => {
        switch (category) {
            case 'Video Editing':
                return <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />;
            case 'Website Design':
                return <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />;
            case 'Graphic Design':
                return <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm6-3a1 1 0 011 1v2h2a1 1 0 110 2H9v2a1 1 0 11-2 0V9H5a1 1 0 110-2h2V6a1 1 0 011-1z" clipRule="evenodd" />;
        }
    }

    return (
        <div>
            <h2 className="text-3xl sm:text-4xl mb-6">
                <Typewriter text="&gt; open /portfolio --view=grid" />
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => { playClickSound(); setFilter(cat); }}
                        className={`py-2 px-4 rounded text-sm sm:text-base transition-colors duration-200 border-2 ${
                            filter === cat
                                ? 'bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]'
                                : 'bg-transparent text-[var(--color-text)] border-[var(--color-input-border)] hover:border-[var(--color-text)]'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(project => (
                    <div 
                        key={project.id}
                        className="group block bg-[var(--color-secondary-bg)] rounded-lg overflow-hidden border border-[var(--color-border)] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[var(--color-border)]/20 cursor-pointer"
                        onClick={() => handleProjectClick(project)}
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && handleProjectClick(project)}
                    >
                        <div className="relative">
                            <img src={project.thumbnailUrl} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                                    {getIconForCategory(project.category)}
                                </svg>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="text-lg font-bold text-[var(--color-text)] truncate">{project.title}</h4>
                            <p className="text-sm text-[var(--color-muted)]">Client: {project.client}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={handleGoBack} className="mt-12 bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-3 px-6 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)]">
                Go Back
            </button>
            
            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => { playClickSound(); setSelectedImage(null); }} />}
        </div>
    );
};

export default Portfolio;
