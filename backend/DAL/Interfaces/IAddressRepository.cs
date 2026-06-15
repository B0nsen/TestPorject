using DefaultNamespace;

namespace backend.DAL.Interfaces
{
    public interface IAddressRepository : IRepository<Address>
    {
        Task<IEnumerable<Address>> GetAll();
        Task<Address?> GetById(long id);
        Task Add(Address entity);
        Task Update(Address entity);
        Task Delete(long id);
        Task SaveAsync();
        Task<Address?> GetByUserId(long id);
    }
}
