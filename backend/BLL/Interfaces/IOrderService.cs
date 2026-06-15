using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IOrderService
{
    Task Create(OrderDTO entity);
    Task Update(OrderDTO entity);
    Task Delete(int id);
    Task<OrderDTO> Get(int id);
    Task<IEnumerable<OrderDTO>> GetAll();
}