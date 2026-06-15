using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IAddressService
{
    Task Create(AddressDTO entity);
    Task Update(AddressDTO entity);
    Task Delete(int id);
    Task<AddressDTO> Get(int id);
    Task<IEnumerable<AddressDTO>> GetAll();
    Task<AddressDTO> GetByUserId(int id);
}