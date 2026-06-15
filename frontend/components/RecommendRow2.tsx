"use client";

import RecommendR2CategoryCard from "./RecommendR2CategoryCard"; 
import RecommendR2DoubleMobile from "./RecommendR2DoubleMobile"; 

interface CardDataJSON {
  id: number;          
  name: string;        
  imageUrl: string;    
}

interface RecommendRow2Props {
  data: CardDataJSON[];
}

export default function RecommendRow2({ data }: RecommendRow2Props) { 
 
  if (!data || data.length < 4) return null;

  return ( 
    <section className="w-full bg-transparent"> 
      <div className="max-w-[1528px] mx-auto px-4 md:px-0"> 
        
        {/* Mobile Viewport (Horizontal Scroll) */}
        <div className="flex overflow-x-auto pb-6 gap-[12px] md:hidden no-scrollbar snap-x snap-mandatory">
          
          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2DoubleMobile 
              topCard={{
                title: data[0].name,
                imageSrc: data[0].imageUrl,
                // ИСПРАВЛЕНО: передаем текстовое имя категории вместо id
                href: `/catalog?department=${encodeURIComponent(data[0].name)}`
              }} 
              bottomCard={{
                title: data[1].name,
                imageSrc: data[1].imageUrl,
                // ИСПРАВЛЕНО: передаем текстовое имя категории вместо id
                href: `/catalog?department=${encodeURIComponent(data[1].name)}`
              }} 
            /> 
          </div>

          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2CategoryCard 
              title={data[2].name} 
              imageSrc={data[2].imageUrl} 
              // ИСПРАВЛЕНО: передаем текстовое имя категории вместо id
              href={`/catalog?department=${encodeURIComponent(data[2].name)}`} 
            /> 
          </div>

          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2CategoryCard 
              title={data[3].name} 
              imageSrc={data[3].imageUrl} 
              // ИСПРАВЛЕНО: передаем текстовое имя категории вместо id
              href={`/catalog?department=${encodeURIComponent(data[3].name)}`} 
            /> 
          </div>
        </div>

        {/* Tablet & Desktop Viewports */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-[12px]"> 
          {data.slice(0, 4).map((card, idx) => ( 
            <RecommendR2CategoryCard 
              key={idx} 
              title={card.name} 
              imageSrc={card.imageUrl} 
              // ИСПРАВЛЕНО: передаем текстовое имя категории вместо id
              href={`/catalog?department=${encodeURIComponent(card.name)}`} 
            /> 
          ))} 
        </div>

      </div> 
    </section> 
  ); 
}