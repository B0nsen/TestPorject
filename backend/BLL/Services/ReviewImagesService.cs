using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Models;
using DefaultNamespace;

namespace backend.BLL.Services
{
    public class ReviewImagesService : IReviewImagesService
    {
        private readonly IUnitOfWork db;
        private readonly IMapper mapper;
        private readonly ILogger<ReviewImagesService> logger;
        private readonly IFileStorageService storage;

        public ReviewImagesService(IUnitOfWork db, IMapper mapper, ILogger<ReviewImagesService> logger, IFileStorageService storage)
        {
            this.db = db;
            this.mapper = mapper;
            this.logger = logger;
            this.storage = storage;
        }

        public async Task Create(ReviewImagesCreateDTO entity)
        {

            try
            {
                var filename = Guid.NewGuid() + Path.GetExtension(entity.file.FileName);
                var imageUrl = await storage.UploadFileAsync(entity.file, filename);

                var res = new ReviewImages {
                    ImageUrl = imageUrl,
                    FileName = filename
                };
                await db.R_ReviewImages.Add(res);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error adding Role in RoleService");
                throw new ApplicationException("Error adding Role", ex);
            }
        }

        public async Task Update(ReviewImagesDTO entity)
        {
            if (entity == null)
            {
                logger.LogWarning("Null entity given to Update function in RoleService");
                throw new ArgumentNullException(nameof(entity));
            }

            if (entity.Id <= 0)
            {
                logger.LogWarning("Invalid ID {Id} in Update function in RoleService", entity.Id);
                throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
            }

            try
            {
                var exists = await db.R_ReviewImages.GetById(entity.Id);
                if (exists == null)
                {
                    logger.LogWarning("Role with ID {Id} not found in Update function", entity.Id);
                    throw new KeyNotFoundException($"Role with ID {entity.Id} not found");
                }

                mapper.Map(entity, exists);
                await db.R_ReviewImages.Update(exists);
                await db.SaveAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error updating Role with ID {Id} in RoleService", entity.Id);
                throw new ApplicationException("Error updating Role", ex);
            }
        }

        public async Task Delete(int id)
        {
            if (id <= 0)
            {
                logger.LogWarning("Invalid ID {Id} in Delete function in RoleService", id);
                throw new ArgumentException("ID must be greater than 0", nameof(id));
            }

            try
            {
                var exists = await db.R_ReviewImages.GetById(id);
                if (exists == null)
                {
                    logger.LogWarning("Role with ID {Id} not found in Delete function", id);
                    throw new KeyNotFoundException($"Role with ID {id} not found");
                }

                await db.R_ReviewImages.Delete(id);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error deleting Role with ID {Id} in RoleService", id);
                throw new ApplicationException("Error deleting Role", ex);
            }
        }

        public async Task<ReviewImagesDTO> Get(int id)
        {
            if (id <= 0)
            {
                logger.LogWarning("Invalid ID {Id} in Get function in RoleService", id);
                throw new ArgumentException("ID must be greater than 0", nameof(id));
            }

            try
            {
                var entity = await db.R_ReviewImages.GetById(id);
                if (entity == null)
                {
                    logger.LogWarning("Role with ID {Id} not found in Get function", id);
                    throw new KeyNotFoundException($"Role with ID {id} not found");
                }

                return mapper.Map<ReviewImagesDTO>(entity);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error getting Role with ID {Id} in RoleService", id);
                throw new ApplicationException("Error getting Role", ex);
            }
        }

        public async Task<IEnumerable<ReviewImagesDTO>> GetAll()
        {
            try
            {
                var roles = await db.R_Role.GetAll();
                if (roles == null)
                {
                    logger.LogWarning("GetAll returned null in RoleService");
                    return Enumerable.Empty<ReviewImagesDTO>();
                }

                return mapper.Map<IEnumerable<ReviewImagesDTO>>(roles);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error in GetAll function in RoleService");
                throw new ApplicationException("Error in GetAll function for Role", ex);
            }
        }
    }
}
