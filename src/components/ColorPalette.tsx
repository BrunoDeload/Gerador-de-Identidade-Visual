
import React, { useState } from 'react';
import type { ColorInfo } from '../types';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface ColorPaletteProps {
  colors: ColorInfo[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-200">Paleta de Cores</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {colors.map((color) => (
          <div key={color.hex} className="flex flex-col">
            <div
              className="h-24 w-full rounded-lg shadow-md"
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="mt-2 text-left">
              <p className="font-bold text-white">{color.name}</p>
              <div className="flex items-center justify-between text-gray-400 text-sm mt-1">
                <span>{color.hex}</span>
                <button
                  onClick={() => handleCopy(color.hex)}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label={`Copiar código hex ${color.hex}`}
                >
                  {copiedHex === color.hex ? (
                    <CheckIcon className="w-4 h-4 text-green-400" />
                  ) : (
                    <ClipboardIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-2">{color.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;