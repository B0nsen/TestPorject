namespace backend.BLL.DTO;

public class CreditCardCreateDTO
{
    public string CardNumber { get; set; }
    public string HolderName { get; set; }
    public DateTime Expiry { get; set; }
    public int Cvv { get; set; }
}