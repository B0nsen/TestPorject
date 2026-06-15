import ProductInfoTable from "./ProductInfoTable";
import ProductPrice from "./ProductPrice";
import ProductPurchaseActions from "./ProductPurchaseActions";

export default function ProductActionsSection({ product, onWishlistClick }: { product: any, onWishlistClick?: (productId: number) => void; }) {
  return (
    <section
      className="w-full layout-product-xs:w-[244px] block layout-product-xs:hidden layout-product-lg:block shrink-0 
    bg-surface-card px-[14px] py-[14px] text-default rounded-lg border-card"
    >
      <div className="flex flex-col gap-[14px]">
        <ProductPrice price={product.price.currentPrice} />

        <p className="text-[13.6px] leading-[20px]">
          {product.actionsSection.deliveryText}{" "}
          <span className="font-bold">
            {product.actionsSection.deliveryDate}
          </span>
        </p>

        <div className="flex items-center gap-2 text-muted">
          <div className="w-[16px] h-[14px] bg-muted"></div>
          <span className="text-[11.3px] leading-[18px] align-middle">
            Delivering to {product.actionsSection.shippingLocation}
          </span>
        </div>

        <ProductPurchaseActions
          maxQuantity={product.maxQuantity}
          inStock={product.inStock}
          productId={product.id}
          onWishlistClick={onWishlistClick}
        />

        <ProductInfoTable data={product.actionsSection} />
      </div>
    </section>
  );
}
