namespace DefaultNamespace;

public class OrderItem
{
    public long Id { get; set; }
    public long OrderId { get; set; }
    public long ProductId { get; set; }

    public int Quantity { get; set; }

    // навигационные свойства
    public Order Order { get; set; }
    public Product Product { get; set; }

    public OrderItem() { }

    public OrderItem(long orderId, long productId, int quantity)
    {
        OrderId = orderId;
        ProductId = productId;
        Quantity = quantity;
    }
}