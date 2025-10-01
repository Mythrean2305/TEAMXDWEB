  import React, { ReactNode } from 'react';
  import { useTheme } from '../contexts/ThemeContext';
  import { playClickSound } from '../utils/sounds';

  interface TerminalProps {
    children: ReactNode;
    isAuthenticated: boolean;
    isAdmin: boolean;
    onLogin: () => void;
    onDashboard: () => void;
    onAdminDashboard: () => void;
    onLogout: () => void;
    onHome: () => void;
  }

  const Terminal: React.FC<TerminalProps> = ({ 
    children, 
    isAuthenticated, 
    isAdmin, 
    onLogin, 
    onDashboard, 
    onAdminDashboard, 
    onLogout,
    onHome
  }) => {
    const { theme, cycleTheme } = useTheme();

    const themeStyles: React.CSSProperties = {
      '--color-bg': theme.colors.bg,
      '--color-text': theme.colors.text,
      '--color-border': theme.colors.border,
      '--color-accent1': theme.colors.accent1,
      '--color-accent2': theme.colors.accent2,
      '--color-muted': theme.colors.muted,
      '--color-secondary-bg': theme.colors.secondaryBg,
      '--color-input-border': theme.colors.inputBorder,
      '--color-secondary-btn-bg': theme.colors.secondaryBtnBg,
      '--color-secondary-btn-text': theme.colors.secondaryBtnText,
      '--color-secondary-btn-hover': theme.colors.secondaryBtnHover,
      // Dynamically set the shadow color using the theme's border color with 40% opacity.
      // '66' is the hex representation for 40% opacity.
      boxShadow: `0 0 35px ${theme.colors.border}66`,
    } as React.CSSProperties;

    const handleSoundClick = (callback: () => void) => {
      playClickSound();
      callback();
    }

    return (
      <div 
        style={themeStyles}
        className="relative max-w-7xl w-full min-h-[80vh] bg-[var(--color-bg)] rounded-lg overflow-hidden border border-[var(--color-border)] font-mono text-lg sm:text-xl flex flex-col"
      >
        {/* Animated Grid Background */}
        <div className="grid-background"></div>

        {/* 
          Scanline Overlay - Temporarily commented out
          <div className="absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none z-20" style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 4px, 6px 100%',
            animation: 'scanline 10s linear infinite'
          }}></div> 
        */}

        <div className="bg-[#1a1a1a] py-3 px-4 flex items-center flex-shrink-0 z-10">
          <div className="flex space-x-2">
            <span className="h-3.5 w-3.5 bg-[#ff5f56] rounded-full"></span>
            <span className="h-3.5 w-3.5 bg-[#ffbd2e] rounded-full"></span>
            <span className="h-3.5 w-3.5 bg-[#27c93f] rounded-full"></span>
          </div>
          <span className="ml-4 text-[#aaa] text-sm sm:text-base">TeamXD Terminal</span>
          <div className="flex-grow"></div>
          <div className="flex items-center space-x-2 sm:space-x-4">
              <button onClick={() => handleSoundClick(onHome)} className="text-sm text-[#aaa] hover:text-white transition-colors border border-gray-600 px-2 py-1 rounded hover:border-gray-400">
                  Home
              </button>
              {isAuthenticated ? (
                  <>
                      <button onClick={() => handleSoundClick(isAdmin ? onAdminDashboard : onDashboard)} className="text-sm text-[#aaa] hover:text-white transition-colors border border-gray-600 px-2 py-1 rounded hover:border-gray-400">
                          {isAdmin ? 'Admin Panel' : 'Dashboard'}
                      </button>
                      <button onClick={() => handleSoundClick(onLogout)} className="text-sm text-[#aaa] hover:text-white transition-colors border border-gray-600 px-2 py-1 rounded hover:border-gray-400">
                          Logout
                      </button>
                  </>
              ) : (
                  <button onClick={() => handleSoundClick(onLogin)} className="text-sm text-[#aaa] hover:text-white transition-colors border border-gray-600 px-2 py-1 rounded hover:border-gray-400">
                      Login
                  </button>
              )}
              <button onClick={cycleTheme} className="text-sm text-[#aaa] hover:text-white transition-colors border border-gray-600 px-2 py-1 rounded hover:border-gray-400">
                  Theme: {theme.name}
              </button>
          </div>
        </div>
        <div className="p-6 sm:p-12 text-[var(--color-text)] flex-grow overflow-y-auto z-10 relative">
          {children}
        </div>
      </div>
    );
  };

  export default Terminal;