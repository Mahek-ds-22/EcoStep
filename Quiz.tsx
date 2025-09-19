import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { questions } from '../data/questions';
import { QuizAnswers } from '../types';

interface QuizProps {
  language: 'en' | 'hi' | 'es';
  onComplete: (answers: QuizAnswers) => void;
  initialAnswers?: QuizAnswers;
}

const Quiz: React.FC<QuizProps> = ({ language, onComplete, initialAnswers }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers || {});
  const [showProgress, setShowProgress] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      transport: 'bg-blue-500',
      diet: 'bg-green-500',
      energy: 'bg-yellow-500',
      habits: 'bg-purple-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowProgress(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const texts = {
    en: {
      question: 'Question',
      of: 'of',
      previous: 'Previous',
      next: 'Next',
      complete: 'Complete Quiz',
      reset: 'Reset Quiz'
    },
    hi: {
      question: 'प्रश्न',
      of: 'में से',
      previous: 'पिछला',
      next: 'अगला',
      complete: 'क्विज़ पूरी करें',
      reset: 'क्विज़ रीसेट करें'
    },
    es: {
      question: 'Pregunta',
      of: 'de',
      previous: 'Anterior',
      next: 'Siguiente',
      complete: 'Completar Quiz',
      reset: 'Reiniciar Quiz'
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {texts[language].question} {currentQuestionIndex + 1} {texts[language].of} {questions.length}
          </h2>
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw size={16} />
            <span className="text-sm">{texts[language].reset}</span>
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getCategoryColor(currentQuestion.category)} ${
              showProgress ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4 ${getCategoryColor(currentQuestion.category)}`}>
          {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.text[language]}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          const isSelected = answers[currentQuestion.id] === option.value;
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.text[language]}</span>
                {isSelected && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={20} />
          <span>{texts[language].previous}</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>{isLastQuestion ? texts[language].complete : texts[language].next}</span>
          {!isLastQuestion && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Quiz;