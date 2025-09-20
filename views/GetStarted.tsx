import React, { useState } from 'react';
import Typewriter from '../components/Typewriter';
import { playClickSound } from '../utils/sounds';

interface GetStartedProps {
  onGoBack: () => void;
}

type Service = 'Video Editing' | 'Website Design' | 'Graphic Design';

const services: Service[] = ['Video Editing', 'Website Design', 'Graphic Design'];

const GetStarted: React.FC<GetStartedProps> = ({ onGoBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    details: '',
    name: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleNext = () => {
    playClickSound();
    setStep(prev => prev + 1);
  };
  const handleBack = () => {
    playClickSound();
    setStep(prev => prev - 1);
  };
  
  const handleGoHome = () => {
    playClickSound();
    onGoBack();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleServiceSelect = (service: Service) => {
    playClickSound();
    setFormData(prev => ({ ...prev, service }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setStatus('submitting');
    setTimeout(() => {
        setStatus('success');
    }, 2500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl mb-6 cursor-blink">Step 1: Select a Service</h3>
            <div className="space-y-4">
              {services.map(service => (
                <div key={service} onClick={() => handleServiceSelect(service)} className={`border-2 p-4 rounded cursor-pointer transition-all duration-200 ${formData.service === service ? 'border-[var(--color-text)] bg-[var(--color-text)]/20' : 'border-[var(--color-input-border)] hover:border-[var(--color-text)]'}`}>
                  <label className="flex items-center space-x-4 cursor-pointer">
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.service === service ? 'border-[var(--color-text)]' : 'border-[var(--color-input-border)]'}`}>
                       {formData.service === service && <div className="w-3 h-3 bg-[var(--color-text)] rounded-full"></div>}
                     </div>
                     <span className="text-xl">{service}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-2xl mb-6 cursor-blink">Step 2: Project Details</h3>
            <p className="text-[var(--color-muted)] mb-4">Briefly describe your project or what you're looking for.</p>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={6}
              className="w-full bg-[var(--color-bg)] border-2 border-[var(--color-input-border)] focus:border-[var(--color-text)] focus:ring-0 outline-none p-4 rounded text-lg placeholder-gray-500 text-white"
              placeholder="e.g., 'I need a 1-minute promotional video for my new product...'"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-2xl mb-6 cursor-blink">Step 3: Contact Information</h3>
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[var(--color-bg)] border-2 border-[var(--color-input-border)] focus:border-[var(--color-text)] focus:ring-0 outline-none p-4 rounded text-lg placeholder-gray-500 text-white"
                placeholder="Your Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[var(--color-bg)] border-2 border-[var(--color-input-border)] focus:border-[var(--color-text)] focus:ring-0 outline-none p-4 rounded text-lg placeholder-gray-500 text-white"
                placeholder="Your Email"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  if (status === 'submitting') {
    return (
        <div>
            <p className="text-xl"><Typewriter text="[INFO] Encrypting and transmitting data to StudioX servers..." /></p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
              <div className="bg-[var(--color-text)] h-2.5 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
        </div>
    );
  }

  if (status === 'success') {
    return (
        <div className="text-center">
            <h3 className="text-3xl text-[var(--color-text)] mb-4">
                <Typewriter text="[SUCCESS] Transmission complete." />
            </h3>
            <p className="text-lg text-[var(--color-muted)] mb-8">Thank you, {formData.name}. We've received your project brief and will contact you at {formData.email} shortly.</p>
            <button onClick={handleGoHome} className="bg-transparent border-2 border-[var(--color-text)] text-[var(--color-text)] py-3 px-6 cursor-pointer text-lg transition duration-300 rounded hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]">
                Return to Home
            </button>
        </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl mb-8">
        <Typewriter text="> Initiate Project Brief" />
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStep()}
        
        <div className="flex justify-between items-center mt-12">
          <div>
            <button 
                type="button" 
                onClick={step > 1 ? handleBack : handleGoHome} 
                className="bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-3 px-6 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)]"
            >
                {step > 1 ? 'Back' : 'Go Back'}
            </button>
          </div>
          
          {step < 3 ? (
            <button type="button" onClick={handleNext} disabled={ (step === 1 && !formData.service) || (step === 2 && !formData.details)} className="bg-[var(--color-text)] text-[var(--color-bg)] font-bold py-3 px-6 rounded transition duration-300 hover:brightness-90 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed">
              Next
            </button>
          ) : (
            <button type="submit" disabled={!formData.name || !formData.email} className="bg-[var(--color-text)] text-[var(--color-bg)] font-bold py-3 px-6 rounded transition duration-300 hover:brightness-90 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed">
              Submit Brief
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GetStarted;