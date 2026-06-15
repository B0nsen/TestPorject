namespace DefaultNamespace;

public class ProductImage
{
    public long Id { get; set; }

    // внешний ключ продукта
    public long ProductId { get; set; }

    public string ImageUrl { get; set; }

    // главное изображение товара
    public bool IsMain { get; set; }

    public string FileName { get; set; }

    // порядок отображения
    public int SortOrder { get; set; }

    // навигационное свойство
    public Product Product { get; set; }

    public ProductImage() { }

    public ProductImage(long productId, string imageUrl, bool isMain, int sortOrder)
    {
        ProductId = productId;
        ImageUrl = imageUrl;
        IsMain = isMain;
        SortOrder = sortOrder;
    }
}