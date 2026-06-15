"use client";

import FooterColumn from "./FooterColumn";
import SocialIconLink from "./SocialIconLink";

import facebookIcon from "@/assets/icons/facebook.png";
import instagramIcon from "@/assets/icons/insta.png";
import xIcon from "@/assets/icons/x.png";
import tiktokIcon from "@/assets/icons/tiktok.png";

export default function Footer() {
  const columnsData = [
    {
      title: "Get to Know Us",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Company Info", href: "/info" },
      ],
    },
    {
      title: "Customer Service",
      items: [
        { name: "Contact Us", href: "/contact" },
        { name: "Returns & Refunds", href: "/returns" },
        { name: "Order Tracking", href: "/tracking" },
      ],
    },
    {
      title: "Make Money with Us",
      items: [
        { name: "Advertising", href: "/advertising" },
        { name: "Influencer Program", href: "/influencer" },
        { name: "Become an Affiliate", href: "/affiliate" },
        { name: "Sell on Marketplace", href: "/marketplace" },
      ],
    },
    {
      title: "Let Us Help You",
      items: [
        { name: "Your Orders", href: "/orders" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    
    <footer className="w-full bg-[#10141C] relative flex flex-col items-center justify-between pt-10 pb-6 h-auto border-t border-[#2F3A52]/30 select-none gap-8">
      <div className="w-full max-w-[980px] h-auto grid grid-cols-2 layout-sm:grid-cols-4 gap-y-8 gap-x-4 header-padding">
        {columnsData.map((col, index) => (
          <FooterColumn 
            key={index} 
            title={col.title} 
            items={col.items} 
          />
        ))}
      </div>
     
      <div className="h-[35px] py-[10px] flex items-center justify-center gap-[10px] w-full border-t border-[#2F3A52]/10 pt-4">
        <SocialIconLink href="https://facebook.com" src={facebookIcon} alt="Facebook" />
        <SocialIconLink href="https://instagram.com" src={instagramIcon} alt="Instagram" />
        <SocialIconLink href="https://x.com" src={xIcon} alt="X" />
        <SocialIconLink href="https://tiktok.com" src={tiktokIcon} alt="TikTok" />
      </div>

    </footer>
  );
}