import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    {
      title: "Electronics & Gadgets",
      items: [
        { title: "Smartphones", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Laptops", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Smart Watches", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Wireless Earbuds", imageSrc: "/images-temp/shoes2.jpg" },
      ]
    },
    {
      title: "Home & Kitchen",
      items: [
        { title: "Coffee Machines", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Air Fryers", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Vacuum Cleaners", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Kitchen Blenders", imageSrc: "/images-temp/shoes2.jpg" },
      ]
    },
    {
      title: "Gaming & Entertainment",
      items: [
        { title: "Gaming Consoles", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "PC Gaming Gear", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "VR Headsets", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Streaming Devices", imageSrc: "/images-temp/shoes2.jpg" },
      ]
    },
    {
      title: "Fashion & Accessories",
      items: [
        { title: "Sneakers", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Backpacks", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Sunglasses", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Jewelry", imageSrc: "/images-temp/shoes2.jpg" },
      ]
    }
  ];

  return NextResponse.json(data);
}