namespace backend.BLL.DTO;

public class ProductImageDTO
{
    public long Id { get; set; }

    // внешний ключ продукта
    public long ProductId { get; set; }

    public string ImageUrl { get; set; }

    // главное изображение товара
    public bool IsMain { get; set; }

    // порядок отображения
    public int SortOrder { get; set; }
}