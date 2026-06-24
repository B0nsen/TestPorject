"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import AboutItem from "@/components/AboutItem";
import ProductActionsSection from "@/components/ProductActions";
import AboutProduct from "@/components/AboutProduct";

import ProductImageGallery from "@/components/ProductImageGallery";
import ProductManufacturerInfo from "@/components/ProductManufacturerInfo";
import ReviewSection from "@/components/ReviewSection";
import ProductInformation from "@/components/ProductInformation";
import ProductDescription from "@/components/ProductDescription";
import SelectWishlistModal from "@/components/SelectWishlistModal";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useRouter } from "next/navigation";

import CatalogSlider from "@/components/CatalogSlider";
import { useCatalogSlider } from "@/lib/hooks/useCatalogSlider";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

type Wishlist = {
  id: number;
  userId: number;
  name: string;
};

export default function ProductPage() {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userReview, setUserReview] = useState<any>(null);
  const [productData, setProductData] = useState<any>(null);
  const [reviewsData, setReviewsData] = useState<any>(null);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  
  const router = useRouter();

  const [isWishlistAuthorized, setIsWishlistAuthorized] = useState(true);
  const [isProductFavorite, setIsProductFavorite] = useState(false);

  const { sliderProducts } = useCatalogSlider();
  const { addToWishlist } = useWishlist();

  const fetchReviews = async () => {
    console.log("enter fetch reviews");
    try {
      const reviewsRes = await fetch(
        `${API_BASE}/api/product/reviews/${params.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!reviewsRes.ok) {
        console.error("Failed to load reviews:", reviewsRes.status);
        return;
      }

      const reviews = await reviewsRes.json();
      setReviewsData(reviews.result);

      const userReview = reviews.result.userReview;
      setUserReview(userReview?.id === 0 ? null : userReview);
    } catch (err) {
      console.error("Failed to refetch reviews:", err);
    }
  };

  const fetchWishlists = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/Wishlist/my`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        setIsWishlistAuthorized(false);
        return;
      }

      if (!res.ok) {
        console.error("Failed to fetch wishlists:", res.status);
        return;
      }

      setIsWishlistAuthorized(true);
      const data = await res.json();
      setWishlists(data);
    } catch (err) {
      console.error("wishlist fetch error:", err);
    }
  };

  const handleConfirmWishlist = (wishlistId: number) => {
    if (!productData) return;
    addToWishlist(productData.id, wishlistId);
    setIsProductFavorite(true);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const productRes = await fetch(
          `${API_BASE}/api/product/getpage/${params.id}`,
        );

        if (!productRes.ok) {
          throw new Error(
            `Failed to load product page main content: ${productRes.status}`,
          );
        }

        const product = await productRes.json();
        setProductData(product.products);
        console.log(product.products);

        await fetchReviews();
        await fetchWishlists();
      } catch (err) {
        console.error("Failed to load product page data from server:", err);
      }
    };

    loadData();
  }, [params.id]);


  const openWishlistModal = () => {
    if (!isWishlistAuthorized) {
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const closeWishlistModal = () => {
    setIsModalOpen(false);
  };

  if (!productData || !reviewsData) {
    return <div className="text-center p-10 text-[#E6ECF5]">Loading...</div>;
  }

  return (
    <main className="w-full flex justify-center flex-col items-center bg-transparent layout-product-px">
      <div className="w-full max-w-[1528px] flex flex-col gap-[44px] py-[44px]">
        <div className="w-full flex flex-col items-start layout-product-xs:flex-row justify-between gap-4">
          <ProductImageGallery images={productData.images} />
          <AboutProduct
            product={productData}
            onWishlistClick={openWishlistModal}
          />
          <ProductActionsSection
            product={productData}
            isFavorite={isProductFavorite}
            onWishlistClick={openWishlistModal}
          />
        </div>

        <AboutItem tabletOnly items={productData.aboutItems} />

        <ProductManufacturerInfo
          manufacturerBanner={productData.manufacturerBanner}
        />

        <ProductInformation
          productInfo={productData.productInfo}
          warranty={productData.warranty}
        />

        <ProductDescription description={productData.description} />

        <ReviewSection
          reviews={reviewsData.reviews}
          onReviewCreated={fetchReviews}
          reviewStats={reviewsData.reviewStats}
          product={productData}
          userReview={userReview}
        />

        {sliderProducts.length > 0 && (
          <div className="w-full mt-6 border-t border-white/10 pt-[44px]">
            <CatalogSlider data={sliderProducts} />
          </div>
        )}
      </div>

      <SelectWishlistModal
        isOpen={isModalOpen}
        onClose={closeWishlistModal}
        wishlists={wishlists}
        onConfirm={handleConfirmWishlist}
      />
    </main>
  );
}
