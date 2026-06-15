using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.BLL.Interfaces;

public interface ICartItemService
{
    Task Create(CartItemDTO entity);
    Task Update(CartItemDTO entity);
    Task Delete(int id);
    Task<CartItemDTO> Get(int id);
    Task<IEnumerable<CartItemDTO>> GetAll();
    Task<IEnumerable<CartItemPageDTO>> GetAllPage(long Id);

}