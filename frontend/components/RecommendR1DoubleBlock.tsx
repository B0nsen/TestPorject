"use client";

import RecommendR1CardBlock from './RecommendR1CardBlock';
import RecommendR1CardTablet2 from './RecommendR1CardTablet2';

interface GridItem {
  id: number;
  title: string;
  imageSrc: string;
  href: string; // ИСПРАВЛЕНО: добавили поле в типизацию блока
}

interface RecommendDoubleProps {
  topCardData: {
    mainTitle: string;
    items: GridItem[];
  };
  bottomCardData: {
    mainTitle: string;
    items: GridItem[];
  };
  className?: string;
}

export default function RecommendR1DoubleBlock({ 
  topCardData, 
  bottomCardData, 
  className = '' 
}: RecommendDoubleProps) {
  return (
    <div className={`flex flex-col gap-[14px] w-full max-w-[344px] ${className}`}>
      
      <RecommendR1CardTablet2 
        mainTitle={topCardData.mainTitle} 
        items={topCardData.items} 
      />

      <RecommendR1CardBlock 
        mainTitle={bottomCardData.mainTitle} 
        items={bottomCardData.items} 
      />
      
    </div>
  );
}