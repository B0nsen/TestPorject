namespace backend.BLL.DTO;

public class ResetPasswordDTO
{
    public string Token { get; set; }
    public string NewPassword { get; set; }
}