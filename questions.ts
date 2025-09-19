import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'transport-1',
    category: 'transport',
    text: {
      en: 'How do you usually commute to work/school?',
      hi: 'आप आमतौर पर काम/स्कूल कैसे जाते हैं?',
      es: '¿Cómo sueles ir al trabajo/escuela?'
    },
    options: [
      {
        text: { en: 'Walk/Bike', hi: 'पैदल/साइकिल', es: 'Caminar/Bicicleta' },
        value: 1
      },
      {
        text: { en: 'Public Transport', hi: 'सार्वजनिक परिवहन', es: 'Transporte Público' },
        value: 2
      },
      {
        text: { en: 'Car (shared)', hi: 'कार (साझा)', es: 'Coche (compartido)' },
        value: 3
      },
      {
        text: { en: 'Car (alone)', hi: 'कार (अकेले)', es: 'Coche (solo)' },
        value: 4
      },
      {
        text: { en: 'Flight (weekly)', hi: 'हवाई जहाज (साप्ताहिक)', es: 'Vuelo (semanal)' },
        value: 5
      }
    ]
  },
  {
    id: 'transport-2',
    category: 'transport',
    text: {
      en: 'How many kilometers do you travel daily?',
      hi: 'आप रोजाना कितने किलोमीटर यात्रा करते हैं?',
      es: '¿Cuántos kilómetros viajas diariamente?'
    },
    options: [
      {
        text: { en: 'Less than 5 km', hi: '5 किमी से कम', es: 'Menos de 5 km' },
        value: 1
      },
      {
        text: { en: '5-15 km', hi: '5-15 किमी', es: '5-15 km' },
        value: 2
      },
      {
        text: { en: '15-30 km', hi: '15-30 किमी', es: '15-30 km' },
        value: 3
      },
      {
        text: { en: '30-50 km', hi: '30-50 किमी', es: '30-50 km' },
        value: 4
      },
      {
        text: { en: 'More than 50 km', hi: '50 किमी से अधिक', es: 'Más de 50 km' },
        value: 5
      }
    ]
  },
  {
    id: 'diet-1',
    category: 'diet',
    text: {
      en: 'What best describes your diet?',
      hi: 'आपके आहार का सबसे अच्छा वर्णन क्या है?',
      es: '¿Qué describe mejor tu dieta?'
    },
    options: [
      {
        text: { en: 'Vegan', hi: 'वीगन', es: 'Vegano' },
        value: 1
      },
      {
        text: { en: 'Vegetarian', hi: 'शाकाहारी', es: 'Vegetariano' },
        value: 2
      },
      {
        text: { en: 'Pescatarian', hi: 'मछली खाने वाला', es: 'Pescetariano' },
        value: 3
      },
      {
        text: { en: 'Meat 1-2 times/week', hi: 'मांस सप्ताह में 1-2 बार', es: 'Carne 1-2 veces/semana' },
        value: 4
      },
      {
        text: { en: 'Meat daily', hi: 'रोजाना मांस', es: 'Carne diariamente' },
        value: 5
      }
    ]
  },
  {
    id: 'diet-2',
    category: 'diet',
    text: {
      en: 'How often do you buy local/seasonal produce?',
      hi: 'आप कितनी बार स्थानीय/मौसमी उत्पाद खरीदते हैं?',
      es: '¿Con qué frecuencia compras productos locales/de temporada?'
    },
    options: [
      {
        text: { en: 'Always', hi: 'हमेशा', es: 'Siempre' },
        value: 1
      },
      {
        text: { en: 'Often', hi: 'अक्सर', es: 'A menudo' },
        value: 2
      },
      {
        text: { en: 'Sometimes', hi: 'कभी कभी', es: 'A veces' },
        value: 3
      },
      {
        text: { en: 'Rarely', hi: 'कभी-कभार', es: 'Raramente' },
        value: 4
      },
      {
        text: { en: 'Never', hi: 'कभी नहीं', es: 'Nunca' },
        value: 5
      }
    ]
  },
  {
    id: 'energy-1',
    category: 'energy',
    text: {
      en: 'What type of energy does your home use?',
      hi: 'आपका घर किस प्रकार की ऊर्जा का उपयोग करता है?',
      es: '¿Qué tipo de energía usa tu hogar?'
    },
    options: [
      {
        text: { en: '100% Renewable', hi: '100% नवीकरणीय', es: '100% Renovable' },
        value: 1
      },
      {
        text: { en: 'Mostly Renewable', hi: 'ज्यादातर नवीकरणीय', es: 'Principalmente Renovable' },
        value: 2
      },
      {
        text: { en: 'Mixed Sources', hi: 'मिश्रित स्रोत', es: 'Fuentes Mixtas' },
        value: 3
      },
      {
        text: { en: 'Mostly Grid', hi: 'ज्यादातर ग्रिड', es: 'Principalmente Red' },
        value: 4
      },
      {
        text: { en: 'Don\'t Know', hi: 'पता नहीं', es: 'No Sé' },
        value: 5
      }
    ]
  },
  {
    id: 'energy-2',
    category: 'energy',
    text: {
      en: 'How conscious are you about energy consumption?',
      hi: 'आप ऊर्जा की खपत के बारे में कितने सचेत हैं?',
      es: '¿Qué tan consciente eres del consumo de energía?'
    },
    options: [
      {
        text: { en: 'Very conscious - LED bulbs, unplug devices', hi: 'बहुत सचेत - LED बल्ब, उपकरण अनप्लग', es: 'Muy consciente - bombillas LED, desenchufo' },
        value: 1
      },
      {
        text: { en: 'Somewhat conscious', hi: 'कुछ हद तक सचेत', es: 'Algo consciente' },
        value: 2
      },
      {
        text: { en: 'Average', hi: 'औसत', es: 'Promedio' },
        value: 3
      },
      {
        text: { en: 'Not very conscious', hi: 'ज्यादा सचेत नहीं', es: 'No muy consciente' },
        value: 4
      },
      {
        text: { en: 'Never think about it', hi: 'इसके बारे में कभी नहीं सोचता', es: 'Nunca pienso en ello' },
        value: 5
      }
    ]
  },
  {
    id: 'habits-1',
    category: 'habits',
    text: {
      en: 'How often do you recycle/compost?',
      hi: 'आप कितनी बार रीसाइकिल/कंपोस्ट करते हैं?',
      es: '¿Con qué frecuencia reciclas/compostas?'
    },
    options: [
      {
        text: { en: 'Always - separate everything', hi: 'हमेशा - सब कुछ अलग', es: 'Siempre - separo todo' },
        value: 1
      },
      {
        text: { en: 'Usually', hi: 'आमतौर पर', es: 'Usualmente' },
        value: 2
      },
      {
        text: { en: 'Sometimes', hi: 'कभी कभी', es: 'A veces' },
        value: 3
      },
      {
        text: { en: 'Rarely', hi: 'कभी-कभार', es: 'Raramente' },
        value: 4
      },
      {
        text: { en: 'Never', hi: 'कभी नहीं', es: 'Nunca' },
        value: 5
      }
    ]
  },
  {
    id: 'habits-2',
    category: 'habits',
    text: {
      en: 'How often do you buy new clothes/gadgets?',
      hi: 'आप कितनी बार नए कपड़े/गैजेट खरीदते हैं?',
      es: '¿Con qué frecuencia compras ropa/gadgets nuevos?'
    },
    options: [
      {
        text: { en: 'Only when necessary', hi: 'केवल जरूरत पड़ने पर', es: 'Solo cuando es necesario' },
        value: 1
      },
      {
        text: { en: 'Few times a year', hi: 'साल में कुछ बार', es: 'Algunas veces al año' },
        value: 2
      },
      {
        text: { en: 'Monthly', hi: 'मासिक', es: 'Mensualmente' },
        value: 3
      },
      {
        text: { en: 'Weekly', hi: 'साप्ताहिक', es: 'Semanalmente' },
        value: 4
      },
      {
        text: { en: 'I love shopping!', hi: 'मुझे खरीदारी पसंद है!', es: '¡Me encanta comprar!' },
        value: 5
      }
    ]
  }
];