import React from 'react';
import { Leaf, Calculator, BarChart3, Settings } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  language: 'en' | 'hi' | 'es';
  onLanguageChange: (language: 'en' | 'hi' | 'es') => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  language,
  onLanguageChange
}) => {
  const texts = {
    en: {
      appTitle: 'Eco-Footprint Calculator',
      quiz: 'Take Quiz',
      dashboard: 'Dashboard',
      profile: 'Profile'
    },
    hi: {
      appTitle: 'इको-फुटप्रिंट कैलकुलेटर',
      quiz: 'क्विज़ लें',
      dashboard: 'डैशबोर्ड',
      profile: 'प्रोफाइल'
    },
    es: {
      appTitle: 'Calculadora Huella Ecológica',
      quiz: 'Hacer Quiz',
      dashboard: 'Panel',
      profile: 'Perfil'
    }
  };

  const navItems = [
    { id: 'quiz', label: texts[language].quiz, icon: Calculator },
    { id: 'dashboard', label: texts[language].dashboard, icon: BarChart3 },
    { id: 'profile', label: texts[language].profile, icon: Settings }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 rounded-lg p-2">
              <Leaf className="text-white w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
              {texts[language].appTitle}
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                  currentView === id
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;