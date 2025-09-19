import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import Navigation from './components/Navigation';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import { UserData, FootprintEntry, QuizAnswers } from './types';
import { loadUserData, saveUserData, loadCurrentEntry, saveCurrentEntry, clearCurrentEntry } from './utils/storage';
import { calculateFootprint, generateAITips, generateOffsetSuggestions } from './utils/calculator';
import { calculatePoints, checkAndAwardBadges, updateStreak } from './utils/gamification';
import { availableBadges } from './data/badges';

function App() {
  const [currentView, setCurrentView] = useState<'quiz' | 'results' | 'dashboard' | 'profile'>('quiz');
  const [language, setLanguage] = useState<'en' | 'hi' | 'es'>('en');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentEntry, setCurrentEntry] = useState<FootprintEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  // Initialize app
  useEffect(() => {
    const initializeApp = () => {
      // Load user data
      let user = loadUserData();
      if (!user) {
        // Create new user
        user = {
          id: Date.now().toString(),
          name: 'Eco Warrior',
          language: 'en',
          totalScore: 0,
          currentStreak: 0,
          longestStreak: 0,
          points: 0,
          badges: availableBadges.map(badge => ({ ...badge, earned: false })),
          history: [],
          createdAt: new Date()
        };
        saveUserData(user);
      }
      
      setUserData(user);
      setLanguage(user.language);

      // Load current entry if exists
      const entry = loadCurrentEntry();
      if (entry) {
        setCurrentEntry(entry);
        setCurrentView('results');
      }

      setIsLoading(false);
    };

    initializeApp();
  }, []);

  // Save user data whenever it changes
  useEffect(() => {
    if (userData) {
      saveUserData(userData);
    }
  }, [userData]);

  const handleLanguageChange = (newLanguage: 'en' | 'hi' | 'es') => {
    setLanguage(newLanguage);
    if (userData) {
      setUserData({ ...userData, language: newLanguage });
    }
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    if (!userData) return;

    const { score, breakdown } = calculateFootprint(answers);
    const tips = generateAITips(breakdown, language);
    const offsetSuggestions = generateOffsetSuggestions(score, language);
    const points = calculatePoints(score);

    const entry: FootprintEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      answers,
      score,
      breakdown,
      tips,
      offsetSuggestions
    };

    // Update user data
    const updatedUserData = {
      ...userData,
      totalScore: userData.totalScore + score,
      points: userData.points + points,
      history: [...userData.history, entry]
    };

    // Update streak
    updateStreak(updatedUserData);

    // Check for new badges
    const earnedBadges = checkAndAwardBadges(updatedUserData, entry);
    const newBadgeNames = earnedBadges.map(badge => badge.name[language]);
    
    if (newBadgeNames.length > 0) {
      setNewBadges(newBadgeNames);
      setTimeout(() => setNewBadges([]), 5000);
    }

    setUserData(updatedUserData);
    setCurrentEntry(entry);
    saveCurrentEntry(entry);
    setCurrentView('results');
  };

  const handleRetakeQuiz = () => {
    clearCurrentEntry();
    setCurrentEntry(null);
    setCurrentView('quiz');
  };

  const handleViewDashboard = () => {
    clearCurrentEntry();
    setCurrentEntry(null);
    setCurrentView('dashboard');
  };

  const handleUpdateProfile = (updates: Partial<UserData>) => {
    if (userData) {
      setUserData({ ...userData, ...updates });
    }
  };

  const handleExportData = () => {
    if (userData) {
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'eco-footprint-data.json';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const texts = {
    en: {
      loading: 'Loading your eco journey...',
      badgeEarned: 'Badge Earned!'
    },
    hi: {
      loading: 'आपकी इको यात्रा लोड हो रही है...',
      badgeEarned: 'बैज अर्जित!'
    },
    es: {
      loading: 'Cargando tu viaje ecológico...',
      badgeEarned: '¡Insignia Ganada!'
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-gray-700">{texts[language].loading}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700">Error loading user data. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Badge Notifications */}
      {newBadges.length > 0 && (
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {newBadges.map((badgeName, index) => (
            <div
              key={index}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-semibold">{texts[language].badgeEarned}</p>
                  <p className="text-sm">{badgeName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {currentView === 'quiz' && (
          <Quiz
            language={language}
            onComplete={handleQuizComplete}
            initialAnswers={currentEntry?.answers}
          />
        )}

        {currentView === 'results' && currentEntry && (
          <Results
            entry={currentEntry}
            language={language}
            onRetakeQuiz={handleRetakeQuiz}
            onViewDashboard={handleViewDashboard}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            userData={userData}
            language={language}
            onTakeQuiz={() => setCurrentView('quiz')}
          />
        )}

        {currentView === 'profile' && (
          <UserProfile
            userData={userData}
            onUpdateProfile={handleUpdateProfile}
            onExportData={handleExportData}
            onClearData={handleClearData}
            language={language}
          />
        )}
      </main>
    </div>
  );
}

export default App;