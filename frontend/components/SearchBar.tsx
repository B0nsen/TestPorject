"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import SearchBarButton from "@/components/SearchBarButton";
import arrowDownIcon from "@/assets/icons/arrow-down.svg";
import arrowUpIcon from "@/assets/icons/arrow-up.svg";
import searchIcon from "@/assets/icons/search.svg";

const API = "http://localhost:5012/api/product";

const CATEGORIES = [
    "Tech",
    "Home",
    "Fashion",
    "Beauty",
    "Sports",
    "Toys",
    "Pets",
    "Grocery",
    "Accessories"
];

type Product = {
    id: number;
    name?: string;
    title?: string;
};

export default function SearchBar() {
    const router = useRouter();
    const categoryMenuRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await fetch(API);
                if (!res.ok) return;
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
                setIsCategoryOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const filtered = products
            .filter((product) => {
                const title = product.name || product.title || "";
                return title.toLowerCase().includes(query);
            })
            .slice(0, 6);

        setSuggestions(filtered);
        setIsOpen(filtered.length > 0);
    }, [search, products]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = search.trim();
        if (!query) return;

        router.push(`/catalog?search=${encodeURIComponent(query)}`);
        setIsOpen(false);
    };

    const handleSelect = (product: Product) => {
        router.push(`/product/${product.id}`);
        setIsOpen(false);
    };

    
    const handleCategorySelect = (category: string) => {
  setIsCategoryOpen(false);
  router.push(`/catalog?department=${encodeURIComponent(category)}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative w-full flex items-center h-10"
        >
            <div ref={categoryMenuRef} className="relative h-full flex items-center">
                <SearchBarButton
                    
                    icon={isCategoryOpen ? arrowUpIcon : arrowDownIcon}
                    label="All" 
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="bg-[#2B3242] text-[#E6ECF5] rounded-l-[4px]" 
                    iconHeight={3}
                    iconWidth={6}
                    hiddenOnMobile
                />

                {isCategoryOpen && (
                    <div 
                        className="absolute left-0 top-[40px] w-[162px] bg-[#C5CEE3] rounded-b-[10px] shadow-2xl z-50 flex flex-col py-[4px] overflow-hidden border border-[#2F3A52]/20"
                        style={{ backdropFilter: "blur(4px)" }}
                    >
                        {CATEGORIES.map((category, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleCategorySelect(category)}
                                className="w-full h-[29px] text-left px-[14px] text-[13px] font-normal text-[#10141C]/60 hover:bg-[#AFCBFF] hover:text-[#10141C] transition-colors border-b-[0.5px] border-[#10141C]/20 last:border-b-0 text-ellipsis overflow-hidden whitespace-nowrap"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => {
                    if (suggestions.length > 0) setIsOpen(true);
                }}
                className="h-full w-full bg-[#C5CEE3] border-none outline-none px-[10px] text-[14.3px] leading-none text-[#1A2030] placeholder-[#5E6E8F]"
                type="text"
                aria-label="Search"
                placeholder="Search"
            />

            <SearchBarButton
                icon={searchIcon}
                className="bg-[#2B3242] text-[#E6ECF5] rounded-r-[4px]"
            />

            {isOpen && (
                <div className="absolute left-[45px] right-0 top-[44px] z-50 bg-white text-black rounded-[8px] shadow-lg overflow-hidden border border-[#2F3A52]/20">
                    {suggestions.map((product) => {
                        const title = product.name || product.title || "Untitled product";

                        return (
                            <button
                                key={product.id}
                                type="button"
                                onMouseDown={() => handleSelect(product)}
                                className="w-full text-left px-[12px] py-[10px] text-[14px] hover:bg-gray-100 transition-colors"
                            >
                                {title}
                            </button>
                        );
                    })}
                </div>
            )}
        </form>
    );
}