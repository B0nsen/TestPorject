export default function ProductDescription({ description }: { description: string }) {
  return (
    <section className="w-full">
      <h3 className="text-title-sm mb-[15px]">Product Description</h3>
      <p className="text-[14px] align-middle">{description}</p>
    </section>
  );
}