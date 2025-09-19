import React, { useRef } from 'react';
import { Share2, Download, RotateCcw, Trophy, Target } from 'lucide-react';
import html2canvas from 'html2canvas';
import { FootprintEntry } from '../types';
import { getEcoLevel } from '../utils/calculator';
import Charts from './Charts';

interface ResultsProps {
  entry: FootprintEntry;
  language: 'en' | 'hi' | 'es';
  onRetakeQuiz: () => void;
  onViewDashboard: () => void;
}

const Results: React.FC<ResultsProps> = ({ entry, language, onRetakeQuiz, onViewDashboard }) => {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const ecoLevel = getEcoLevel(entry.score);

  const texts = {
    en: {
      yourEcoFootprint: 'Your Eco Footprint',
      score: 'Score',
      outOf: 'out of 40',
      breakdown: 'Breakdown',
      transport: 'Transport',
      diet: 'Diet',
      energy: 'Energy',
      habits: 'Habits',
      aiTips: 'AI-Powered Tips',
      offsetSuggestions: 'Carbon Offset Suggestions',
      shareResults: 'Share Results',
      downloadReport: 'Download Report',
      retakeQuiz: 'Retake Quiz',
      viewDashboard: 'View Dashboard',
      points: 'points',
      offsetWith: 'Offset with',
      from: 'from'
    },
    hi: {
      yourEcoFootprint: 'आपका इको फुटप्रिंट',
      score: 'स्कोर',
      outOf: '40 में से',
      breakdown: 'विभाजन',
      transport: 'परिवहन',
      diet: 'आहार',
      energy: 'ऊर्जा',
      habits: 'आदतें',
      aiTips: 'AI-संचालित सुझाव',
      offsetSuggestions: 'कार्बन ऑफसेट सुझाव',
      shareResults: 'परिणाम साझा करें',
      downloadReport: 'रिपोर्ट डाउनलोड करें',
      retakeQuiz: 'क्विज़ दोबारा लें',
      viewDashboard: 'डैशबोर्ड देखें',
      points: 'अंक',
      offsetWith: 'के साथ ऑफसेट करें',
      from: 'से'
    },
    es: {
      yourEcoFootprint: 'Tu Huella Ecológica',
      score: 'Puntuación',
      outOf: 'de 40',
      breakdown: 'Desglose',
      transport: 'Transporte',
      diet: 'Dieta',
      energy: 'Energía',
      habits: 'Hábitos',
      aiTips: 'Consejos con IA',
      offsetSuggestions: 'Sugerencias de Compensación',
      shareResults: 'Compartir Resultados',
      downloadReport: 'Descargar Reporte',
      retakeQuiz: 'Repetir Quiz',
      viewDashboard: 'Ver Dashboard',
      points: 'puntos',
      offsetWith: 'Compensar con',
      from: 'de'
    }
  };

  const handleShare = async () => {
    if (shareCardRef.current) {
      try {
        const canvas = await html2canvas(shareCardRef.current, {
          backgroundColor: '#ffffff',
          scale: 2
        });
        
        canvas.toBlob(async (blob) => {
          if (blob && navigator.share) {
            const file = new File([blob], 'eco-footprint-result.png', { type: 'image/png' });
            await navigator.share({
              title: texts[language].yourEcoFootprint,
              text: `I scored ${entry.score}/40 on my eco-footprint! ${ecoLevel.emoji}`,
              files: [file]
            });
          } else {
            // Fallback: copy image to clipboard
            if (blob) {
              const item = new ClipboardItem({ 'image/png': blob });
              await navigator.clipboard.write([item]);
              alert('Result card copied to clipboard!');
            }
          }
        });
      } catch (error) {
        console.error('Error sharing results:', error);
      }
    }
  };

  const handleDownload = async () => {
    if (shareCardRef.current) {
      try {
        const canvas = await html2canvas(shareCardRef.current, {
          backgroundColor: '#ffffff',
          scale: 2
        });
        
        const link = document.createElement('a');
        link.download = 'eco-footprint-report.png';
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error downloading report:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Share Card */}
      <div
        ref={shareCardRef}
        className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-8 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {texts[language].yourEcoFootprint}
        </h2>
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="text-6xl font-bold text-gray-800">{entry.score}</div>
          <div className="text-gray-600">
            <div className="text-lg font-semibold">{texts[language].score}</div>
            <div className="text-sm">{texts[language].outOf}</div>
          </div>
        </div>

        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-semibold ${ecoLevel.color}`}>
          <span>{ecoLevel.emoji}</span>
          <span>{ecoLevel.level}</span>
        </div>
      </div>

      {/* Breakdown Charts */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{texts[language].breakdown}</h3>
        <Charts breakdown={entry.breakdown} language={language} />
      </div>

      {/* AI Tips */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <Target className="text-green-600" />
          <span>{texts[language].aiTips}</span>
        </h3>
        <div className="space-y-4">
          {entry.tips.map((tip, index) => (
            <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offset Suggestions */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{texts[language].offsetSuggestions}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {entry.offsetSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {suggestion.title[language]}
              </h4>
              <p className="text-gray-600 mb-4">{suggestion.description[language]}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ${suggestion.cost}
                </span>
                <span className="text-sm text-gray-500">
                  {texts[language].offsetWith} {suggestion.impact}
                </span>
              </div>
              <p className="text-xs text-gray-400">{texts[language].from} {suggestion.provider}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Share2 size={20} />
          <span>{texts[language].shareResults}</span>
        </button>
        
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download size={20} />
          <span>{texts[language].downloadReport}</span>
        </button>
        
        <button
          onClick={onRetakeQuiz}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={20} />
          <span>{texts[language].retakeQuiz}</span>
        </button>
        
        <button
          onClick={onViewDashboard}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Trophy size={20} />
          <span>{texts[language].viewDashboard}</span>
        </button>
      </div>
    </div>
  );
};

export default Results;