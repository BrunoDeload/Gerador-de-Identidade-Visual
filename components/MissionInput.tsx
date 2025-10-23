
import React from 'react';

interface MissionInputProps {
  mission: string;
  setMission: (mission: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const MissionInput: React.FC<MissionInputProps> = ({ mission, setMission, onSubmit, isLoading }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl shadow-indigo-500/10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Gerador de Identidade Visual
        </h1>
        <p className="text-center text-gray-400 mt-4">
          Descreva a missão, os valores e o público-alvo da sua empresa para gerar um manual de marca completo.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            placeholder="Ex: 'Uma marca de café ecológica para jovens profissionais que valoriza a sustentabilidade e a comunidade...'"
            className="w-full h-36 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !mission.trim()}
            className="w-full flex items-center justify-center py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gerando...
              </>
            ) : (
              'Gerar Manual da Marca'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MissionInput;