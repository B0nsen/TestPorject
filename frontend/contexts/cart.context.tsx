"use client";
import { createContext, useEffect, useState } from "react";
import { cartApi } from "@/lib/api/cart.api";
import { useMemo } from "react";

export type CartItemType = {
  id: number;
  title: string;
  image: string;
  price: number;
  checked: boolean;
  quantity: number;
  inStock: boolean;
  listPrice: number;
  discount: number;
};

type CartContextType = {
  cartItems: CartItemType[];
  shipping: number;

  subtotal: number;
  itemTotal: number;
  total: number;
  discountPercent: number;

  allChecked: boolean;
  checkedItems: CartItemType[];

  selectedCount: number;
  cartCount: number;
  reloadCart: () => Promise<void>;
  addToCart: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;

  toggleItemChecked: (id: number) => void;
  toggleSelectAll: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [shipping, setShipping] = useState(0);

  const getCartTotals = (items: CartItemType[], shipping: number) => {
    const checkedItems = items.filter((i) => i.checked);

    const subtotal = checkedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const itemTotal = checkedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const discountAmount = subtotal - itemTotal;

    const discountPercent =
      subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;

    const total = itemTotal + (checkedItems.length > 0 ? shipping : 0);

    return {
      checkedItems,
      subtotal,
      itemTotal,
      total,
      discountPercent,
      selectedCount: checkedItems.length,
    };
  };

  const removeFromCart = async (id: number) => {
    await cartApi.remove(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = async (id: number) => {
    updateQuantity(id, 1);
    try {
      await cartApi.increase(id);
    } catch (e) {
      updateQuantity(id, -1);
    }
  };

  const decreaseQuantity = async (id: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item || item.quantity <= 1) return;
    updateQuantity(id, -1);
    try {
      await cartApi.decrease(id);
    } catch (e) {
      updateQuantity(id, 1);
    }
  };

  const addToCart = async (id: number, quantity: number) => {
    try {
      const result = await cartApi.addToCart(id, quantity);
      console.log("Success:", result);

      const data = await cartApi.getCart();
      setCartItems(data.items);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const toggleItemChecked = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };
  const toggleSelectAll = () => {
    const nextState = selectedCount !== cartItems.length;
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, checked: nextState })),
    );
  };

  const loadCart = async () => {
      try {
          const data = await cartApi.getCart();

          if (!data) {
              console.warn("Error");
              return;
          }

          const savedChecked = localStorage.getItem("cartChecked");
          const checkedIds: number[] = savedChecked ? JSON.parse(savedChecked) : [];

          if (data.shipping !== undefined) {
              setShipping(data.shipping);
          }

          if (data.items !== undefined) {
              const itemsWithChecked = data.items.map((item: CartItemType) => ({
                  ...item,
                  listPrice: item.listPrice ?? item.price,
                  checked: checkedIds.includes(item.id),
              }));

              setCartItems(itemsWithChecked);
          }
      } catch (error) {
          console.error("Error:", error);
      }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const checkedIds = cartItems
      .filter((item) => item.checked)
      .map((item) => item.id);

    localStorage.setItem("cartChecked", JSON.stringify(checkedIds));
  }, [cartItems]);

  const totals = useMemo(
    () => getCartTotals(cartItems, shipping),
    [cartItems, shipping],
  );
  const {
    checkedItems,
    subtotal,
    itemTotal,
    total,
    discountPercent,
    selectedCount,
  } = totals;

  const allChecked =
    cartItems.length > 0 && checkedItems.length === cartItems.length;
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        shipping,
        total,
        subtotal,
        itemTotal,
        allChecked,
        discountPercent,
        checkedItems,
        selectedCount,
        cartCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        toggleItemChecked,
        toggleSelectAll,
        reloadCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
