namespace DefaultNamespace;

public class EmailConfirmationToken
{
    public long Id { get; set; }

    public long UserId { get; set; }
    public User User { get; set; }

    public string TokenHash { get; set; }

    public DateTime ExpiresAt { get; set; }
    public DateTime? UsedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}