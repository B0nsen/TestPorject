using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface ICreditCardService
{
    Task Create(CreditCardDTO entity);
    Task Update(CreditCardDTO entity);
    Task Delete(int id);
    Task<CreditCardDTO> Get(int id);
    Task<IEnumerable<CreditCardDTO>> GetAll();
}