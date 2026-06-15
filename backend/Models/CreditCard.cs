namespace DefaultNamespace;

public class CreditCard
{
    public long Id { get; set; }

    public string CardNumber { get; set; }

    public string HolderName { get; set; }

    public DateTime Expiry { get; set; }

    public int Cvv { get; set; }

    // внешний ключ пользователя
    public long UserId { get; set; }

    // навигационное свойство
    public User User { get; set; }

    public CreditCard() { }

    public CreditCard(string cardNumber, string holderName, DateTime expiry, int cvv, long userId)
    {
        CardNumber = cardNumber;
        HolderName = holderName;
        Expiry = expiry;
        Cvv = cvv;
        UserId = userId;
    }
}