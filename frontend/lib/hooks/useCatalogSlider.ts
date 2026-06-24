import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export function useCatalogSlider() {
  const [sliderProducts, setSliderProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSliderData = async () => {
      const HOMEPAGE_API = `${API_BASE}/api/homepage`;

      try {
        const res = await fetch(HOMEPAGE_API, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const data = await res.json();

        if (data?.catalogSlider) {
          setSliderProducts(data.catalogSlider);
          return;
        }

        throw new Error("Missing catalogSlider in API response");
      } catch (err) {
        try {
          const res = await fetch("/data/homepage.json");
          const data = await res.json();

          if (data?.catalogSlider) {
            setSliderProducts(data.catalogSlider);
          }
        } catch (fileError) {
          console.error("Slider fallback failed:", fileError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadSliderData();
  }, []);

  return { sliderProducts, loading };
}