import React, { useState } from 'react';
import { Trophy, Flame, Calendar, TrendingUp, Award, Target } from 'lucide-react';
import { UserData } from '../types';
import Charts from './Charts';

interface DashboardProps {
  userData: UserData;
  language: 'en' | 'hi' | 'es';
  onTakeQuiz: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, language, onTakeQuiz }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'badges'>('overview');

  const texts = {
    en: {
      dashboard: 'Dashboard',
      overview: 'Overview',
      history: 'History',
      badges: 'Badges',
      currentStreak: 'Current Streak',
      longestStreak: 'Longest Streak',
      totalPoints: 'Total Points',
      averageScore: 'Average Score',
      days: 'days',
      points: 'points',
      outOf: 'out of 40',
      recentEntries: 'Recent Entries',
      earnedBadges: 'Earned Badges',
      availableBadges: 'Available Badges',
      noDataYet: 'No data yet. Take your first quiz!',
      takeQuiz: 'Take Quiz',
      viewAll: 'View All',
      earned: 'Earned',
      notEarned: 'Not Earned Yet'
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      overview: 'अवलोकन',
      history: 'इतिहास',
      badges: 'बैज',
      currentStreak: 'वर्तमान स्ट्रीक',
      longestStreak: 'सबसे लंबी स्ट्रीक',
      totalPoints: 'कुल अंक',
      averageScore: 'औसत स्कोर',
      days: 'दिन',
      points: 'अंक',
      outOf: '40 में से',
      recentEntries: 'हाल की प्रविष्टियां',
      earnedBadges: 'अर्जित बैज',
      availableBadges: 'उपलब्ध बैज',
      noDataYet: 'अभी तक कोई डेटा नहीं। अपनी पहली क्विज़ लें!',
      takeQuiz: 'क्विज़ लें',
      viewAll: 'सब देखें',
      earned: 'अर्जित',
      notEarned: 'अभी तक नहीं मिला'
    },
    es: {
      dashboard: 'Panel',
      overview: 'Resumen',
      history: 'Historial',
      badges: 'Insignias',
      currentStreak: 'Racha Actual',
      longestStreak: 'Racha Más Larga',
      totalPoints: 'Puntos Totales',
      averageScore: 'Puntuación Promedio',
      days: 'días',
      points: 'puntos',
      outOf: 'de 40',
      recentEntries: 'Entradas Recientes',
      earnedBadges: 'Insignias Ganadas',
      availableBadges: 'Insignias Disponibles',
      noDataYet: '¡No hay datos aún. Haz tu primer quiz!',
      takeQuiz: 'Hacer Quiz',
      viewAll: 'Ver Todo',
      earned: 'Ganada',
      notEarned: 'Aún No Ganada'
    }
  };

  const averageScore = userData.history.length > 0 
    ? userData.history.reduce((sum, entry) => sum + entry.score, 0) / userData.history.length
    : 0;

  const earnedBadges = userData.badges.filter(badge => badge.earned);
  const availableBadges = userData.badges.filter(badge => !badge.earned);

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    color = 'text-blue-600',
    bgColor = 'bg-blue-50' 
  }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle: string;
    color?: string;
    bgColor?: string;
  }) => (
    <div className={`${bgColor} rounded-lg p-6 border border-opacity-20`}>
      <div className="flex items-center space-x-3">
        <Icon className={`${color} w-8 h-8`} />
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );

  if (userData.history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <Trophy className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{texts[language].dashboard}</h2>
        <p className="text-xl text-gray-600 mb-8">{texts[language].noDataYet}</p>
        <button
          onClick={onTakeQuiz}
          className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
        >
          {texts[language].takeQuiz}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {texts[language].dashboard}
        </h1>
        <p className="text-gray-600">Welcome back, {userData.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Flame}
          title={texts[language].currentStreak}
          value={userData.currentStreak}
          subtitle={texts[language].days}
          color="text-red-600"
          bgColor="bg-red-50"
        />
        <StatCard
          icon={Calendar}
          title={texts[language].longestStreak}
          value={userData.longestStreak}
          subtitle={texts[language].days}
          color="text-orange-600"
          bgColor="bg-orange-50"
        />
        <StatCard
          icon={Trophy}
          title={texts[language].totalPoints}
          value={userData.points}
          subtitle={texts[language].points}
          color="text-yellow-600"
          bgColor="bg-yellow-50"
        />
        <StatCard
          icon={TrendingUp}
          title={texts[language].averageScore}
          value={averageScore.toFixed(1)}
          subtitle={texts[language].outOf}
          color="text-green-600"
          bgColor="bg-green-50"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="flex border-b border-gray-200">
          {(['overview', 'history', 'badges'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                selectedTab === tab
                  ? 'border-b-2 border-green-500 text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {texts[language][tab]}
            </button>
          ))}
        </div>

        <div className="p-8">
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* Latest Entry Chart */}
              {userData.history.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Latest Footprint Analysis
                  </h3>
                  <Charts 
                    breakdown={userData.history[userData.history.length - 1].breakdown}
                    language={language}
                  />
                </div>
              )}

              {/* Recent Badges */}
              {earnedBadges.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {texts[language].earnedBadges}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {earnedBadges.slice(-4).map((badge) => (
                      <div key={badge.id} className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <h4 className="font-semibold text-sm text-gray-800">
                          {badge.name[language]}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {texts[language].recentEntries}
              </h3>
              {userData.history.slice(-10).reverse().map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Score: {entry.score}/40
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">{entry.score <= 15 ? '🌿' : entry.score <= 25 ? '🌱' : '🔥'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'badges' && (
            <div className="space-y-8">
              {/* Earned Badges */}
              {earnedBadges.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {texts[language].earnedBadges}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {earnedBadges.map((badge) => (
                      <div key={badge.id} className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{badge.icon}</div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{badge.name[language]}</h4>
                            <p className="text-sm text-gray-600">{badge.description[language]}</p>
                            <p className="text-xs text-green-600">{texts[language].earned}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Badges */}
              {availableBadges.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {texts[language].availableBadges}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableBadges.map((badge) => (
                      <div key={badge.id} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 opacity-75">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl grayscale">{badge.icon}</div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{badge.name[language]}</h4>
                            <p className="text-sm text-gray-600">{badge.description[language]}</p>
                            <p className="text-xs text-gray-500">{texts[language].notEarned}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;