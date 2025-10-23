
import React from 'react';
import type { BrandBibleData, GeneratedLogos } from '../types';
import LogoCard from './LogoCard';
import ColorPalette from './ColorPalette';
import TypographyGuide from './TypographyGuide';

interface BrandBibleProps {
  data: BrandBibleData;
  logos: GeneratedLogos | null;
}

const BrandBible: React.FC<BrandBibleProps> = ({ data, logos }) => {
  return (
    <div className="w-full mx-auto animate-fade-in space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <LogoCard logos={logos} />
            </div>
            <div className="lg:col-span-2 space-y-8">
                <ColorPalette colors={data.colorPalette} />
                <TypographyGuide typography={data.typography} />
            </div>
        </div>
    </div>
  );
};

export default BrandBible;