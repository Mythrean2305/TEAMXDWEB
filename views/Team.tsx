import React from 'react';
import Typewriter from '../components/Typewriter';
import { playClickSound } from '../utils/sounds';

const teamMembers = [
    { name: 'Alex "Glitch" Rivera', role: 'Lead Video Editor', bio: 'With a decade of experience in post-production, Alex can turn raw footage into a cinematic masterpiece. Master of Adobe Premiere Pro and After Effects.' },
    { name: 'Jasmine "Hex" Chen', role: 'Head of Web Development', bio: 'Jasmine builds beautiful, responsive, and blazingly fast websites. She believes in clean code and intuitive user experiences. Expert in React, Tailwind, and WebGL.' },
    { name: 'Leo "Cipher" Maxwell', role: 'Senior Graphic Designer', bio: 'Leo is the creative force behind our branding projects. From logos to complete brand identities, he crafts visuals that are both memorable and meaningful.' },
];

interface TeamProps {
    onGoBack: () => void;
}

const Team: React.FC<TeamProps> = ({ onGoBack }) => {

    const handleGoBack = () => {
        playClickSound();
        onGoBack();
    }

    return (
        <div>
            <h2 className="text-3xl sm:text-4xl mb-8">
                <Typewriter text="> whoami --all" />
            </h2>

            <div className="space-y-8">
                {teamMembers.map((member, index) => (
                    <div key={index} className="border-l-4 border-[var(--color-text)] pl-4">
                        <h3 className="text-xl sm:text-2xl text-white">{member.name}</h3>
                        <p className="text-lg text-[var(--color-text)] mb-2">// {member.role}</p>
                        <p className="text-base sm:text-lg text-[var(--color-muted)]">{member.bio}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleGoBack} className="mt-12 bg-[var(--color-secondary-btn-bg)] text-[var(--color-secondary-btn-text)] py-3 px-6 rounded transition duration-300 hover:bg-[var(--color-secondary-btn-hover)]">
                Go Back
            </button>
        </div>
    );
};

export default Team;