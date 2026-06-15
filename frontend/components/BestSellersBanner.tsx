import Image from 'next/image';

interface Banner {
  title: string;
  imageSrc: string;
  href?: string;
}

export default function BestSellersBanner({ title, imageSrc }: Banner) {
    return (
      <div className="w-full max-w-[1528px] mx-auto px-4 md:px-0">
        <div className="
          flex flex-col bg-[#1F2636] border border-[#2F3A52] rounded-[15px]
          w-full h-auto 
          p-[15px_20px] 
          md:p-[15px_20px]
        ">
          <div className="flex flex-col w-full gap-[12px] max-md:gap-[10px]">
                
            <div className="flex items-center w-full min-h-[31px]">
              <h2 className="font-sans font-bold text-[20px] text-[#E6EAF2] leading-tight max-md:leading-[31px]">
                {title}
              </h2>
            </div>
    
           
            <div className="
              relative w-full rounded-[10px] overflow-hidden
              aspect-[345/220] 
              md:h-[220px] md:aspect-auto
            ">
               <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1528px) 100vw, 1528px"
              /> 
            </div>
          </div>
        </div>
      </div>
    );
}