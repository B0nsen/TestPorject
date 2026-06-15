"use client";

import RecommendR2CardMobile from './RecommendR2CardMobile';

interface CardData {
  title: string;
  imageSrc: string;
  href: string;
}

interface RecommendDoubleProps {
  topCard: CardData;
  bottomCard: CardData;
}

export default function RecommendR2DoubleMobile({ 
  topCard, 
  bottomCard
}: RecommendDoubleProps) {
  return (
    <div className="flex flex-col gap-[12px] w-full h-full">
      {/* Верхняя карточка с динамическим href */}
      <div className="flex-1">
        <RecommendR2CardMobile
          title={topCard.title}
          imageSrc={topCard.imageSrc} 
          href={topCard.href}
        />
      </div>
      {/* Нижняя карточка с динамическим href */}
      <div className="flex-1">
        <RecommendR2CardMobile 
          title={bottomCard.title} 
          imageSrc={bottomCard.imageSrc} 
          href={bottomCard.href} 
        />
      </div>
    </div>
  );
}