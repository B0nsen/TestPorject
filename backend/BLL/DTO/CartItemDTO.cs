using System.Reflection;

namespace backend.BLL.DTO;

public class CartItemDTO
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long ProductId { get; set; }

    public int Quantity { get; set; }
}

public class CreateCartItemDTO
{
    public long ProductId { get; set; }
    public int Quantity { get; set; }
}