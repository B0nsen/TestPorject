using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IRoleService
{
    Task Create(RoleDTO entity);
    Task Update(RoleDTO entity);
    Task Delete(int id);
    Task<RoleDTO> Get(int id);
    Task<IEnumerable<RoleDTO>> GetAll();
}