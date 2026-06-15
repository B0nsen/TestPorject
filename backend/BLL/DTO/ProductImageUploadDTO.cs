namespace backend.BLL.DTO
{
    public class ProductImageCreateDTO
    {
        public long ProductId { get; set; }
        public IFormFile file { get; set; } = null!;
        public bool IsMain { get; set; }
        public int SortOrder { get; set; }
    }
}
