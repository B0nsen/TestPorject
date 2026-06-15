using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IWishlistService
{
    // Task Create(WishlistDTO entity);
    Task<WishlistDTO> Create(WishlistDTO entity);

    Task Update(WishlistDTO entity);
    Task Delete(int id);
    Task<WishlistDTO> Get(int id);
    Task<IEnumerable<WishlistDTO>> GetAll();
}