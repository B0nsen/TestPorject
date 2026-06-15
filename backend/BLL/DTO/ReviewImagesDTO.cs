namespace backend.BLL.DTO
{
    public class ReviewImagesDTO
    {
        public long Id { get; set; }
        public string ImageUrl { get; set; }
    }

    public class ReviewImagesCreateDTO
    {
        public IFormFile file { get; set; } = null!;
    }
}
