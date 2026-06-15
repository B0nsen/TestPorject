using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class ProductImageService : IProductImageService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<ProductImageService> logger;
    private readonly IProductImageRepository productImageRepository;
    private readonly IFileStorageService storage;

    public ProductImageService(IUnitOfWork db, IMapper mapper, ILogger<ProductImageService> logger, IFileStorageService storage, IProductImageRepository productImageRepository)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
        this.storage = storage;
        this.productImageRepository = productImageRepository;
    }

    public async Task<ProductImageDTO> Create(ProductImageCreateDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in ProductImageService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            var filename = Guid.NewGuid() + Path.GetExtension(entity.file.FileName);
            var imageUrl = await storage.UploadFileAsync(entity.file, filename);
            if (entity.IsMain)
            {
                var img = await productImageRepository.GetMain(entity.ProductId);
                if(img != null)
                {
                    img.IsMain = false;
                }
                else
                {
                    entity.IsMain = true;
                }
            }
            var res = new ProductImage
            {
                ProductId = entity.ProductId,
                ImageUrl = imageUrl,
                FileName = filename,
                IsMain = entity.IsMain,
                SortOrder = 0
            };
            
            await db.R_ProductImage.Add(res);
            return mapper.Map<ProductImageDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding ProductImage in ProductImageService");
            throw new ApplicationException("Error adding ProductImage", ex);
        }
    }

    public async Task Update(ProductImageDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in ProductImageService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in ProductImageService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_ProductImage.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("ProductImage with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"ProductImage with ID {entity.Id} not found");
            }

            mapper.Map(entity, exists);
            await db.R_ProductImage.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating ProductImage with ID {Id} in ProductImageService", entity.Id);
            throw new ApplicationException("Error updating ProductImage", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in ProductImageService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_ProductImage.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("ProductImage with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"ProductImage with ID {id} not found");
            }

            await storage.DeleteFileAsync(exists.FileName);

            await db.R_ProductImage.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting ProductImage with ID {Id} in ProductImageService", id);
            throw new ApplicationException("Error deleting ProductImage", ex);
        }
    }

    public async Task<ProductImageDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in ProductImageService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_ProductImage.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("ProductImage with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"ProductImage with ID {id} not found");
            }

            return mapper.Map<ProductImageDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting ProductImage with ID {Id} in ProductImageService", id);
            throw new ApplicationException("Error getting ProductImage", ex);
        }
    }

    public async Task<IEnumerable<ProductImageDTO>> GetAll()
    {
        try
        {
            var images = await db.R_ProductImage.GetAll();
            if (images == null)
            {
                logger.LogWarning("GetAll returned null in ProductImageService");
                return Enumerable.Empty<ProductImageDTO>();
            }

            return mapper.Map<IEnumerable<ProductImageDTO>>(images);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in ProductImageService");
            throw new ApplicationException("Error in GetAll function for ProductImage", ex);
        }
    }
}