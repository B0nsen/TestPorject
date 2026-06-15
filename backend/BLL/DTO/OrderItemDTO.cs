namespace backend.BLL.DTO;

public class OrderItemDTO
{
    public long Id { get; set; }
    public long OrderId { get; set; }
    public long ProductId { get; set; }

    public int Quantity { get; set; }
    
    public string? ProductName { get; set; }
    public double ProductPrice { get; set; }
    public string? ProductImageUrl { get; set; }

}