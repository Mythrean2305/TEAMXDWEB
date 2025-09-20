import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  onExplore: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, onExplore }) => {
  return (
    <div className="bg-[var(--color-secondary-bg)] my-5 mx-auto p-5 rounded-lg border border-[var(--color-border)] max-w-3xl text-left shadow-[0_0_10px_rgba(0,255,127,0.2)]">
      <h4 className="text-xl text-[var(--color-text)] mb-2">{title}</h4>
      <p className="text-base text-[var(--color-muted)] mb-4">{description}</p>
      <button 
        onClick={onExplore}
        className="w-full py-3.5 text-base rounded-md border-2 border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)] font-bold cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-[var(--color-text)]"
      >
        Explore Service
      </button>
    </div>
  );
};

export default ServiceCard;
