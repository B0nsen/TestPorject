import { CartContext } from "@/contexts/cart.context";
import { useContext } from "react";

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside provider");
  }

  return ctx;
};