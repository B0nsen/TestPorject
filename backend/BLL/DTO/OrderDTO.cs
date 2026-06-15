namespace backend.BLL.DTO;

public class OrderDTO
{
    public long Id { get; set; }

    public DateTime OrderDate { get; set; }
    public List<OrderItemDTO> Items { get; set; } = new();
}