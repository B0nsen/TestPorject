using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IOrderItemService
{
    Task Create(OrderItemDTO entity);
    Task Update(OrderItemDTO entity);
    Task Delete(int id);
    Task<OrderItemDTO> Get(int id);
    Task<IEnumerable<OrderItemDTO>> GetAll();
}