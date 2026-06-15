namespace backend.BLL.DTO;

public class ImagesDTO
{
        // Main — главное изображение
        // Thumbnails — миниатюры / превью
        public string Main { get; set; }
        public List<string> Thumbnails { get; set; }
    
}