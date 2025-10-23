
import React from 'react';
import type { GeneratedLogos } from '../types';

interface LogoCardProps {
  logos: GeneratedLogos | null;
}

const LogoDisplay: React.FC<{ src: string | undefined; title: string; large?: boolean }> = ({ src, title, large = false }) => (
  <div className={`flex flex-col items-center justify-center p-4 rounded-lg bg-gray-700/50 ${large ? 'col-span-2 row-span-2' : ''}`}>
    {src ? (
      <img
        src={`data:image/png;base64,${src}`}
        alt={title}
        className="object-contain max-w-full max-h-full"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-md animate-pulse">
        <span className="text-gray-400 text-sm">Gerando...</span>
      </div>
    )}
    <p className="text-sm text-gray-400 mt-2">{title}</p>
  </div>
);


const LogoCard: React.FC<LogoCardProps> = ({ logos }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-200">Logos e Marcas</h3>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 aspect-square">
        <LogoDisplay src={logos?.primary} title="Logo Principal" large={true} />
        <LogoDisplay src={logos?.secondaryMark} title="Marca Secundária" />
        <LogoDisplay src={logos?.wordmark} title="Logotipo" />
      </div>
    </div>
  );
};

export default LogoCard;