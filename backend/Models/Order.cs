namespace DefaultNamespace;

public class Order
{
    public long Id { get; set; }

    public DateTime OrderDate { get; set; }

    // элементы заказа
    public List<OrderItem> Items { get; set; } = new();

    // пустой конструктор (нужен EF Core)
    public Order() { }

    // конструктор
    public Order(DateTime orderDate)
    {
        OrderDate = orderDate;
    }

    // добавление товара в заказ
    public void AddItem(OrderItem item)
    {
        Items.Add(item);
    }
}