
import React from 'react';

interface LoadingSpinnerProps {
  status: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 rounded-lg">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
      <h2 className="text-xl font-semibold mt-6 text-white">Gerando Sua Marca...</h2>
      <p className="text-gray-400 mt-2">{status}</p>
    </div>
  );
};

export default LoadingSpinner;