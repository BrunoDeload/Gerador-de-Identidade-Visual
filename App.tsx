import React, { useState, useCallback, useEffect } from 'react';
import MissionInput from './components/MissionInput';
import BrandBible from './components/BrandBible';
import LoadingSpinner from './components/LoadingSpinner';
import { generateBrandIdentity, generateLogo } from './services/geminiService';
import type { BrandBibleData, GeneratedLogos } from './types';

const App: React.FC = () => {
  const [mission, setMission] = useState<string>('');
  const [brandBible, setBrandBible] = useState<BrandBibleData | null>(null);
  const [logos, setLogos] = useState<GeneratedLogos | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const loadGoogleFont = (fontName: string) => {
    const fontId = `google-font-${fontName.replace(/\s+/g, '-')}`;
    if (document.getElementById(fontId)) {
      return;
    }
    const link = document.createElement('link');
    link.id = fontId;
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };
  
  useEffect(() => {
    if (brandBible?.typography) {
      loadGoogleFont(brandBible.typography.headerFont);
      loadGoogleFont(brandBible.typography.bodyFont);
    }
  }, [brandBible]);


  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission.trim()) return;

    setIsLoading(true);
    setError(null);
    setBrandBible(null);
    setLogos(null);

    try {
      setLoadingStatus('Criando a estratégia da marca...');
      const bibleData = await generateBrandIdentity(mission);
      setBrandBible(bibleData);

      setLoadingStatus('Desenhando logos exclusivos...');
      const [primary, secondaryMark, wordmark] = await Promise.all([
        generateLogo(bibleData.logoPrompts.primary),
        generateLogo(bibleData.logoPrompts.secondaryMark),
        generateLogo(bibleData.logoPrompts.wordmark),
      ]);
      setLogos({ primary, secondaryMark, wordmark });

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
      setLoadingStatus('');
    }
  }, [mission]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
      <main className="w-full max-w-7xl mx-auto">
        {!brandBible && !isLoading && (
          <MissionInput
            mission={mission}
            setMission={setMission}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
        )}
        
        {isLoading && <LoadingSpinner status={loadingStatus} />}

        {error && (
            <div className="text-center p-6 bg-red-900/50 border border-red-500 rounded-lg">
                <h2 className="text-xl font-bold text-red-300">A Geração Falhou</h2>
                <p className="text-red-400 mt-2">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="mt-4 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Tentar Novamente
                </button>
            </div>
        )}

        {brandBible && (
            <div className="animate-fade-in">
                <BrandBible data={brandBible} logos={logos} />
                 <div className="text-center mt-8">
                    <button 
                        onClick={() => {
                            setBrandBible(null);
                            setLogos(null);
                            setMission('');
                        }}
                        className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
                    >
                        Começar de Novo
                    </button>
                 </div>
            </div>
        )}
      </main>
       <footer className="text-center text-gray-500 text-sm mt-8">
        <p>Criado por: Bruno Eduardo Alves de Sousa</p>
      </footer>
    </div>
  );
};

export default App;