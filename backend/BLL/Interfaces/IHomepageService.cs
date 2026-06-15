using backend.BLL.DTO;

namespace backend.BLL.Interfaces
{
    public interface IHomepageService
    {
        Task<HomepageDTO> Get();
    }
}
