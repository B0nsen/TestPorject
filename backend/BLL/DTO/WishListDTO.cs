using DefaultNamespace;

namespace backend.BLL.DTO;

public class WishlistDTO
{
    public long Id { get; set; }

    // ������� ���� ������������
    public long UserId { get; set; }

    // ��� ������ (��������: "Birthday", "Electronics")
    public string Name { get; set; }
    
    public List<WishlistItemDTO> Items { get; set; } = new();
}