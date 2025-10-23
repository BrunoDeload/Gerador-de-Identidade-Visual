
import React from 'react';
import type { Typography } from '../types';

interface TypographyGuideProps {
  typography: Typography;
}

const TypographyGuide: React.FC<TypographyGuideProps> = ({ typography }) => {
  const headerStyle = { fontFamily: `'${typography.headerFont}', sans-serif` };
  const bodyStyle = { fontFamily: `'${typography.bodyFont}', sans-serif` };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-200">Tipografia</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-gray-400 mb-1">Fonte do Cabeçalho</p>
          <p className="text-2xl font-semibold text-white" style={headerStyle}>{typography.headerFont}</p>
          <h1 className="text-4xl font-bold mt-4 truncate" style={headerStyle}>Aa Bb Cc Dd Ee</h1>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Fonte do Corpo</p>
          <p className="text-2xl font-semibold text-white" style={bodyStyle}>{typography.bodyFont}</p>
          <p className="mt-4 text-gray-300" style={bodyStyle}>
            A rápida raposa marrom salta sobre o cão preguiçoso. Um parágrafo de texto para demonstrar o estilo da fonte do corpo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypographyGuide;