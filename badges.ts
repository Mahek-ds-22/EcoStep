import { Badge } from '../types';

export const availableBadges: Badge[] = [
  {
    id: 'eco-warrior',
    name: {
      en: 'Eco Warrior',
      hi: 'इको वॉरियर',
      es: 'Guerrero Ecológico'
    },
    description: {
      en: 'Score below 15 points',
      hi: '15 अंक से कम स्कोर करें',
      es: 'Puntúa menos de 15 puntos'
    },
    icon: '🌿',
    earned: false
  },
  {
    id: 'streak-master',
    name: {
      en: 'Streak Master',
      hi: 'स्ट्रीक मास्टर',
      es: 'Maestro de Rachas'
    },
    description: {
      en: 'Maintain 7-day streak',
      hi: '7-दिन की स्ट्रीक बनाए रखें',
      es: 'Mantén una racha de 7 días'
    },
    icon: '🔥',
    earned: false
  },
  {
    id: 'green-commuter',
    name: {
      en: 'Green Commuter',
      hi: 'हरित यात्री',
      es: 'Viajero Verde'
    },
    description: {
      en: 'Score low on transport',
      hi: 'परिवहन में कम स्कोर करें',
      es: 'Puntúa bajo en transporte'
    },
    icon: '🚲',
    earned: false
  },
  {
    id: 'plant-powered',
    name: {
      en: 'Plant Powered',
      hi: 'पौधे की शक्ति',
      es: 'Poder Vegetal'
    },
    description: {
      en: 'Score low on diet',
      hi: 'आहार में कम स्कोर करें',
      es: 'Puntúa bajo en dieta'
    },
    icon: '🌱',
    earned: false
  },
  {
    id: 'energy-saver',
    name: {
      en: 'Energy Saver',
      hi: 'ऊर्जा बचतकर्ता',
      es: 'Ahorrador de Energía'
    },
    description: {
      en: 'Score low on energy',
      hi: 'ऊर्जा में कम स्कोर करें',
      es: 'Puntúa bajo en energía'
    },
    icon: '⚡',
    earned: false
  },
  {
    id: 'mindful-consumer',
    name: {
      en: 'Mindful Consumer',
      hi: 'सचेत उपभोक्ता',
      es: 'Consumidor Consciente'
    },
    description: {
      en: 'Score low on habits',
      hi: 'आदतों में कम स्कोर करें',
      es: 'Puntúa bajo en hábitos'
    },
    icon: '♻️',
    earned: false
  }
];