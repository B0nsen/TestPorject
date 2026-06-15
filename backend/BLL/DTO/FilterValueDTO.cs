namespace backend.BLL.DTO;

public class FilterValueDTO
{
    public long Id { get; set; }
    public long ProductId { get; set; }

    public long FilterId { get; set; }

    public string Value { get; set; }
}