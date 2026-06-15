namespace DefaultNamespace;

public class CartItem
{
    public long Id { get; set; }

    // внешний ключ пользователя
    public long UserId { get; set; }
    public User User { get; set; }

    // внешний ключ продукта
    public long ProductId { get; set; }
    public Product Product { get; set; }

    public int Quantity { get; set; }

    // пустой конструктор
    public CartItem() { }

    // конструктор
    public CartItem(long userId, long productId, int quantity)
    {
        UserId = userId;
        ProductId = productId;
        Quantity = quantity;
    }

    // изменение количества
    public void ChangeQuantity(int quantity)
    {
        Quantity = quantity;
    }
}