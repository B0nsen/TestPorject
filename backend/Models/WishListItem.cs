namespace DefaultNamespace;

public class WishlistItem
{
    public long Id { get; set; }

    // Внешние ключи
    public long ProductId { get; set; }
    public long WishlistId { get; set; }

    // Навигационные свойства
    public Product Product { get; set; }
    public Wishlist Wishlist { get; set; }

    // Пустой конструктор (нужен EF Core)
    public WishlistItem() { }

    // Конструктор для создания элемента списка желаемого
    public WishlistItem(long productId, long wishlistId)
    {
        ProductId = productId;
        WishlistId = wishlistId;
    }
}