namespace DefaultNamespace;

public class CartDTO
{
    public List<CartItemPageDTO> Items { get; set; }
    public decimal Shipping { get; set; }
    
    public decimal TotalPrice => Items.Sum(i => i.price * i.quantity) + Shipping;
}

public class CartItemPageDTO
{
    public long Id { get; set; }
    public string title { get; set; }
    public decimal? listPrice { get; set; }
    public decimal price { get; set; }
    public int? discount { get; set; }
    public int quantity { get; set; }
    public bool inStock { get; set; }
    public string image { get; set; }
}