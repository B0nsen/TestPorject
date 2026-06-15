namespace DefaultNamespace;

public class WishlistItemDTO
{
    public long Id { get; set; }
    public long WishlistId { get; set; }
    public long ProductId { get; set; }

    public string ProductName { get; set; }
    public double ProductPrice { get; set; }
    public string? ProductImageUrl { get; set; }
    public double ProductRating { get; set; }

}
