import { QuizAnswers, FootprintEntry } from '../types';

export const calculateFootprint = (answers: QuizAnswers): {
  score: number;
  breakdown: {
    transport: number;
    diet: number;
    energy: number;
    habits: number;
  };
} => {
  const breakdown = {
    transport: 0,
    diet: 0,
    energy: 0,
    habits: 0
  };

  // Calculate category scores
  Object.entries(answers).forEach(([key, value]) => {
    if (key.startsWith('transport')) {
      breakdown.transport += value;
    } else if (key.startsWith('diet')) {
      breakdown.diet += value;
    } else if (key.startsWith('energy')) {
      breakdown.energy += value;
    } else if (key.startsWith('habits')) {
      breakdown.habits += value;
    }
  });

  const score = breakdown.transport + breakdown.diet + breakdown.energy + breakdown.habits;

  return { score, breakdown };
};

export const getEcoLevel = (score: number): {
  level: string;
  color: string;
  emoji: string;
} => {
  if (score <= 10) {
    return { level: 'Eco Champion', color: 'text-green-600', emoji: '🌟' };
  } else if (score <= 15) {
    return { level: 'Green Leader', color: 'text-green-500', emoji: '🌿' };
  } else if (score <= 20) {
    return { level: 'Eco Conscious', color: 'text-yellow-500', emoji: '🌱' };
  } else if (score <= 25) {
    return { level: 'Getting Started', color: 'text-orange-500', emoji: '🌤️' };
  } else {
    return { level: 'Needs Improvement', color: 'text-red-500', emoji: '🔥' };
  }
};

export const generateAITips = (breakdown: FootprintEntry['breakdown'], language: 'en' | 'hi' | 'es'): string[] => {
  const tips: { [key: string]: { [key in 'en' | 'hi' | 'es']: string[] } } = {
    transport: {
      en: [
        "Consider using public transport or carpooling to reduce your commute emissions",
        "Try biking or walking for short distances - it's good for you and the planet!",
        "If you need a car, consider electric or hybrid vehicles",
        "Plan multiple errands in one trip to reduce overall travel",
        "Work from home when possible to eliminate commute emissions"
      ],
      hi: [
        "सार्वजनिक परिवहन या कारपूलिंग का उपयोग करके यात्रा उत्सर्जन कम करें",
        "छोटी दूरी के लिए साइकिल या पैदल चलने की कोशिश करें - यह आपके और ग्रह के लिए अच्छा है!",
        "यदि आपको कार की जरूरत है, तो इलेक्ट्रिक या हाइब्रिड वाहनों पर विचार करें",
        "कुल यात्रा कम करने के लिए एक ही यात्रा में कई काम करें",
        "यात्रा उत्सर्जन को खत्म करने के लिए संभव हो तो घर से काम करें"
      ],
      es: [
        "Considera usar transporte público o compartir auto para reducir las emisiones",
        "Intenta usar bicicleta o caminar para distancias cortas - ¡es bueno para ti y el planeta!",
        "Si necesitas un auto, considera vehículos eléctricos o híbridos",
        "Planifica múltiples tareas en un viaje para reducir el total de desplazamientos",
        "Trabaja desde casa cuando sea posible para eliminar las emisiones del viaje"
      ]
    },
    diet: {
      en: [
        "Try incorporating more plant-based meals into your diet",
        "Buy local and seasonal produce to reduce food miles",
        "Reduce food waste by meal planning and proper storage",
        "Consider growing your own herbs and vegetables",
        "Choose organic and sustainably sourced foods when possible"
      ],
      hi: [
        "अपने आहार में अधिक पौधे-आधारित भोजन शामिल करने की कोशिश करें",
        "फूड माइल्स कम करने के लिए स्थानीय और मौसमी उत्पाद खरीदें",
        "भोजन की योजना और उचित भंडारण से खाद्य बर्बादी कम करें",
        "अपनी जड़ी-बूटियां और सब्जियां उगाने पर विचार करें",
        "संभव हो तो जैविक और टिकाऊ स्रोत वाले खाद्य पदार्थ चुनें"
      ],
      es: [
        "Intenta incorporar más comidas a base de plantas en tu dieta",
        "Compra productos locales y de temporada para reducir las millas de alimentos",
        "Reduce el desperdicio de alimentos planificando comidas y almacenando correctamente",
        "Considera cultivar tus propias hierbas y verduras",
        "Elige alimentos orgánicos y de origen sostenible cuando sea posible"
      ]
    },
    energy: {
      en: [
        "Switch to LED bulbs and energy-efficient appliances",
        "Unplug devices when not in use to avoid phantom energy consumption",
        "Use programmable thermostats to optimize heating and cooling",
        "Consider renewable energy sources like solar panels",
        "Improve home insulation to reduce energy needs"
      ],
      hi: [
        "LED बल्ब और ऊर्जा-कुशल उपकरणों पर स्विच करें",
        "फैंटम ऊर्जा खपत से बचने के लिए उपयोग में न होने पर उपकरणों को अनप्लग करें",
        "हीटिंग और कूलिंग को अनुकूलित करने के लिए प्रोग्राम करने योग्य थर्मोस्टैट का उपयोग करें",
        "सौर पैनल जैसे नवीकरणीय ऊर्जा स्रोतों पर विचार करें",
        "ऊर्जा की आवश्यकताओं को कम करने के लिए घर के इन्सुलेशन में सुधार करें"
      ],
      es: [
        "Cambia a bombillas LED y electrodomésticos eficientes en energía",
        "Desenchufa dispositivos cuando no estén en uso para evitar consumo fantasma",
        "Usa termostatos programables para optimizar calefacción y refrigeración",
        "Considera fuentes de energía renovable como paneles solares",
        "Mejora el aislamiento del hogar para reducir las necesidades energéticas"
      ]
    },
    habits: {
      en: [
        "Implement a comprehensive recycling and composting system",
        "Choose reusable items over single-use products",
        "Buy second-hand or refurbished goods when possible",
        "Repair items instead of replacing them immediately",
        "Practice mindful consumption - buy only what you really need"
      ],
      hi: [
        "एक व्यापक रीसाइक्लिंग और कंपोस्टिंग सिस्टम लागू करें",
        "एकल-उपयोग उत्पादों पर पुन: उपयोग योग्य वस्तुओं को चुनें",
        "संभव हो तो सेकेंड-हैंड या रीफर्बिश्ड सामान खरीदें",
        "तुरंत बदलने के बजाय वस्तुओं की मरम्मत करें",
        "सचेत उपभोग का अभ्यास करें - केवल वही खरीदें जिसकी वास्तव में जरूरत है"
      ],
      es: [
        "Implementa un sistema integral de reciclaje y compostaje",
        "Elige artículos reutilizables sobre productos de un solo uso",
        "Compra artículos de segunda mano o reacondicionados cuando sea posible",
        "Repara artículos en lugar de reemplazarlos inmediatamente",
        "Practica el consumo consciente - compra solo lo que realmente necesitas"
      ]
    }
  };

  const selectedTips: string[] = [];
  
  // Get tips based on highest scoring categories
  const sortedCategories = Object.entries(breakdown)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2);

  sortedCategories.forEach(([category]) => {
    if (tips[category]) {
      const categoryTips = tips[category][language];
      const randomTip = categoryTips[Math.floor(Math.random() * categoryTips.length)];
      selectedTips.push(randomTip);
    }
  });

  return selectedTips;
};

export const generateOffsetSuggestions = (score: number, language: 'en' | 'hi' | 'es') => {
  const suggestions = {
    en: [
      {
        id: 'tree-planting',
        title: 'Plant Trees',
        description: 'Plant native trees to offset your carbon footprint',
        cost: 25,
        currency: 'USD',
        impact: `${Math.ceil(score * 0.1)} trees`,
        provider: 'EcoTrust.org',
        url: 'https://ecotrust.org'
      },
      {
        id: 'renewable-energy',
        title: 'Renewable Energy Credits',
        description: 'Support clean energy projects',
        cost: 15,
        currency: 'USD',
        impact: `${Math.ceil(score * 0.5)} kWh`,
        provider: 'CleanEnergy.org',
        url: 'https://cleanenergy.org'
      }
    ],
    hi: [
      {
        id: 'tree-planting',
        title: 'पेड़ लगाएं',
        description: 'अपने कार्बन फुटप्रिंट को ऑफसेट करने के लिए देशी पेड़ लगाएं',
        cost: 25,
        currency: 'USD',
        impact: `${Math.ceil(score * 0.1)} पेड़`,
        provider: 'EcoTrust.org',
        url: 'https://ecotrust.org'
      }
    ],
    es: [
      {
        id: 'tree-planting',
        title: 'Plantar Árboles',
        description: 'Planta árboles nativos para compensar tu huella de carbono',
        cost: 25,
        currency: 'USD',
        impact: `${Math.ceil(score * 0.1)} árboles`,
        provider: 'EcoTrust.org',
        url: 'https://ecotrust.org'
      }
    ]
  };

  return suggestions[language] || suggestions.en;
};