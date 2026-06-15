import { create } from "zustand";

export type PaymentData = {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv?: string;
  saveCard?: boolean;
};

type PaymentStore = {
  payment: PaymentData | null;
  setPayment: (data: PaymentData) => void;
  clearPayment: () => void;
};

export const usePaymentStore = create<PaymentStore>((set) => ({
  payment: null,

  setPayment: (data) =>
    set(() => ({
      payment: data,
    })),

  clearPayment: () =>
    set(() => ({
      payment: null,
    })),
}));