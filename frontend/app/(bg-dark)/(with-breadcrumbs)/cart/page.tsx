"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";
import CartItem from "@/components/CartItem";
import CartItemCard from "@/components/CartItemCard";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import SelectAllCart from "@/components/SelectAllCart";
import CheckoutLayout from "@/components/CheckoutLayout";

import CatalogSlider from "@/components/CatalogSlider";

import { CartItemType } from "@/contexts/cart.context";
import { API_URL } from "@/lib/api/api";

export default function CartPage() {
  const [open, setOpen] = useState(false);
  const [sliderProducts, setSliderProducts] = useState<any[]>([]);

  const cartData = useCart() || {};
  const cartItems: CartItemType[] = cartData.cartItems || [];
  const shipping = cartData.shipping !== undefined && cartData.shipping !== null ? cartData.shipping : 10;
  const cartCount = cartData.cartCount || 0;
  const selectedCount = cartData.selectedCount || 0;
  const itemTotal = cartData.itemTotal || 0;
  const discountPercent = cartData.discountPercent || 0;
  const subtotal = cartData.subtotal || 0;
  const total = cartData.total || 0;
  const allChecked = cartData.allChecked || false;

  const toggleItemChecked = cartData.toggleItemChecked || (() => {});
  const toggleSelectAll = cartData.toggleSelectAll || (() => {});
  const increaseQuantity = cartData.increaseQuantity || (() => {});
  const decreaseQuantity = cartData.decreaseQuantity || (() => {});
  const removeFromCart = cartData.removeFromCart || (() => {});

  useEffect(() => {
    const loadSliderData = async () => {
      try {
       const res = await fetch(`${API_URL}/api/homepage`, { cache: "no-store" });
        
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data && data.catalogSlider) {
          console.log("Корзина: данные для слайдера успешно стянуты с бэкенда!");
          setSliderProducts(data.catalogSlider);
          return;
        }
        
        throw new Error("Свойства catalogSlider нет в ответе API бэкенда");

      } catch (error) {
        console.warn(
          `Корзина: бэкенд (${API_URL}) недоступен. Переключаюсь на локальный homepage.json...`
        );
        
        try {
          const res = await fetch("/data/homepage.json");
          const data = await res.json();
          
          if (data && data.catalogSlider) {
            setSliderProducts(data.catalogSlider);
          }
        } catch (fileError) {
          console.error("Корзина: критическая ошибка, не удалось прочитать даже локальный JSON:", fileError);
        }
      }
    };

    loadSliderData();
  }, []);
  const router = useRouter();

  return (
    <>
      <div className="w-full flex flex-col gap-[60px] pb-[80px]">
        <CheckoutLayout
          title="Shopping cart"
          className="bg-transparent"
          header={
            <SelectAllCart
              checked={allChecked}
              count={cartCount}
              onToggle={toggleSelectAll}
            />
          }
          sidebar={
            <CheckoutDesktop
              selectedCount={selectedCount}
              discount={discountPercent}
              subtotal={subtotal}
              itemTotal={itemTotal}
              setOpen={setOpen}
              shipping={shipping}
              total={total}
            />
          }
        >
          {cartItems.length === 0 ? (
            <CartItemCard>
              <span className="text-[20px] leading-[100%] px-[14px]">
                No items
              </span>
            </CartItemCard>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                checked={item.checked}
                onToggleCheck={() => toggleItemChecked(item.id)}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onDelete={() => removeFromCart(Number(item.id))}
              />
            ))
          )}
        </CheckoutLayout>

        {sliderProducts.length > 0 && (
          <div className="w-full max-w-[1528px] mx-auto  md:px-[32px]">
            <CatalogSlider data={sliderProducts} />
          </div>
        )}
      </div>

      {selectedCount > 0 && (
        <CheckoutMobile
          onCheckout={() => router.push("/checkout")}
          discount={discountPercent}
          itemTotal={itemTotal}
          setOpen={setOpen}
          shipping={shipping}
          total={total}
          open={open}
        />
      )}
    </>
  );
}