namespace backend.BLL.DTO;

public class CreditCardDTO
{
    public long Id { get; set; }

    public string CardNumber { get; set; }

    public string HolderName { get; set; }

    public DateTime Expiry { get; set; }

    public int Cvv { get; set; }

    // внешний ключ пользователя
    public long UserId { get; set; }
}