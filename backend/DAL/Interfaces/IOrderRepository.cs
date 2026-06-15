namespace DefaultNamespace;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetAll();
    Task<Order?> GetById(long id);
    Task Add(Order entity);
    Task Update(Order entity);
    Task Delete(long id);
}