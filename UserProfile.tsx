import React, { useState } from 'react';
import { User, Mail, Globe, Trophy, Trash2, Download } from 'lucide-react';
import { UserData } from '../types';

interface UserProfileProps {
  userData: UserData;
  onUpdateProfile: (updates: Partial<UserData>) => void;
  onExportData: () => void;
  onClearData: () => void;
  language: 'en' | 'hi' | 'es';
}

const UserProfile: React.FC<UserProfileProps> = ({
  userData,
  onUpdateProfile,
  onExportData,
  onClearData,
  language
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email || ''
  });

  const texts = {
    en: {
      profile: 'Profile',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      name: 'Name',
      email: 'Email',
      language: 'Language',
      statistics: 'Statistics',
      totalQuizzes: 'Total Quizzes',
      currentStreak: 'Current Streak',
      totalPoints: 'Total Points',
      badgesEarned: 'Badges Earned',
      exportData: 'Export Data',
      clearData: 'Clear All Data',
      clearDataWarning: 'This will permanently delete all your data. Are you sure?',
      days: 'days',
      points: 'points',
      badges: 'badges'
    },
    hi: {
      profile: 'प्रोफाइल',
      editProfile: 'प्रोफाइल संपादित करें',
      saveChanges: 'परिवर्तन सहेजें',
      cancel: 'रद्द करें',
      name: 'नाम',
      email: 'ईमेल',
      language: 'भाषा',
      statistics: 'सांख्यिकी',
      totalQuizzes: 'कुल क्विज़',
      currentStreak: 'वर्तमान स्ट्रीक',
      totalPoints: 'कुल अंक',
      badgesEarned: 'अर्जित बैज',
      exportData: 'डेटा निर्यात करें',
      clearData: 'सभी डेटा साफ़ करें',
      clearDataWarning: 'यह आपके सभी डेटा को स्थायी रूप से हटा देगा। क्या आप निश्चित हैं?',
      days: 'दिन',
      points: 'अंक',
      badges: 'बैज'
    },
    es: {
      profile: 'Perfil',
      editProfile: 'Editar Perfil',
      saveChanges: 'Guardar Cambios',
      cancel: 'Cancelar',
      name: 'Nombre',
      email: 'Email',
      language: 'Idioma',
      statistics: 'Estadísticas',
      totalQuizzes: 'Quizzes Totales',
      currentStreak: 'Racha Actual',
      totalPoints: 'Puntos Totales',
      badgesEarned: 'Insignias Ganadas',
      exportData: 'Exportar Datos',
      clearData: 'Limpiar Todos los Datos',
      clearDataWarning: 'Esto eliminará permanentemente todos tus datos. ¿Estás seguro?',
      days: 'días',
      points: 'puntos',
      badges: 'insignias'
    }
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setEditMode(false);
  };

  const handleClearData = () => {
    if (confirm(texts[language].clearDataWarning)) {
      onClearData();
    }
  };

  const earnedBadgesCount = userData.badges.filter(badge => badge.earned).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {texts[language].profile}
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editMode ? texts[language].editProfile : texts[language].profile}
          </h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {texts[language].editProfile}
            </button>
          )}
        </div>

        {editMode ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts[language].name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts[language].email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {texts[language].saveChanges}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {texts[language].cancel}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="text-gray-400" size={20} />
              <span className="text-gray-700">{userData.name}</span>
            </div>
            
            {userData.email && (
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" size={20} />
                <span className="text-gray-700">{userData.email}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              <Globe className="text-gray-400" size={20} />
              <span className="text-gray-700">
                {userData.language === 'en' && 'English'}
                {userData.language === 'hi' && 'हिंदी'}
                {userData.language === 'es' && 'Español'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {texts[language].statistics}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{userData.history.length}</div>
            <div className="text-sm text-gray-600">{texts[language].totalQuizzes}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{userData.currentStreak}</div>
            <div className="text-sm text-gray-600">{texts[language].currentStreak}</div>
            <div className="text-xs text-gray-500">{texts[language].days}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{userData.points}</div>
            <div className="text-sm text-gray-600">{texts[language].totalPoints}</div>
            <div className="text-xs text-gray-500">{texts[language].points}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{earnedBadgesCount}</div>
            <div className="text-sm text-gray-600">{texts[language].badgesEarned}</div>
            <div className="text-xs text-gray-500">{texts[language].badges}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Actions</h2>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onExportData}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={20} />
            <span>{texts[language].exportData}</span>
          </button>
          
          <button
            onClick={handleClearData}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={20} />
            <span>{texts[language].clearData}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;