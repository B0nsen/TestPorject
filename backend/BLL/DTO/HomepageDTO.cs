namespace backend.BLL.DTO
{
    public class HomepageDTO
    {
        public List<RecommendedRow1> recommendedRow1 { get; set; }
        public List<CategoryDTO> recommendedRow2 { get; set; }
        public List<ProductCatalogGetDTO> catalogSlider { get; set; }
        public List<RecommendedRow3> recommendedRow3 { get; set; }
    }
    public class RecommendedRow1
    {
        public string Title { get; set; }
        public List<CategoryDTO> Items { get; set; }
    }
    public class RecommendedRow3
    {
        public long Id { get; set; }
        public string Type { get; set; }
        public string? Title { get; set; }
        public string? Name { get; set; }
        public double? price { get; set; }
        public List<string>? images { get; set; }
        public string? imageSrc { get; set; }
    }
}
