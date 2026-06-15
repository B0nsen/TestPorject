using backend.BLL.DTO;

namespace backend.BLL.Interfaces
{
    public interface IReviewImagesService
    {
        Task Create(ReviewImagesCreateDTO entity);
        Task Update(ReviewImagesDTO entity);
        Task Delete(int id);
        Task<ReviewImagesDTO> Get(int id);
        Task<IEnumerable<ReviewImagesDTO>> GetAll();
    }
}
