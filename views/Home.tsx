import React, { useState } from 'react';
import Typewriter from '../components/Typewriter';
import ServiceCard from '../components/ServiceCard';
import { playClickSound } from '../utils/sounds';

interface HomeProps {
  onGetStarted: () => void;
  onViewPortfolio: () => void;
  onViewTeam: () => void;
}

const Home: React.FC<HomeProps> = ({ 
  onGetStarted, 
  onViewPortfolio, 
  onViewTeam, 
}) => {
  const [subtextStarted, setSubtextStarted] = useState(false);
  
  const services = [
    { title: "🎬 Video Editing", description: "Cinematic cuts, reels, promos." },
    { title: "🌐 Website Design", description: "Responsive, modern, user-friendly." },
    { title: "🎨 Graphic Design", description: "Logos, branding, marketing assets." },
  ];

  const handleSoundClick = (callback: () => void) => {
    playClickSound();
    callback();
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-4xl mb-5 h-10 sm:h-12">
        <Typewriter text="Crafting Visual Stories That Resonate" onFinished={() => setSubtextStarted(true)} />
      </h2>
      <p className="text-base sm:text-lg text-[var(--color-muted)] mb-6 h-20 sm:h-16">
        <Typewriter text="We're a creative agency specializing in video editing, website design, and graphic design." start={subtextStarted} />
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button 
          onClick={() => handleSoundClick(onGetStarted)}
          className="bg-transparent border-2 border-[var(--color-text)] text-[var(--color-text)] py-3 px-6 cursor-pointer text-lg transition duration-300 rounded hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
        >
          Get Started
        </button>
        <button 
          onClick={() => handleSoundClick(onViewPortfolio)}
          className="bg-transparent border-2 border-[var(--color-text)] text-[var(--color-text)] py-3 px-6 cursor-pointer text-lg transition duration-300 rounded hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
        >
          View Portfolio
        </button>
        <button
          onClick={() => handleSoundClick(onViewTeam)}
          className="bg-transparent border-2 border-[var(--color-text)] text-[var(--color-text)] py-3 px-6 cursor-pointer text-lg transition duration-300 rounded hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
        >
          whoami
        </button>
      </div>

      <section className="mt-16 text-center">
        <h2 className="text-2xl sm:text-3xl mb-2 text-[var(--color-text)]">Our Services</h2>
        <p className="text-lg text-[var(--color-muted)] mb-6">We offer a range of creative services to help your business thrive.</p>
        
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            title={service.title} 
            description={service.description} 
            onExplore={() => handleSoundClick(onGetStarted)} 
          />
        ))}
      </section>
    </div>
  );
};

export default Home;