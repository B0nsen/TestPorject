namespace DefaultNamespace;

public interface IWishlistItemService
{
    Task Create(WishlistItemDTO entity);
    Task Update(WishlistItemDTO entity);
    Task Delete(int id);
    Task<WishlistItemDTO> Get(int id);
    Task<IEnumerable<WishlistItemDTO>> GetAll();
}