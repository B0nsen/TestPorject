"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

import CheckoutLayout from "@/components/CheckoutLayout";
import CheckoutMobile from "@/components/CheckoutMobile";
import CartItem from "@/components/CartItem";

import CheckoutStep from "@/components/CheckoutStep";
import CheckoutCardList from "@/components/CheckoutCardList";
import ShippingChecks from "@/components/ShippingChecks";

import AddressForm from "@/components/AddressForm";
import PaymentForm from "@/components/PaymentForm";

import { PaymentData } from "@/lib/types/payment";
import { useEditableList } from "@/lib/hooks/useEditableList";
import { useSelectableList } from "@/lib/hooks/useSelectableList";
import CheckoutDesktopAlt from "@/components/CheckoutDesktopAlt";
import { useRouter } from "next/navigation";
import { AddressFormValues } from "@/lib/validation/address.schema";

export type StepMode = "form" | "card" | "open";
export type AddressData = AddressFormValues;

export default function CheckoutPage() {
  const [open, setOpen] = useState(false);

  const [cartMode, setCartMode] = useState<StepMode>("card");
  const addressSelect = useSelectableList<AddressData>();
  const shippingSelect = useSelectableList<(typeof shippingChecks)[number]>();
  const paymentSelect = useSelectableList<PaymentData>();

  const address = useEditableList<AddressData>((index) => {
    addressSelect.select(index);
  });

  const payment = useEditableList<PaymentData>((index) => {
    paymentSelect.select(index);
  });
  
  const {
    checkedItems,
    shipping,
    selectedCount,
    itemTotal,
    discountPercent,
    subtotal,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const shippingChecks = [
    {
      label: "9 - 14 businessdays after shipping",
      subLabel: "29.30$ - Expected Shipping",
    },
    {
      label: "5 - 7 businessdays after shipping",
      subLabel: "39.90$ - Express Shipping",
    },
  ] as const;
  const router = useRouter();

  const handleCheckout = async () => {
    if (address.items.length === 0) {
      address.setMode("form");
      return;
    }

    if (payment.items.length === 0) {
      payment.setMode("form");
      return;
    }

    if (cartMode !== "open") {
      setCartMode("open");
      return;
    }
    try {
    const payload = {
      items: checkedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/User/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    let data = {};
    const text = await res.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.warn("Response is not valid JSON:", text);
      }
    }
    router.push(`/order-success`);
  } catch (error) {
    console.error("Checkout failed:", error);
    router.push(`/order-success`);
  }
  };
  const mockPayment = {
    cardNumber: "4242 4242 4242 4242",
    nameOnCard: "Oleksandr Kovalenko",
    expiryDate: "01/29",
    cvv: "123",
  };
  return (
    <>
      <CheckoutLayout
        title="Shipping and Payment"
        sidebar={
          <CheckoutDesktopAlt
            onCheckout={handleCheckout}
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
        <CheckoutStep
          step={1}
          title="Select delivery address"
          mode={address.mode}
          changeLabel={
            address.items.length > 0 ? "Change" : "Add new delivery address"
          }
          onOpen={() => address.setMode("form")}
        >
          {address.mode === "form" && (
            <AddressForm
              defaultValues={
                address.editingIndex !== null
                  ? address.items[address.editingIndex]
                  : {
                      firstName: "Oleksandr",
                      lastName: "Kovalenko",
                      phone: "674821935",
                      address: {
                        street: "vul. Derebasivska",
                        houseNumber: "15",
                        city: "Odesa",
                        postalCode: "65000",
                      },
                      country: "UA",
                    }
              }
              onSubmit={(data) => {
                address.saveItem({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  phone: data.phone,
                  country: data.country,
                  address: {
                    street: data.street,
                    houseNumber: data.houseNumber,
                    city: data.city,
                    postalCode: data.postalCode,
                  },
                } as AddressData);
              }}
              submitLabel="Use this address"
            />
          )}

          {address.mode === "card" && (
            <CheckoutCardList
              items={address.items}
              renderItem={(a) => [
                `${a.firstName} ${a.lastName}`,
                `Phone number: ${a.phone}`,
                `${a.address?.street} ${a.address?.houseNumber}, ${a.address?.city}, ${a.country}, ${a.address?.postalCode}`,
              ]}
              onEdit={address.editItem}
              onAdd={address.addNew}
              addLabel="Add a new delivery address"
              selectedIndex={addressSelect.selectedIndex}
              onSelect={addressSelect.select}
            />
          )}
        </CheckoutStep>

        <CheckoutStep
          step={2}
          title="Payment method"
          changeLabel={
            payment.items.length > 0 ? "Change" : "Add new payment method"
          }
          mode={payment.mode}
          onOpen={() => payment.setMode("form")}
          disabled={address.items.length === 0}
        >
          {payment.mode === "form" && (
            <PaymentForm
              onSubmit={payment.saveItem}
              submitLabel="Use this card"
              disableCheckbox={true}
              defaultValues={mockPayment}
            />
          )}

          {payment.mode === "card" && (
            <CheckoutCardList
              items={payment.items}
              renderItem={(p) => [
                `Visa ending in ${p.cardNumber.slice(-4)}`,
                `Name on card: ${p.nameOnCard}`,
                `Expires on ${p.expiryDate}`,
              ]}
              onEdit={payment.editItem}
              onAdd={payment.addNew}
              addLabel="Add a new payment method"
              selectedIndex={paymentSelect.selectedIndex}
              onSelect={paymentSelect.select}
            />
          )}
        </CheckoutStep>

        <CheckoutStep
          step={3}
          title="Cart items"
          mode={cartMode}
          onOpen={() => setCartMode("open")}
          disabled={payment.items.length === 0}
        >
          {cartMode === "open" && (
            <>
              <span className="text-accent-muted">
                Order now and we'll notify you by email when we have an
                estimated delivery date for this item.
              </span>
              <div className="flex gap-[20px] sm:flex-row flex-col">
                <div className="flex flex-col gap-[10px] max-w-[634px]">
                  {checkedItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onToggleCheck={() => {}}
                      onIncrease={() => increaseQuantity(item.id)}
                      onDecrease={() => decreaseQuantity(item.id)}
                      onDelete={() => removeFromCart(item.id)}
                    />
                  ))}
                </div>
                <ShippingChecks
                  items={shippingChecks}
                  selectedIndex={shippingSelect.selectedIndex}
                  onSelect={shippingSelect.select}
                />
              </div>
            </>
          )}
        </CheckoutStep>
      </CheckoutLayout>

      {selectedCount > 0 && (
        <CheckoutMobile
          onCheckout={handleCheckout}
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
