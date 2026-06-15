using System.Threading.Tasks.Dataflow;
using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Mappers;
using DefaultNamespace;
using Microsoft.Identity.Client.Extensions.Msal;

public class ProductService : IProductService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<ProductService> logger;
    private readonly IProductRepository _productRepository;
    private readonly IFileStorageService storage;

    public ProductService(IUnitOfWork db, IMapper mapper, ILogger<ProductService> logger, IProductRepository productRepository, IFileStorageService storage)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
        _productRepository = productRepository;
        this.storage = storage;
    }

    public async Task<ProductDTO> Create(ProductDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in ProductService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            var filename = Guid.NewGuid() + Path.GetExtension(entity.file.FileName);
            var imageUrl = await storage.UploadFileAsync(entity.file, filename);

            var res = mapper.Map<Product>(entity);
            res.ManufacturerBanner = imageUrl;
            res.ProductCategories.Add(new ProductCategory
            {
                CategoryId = entity.CatalogId
            });
            await db.R_Product.Add(res);
            await db.SaveAsync();
            var productDto = mapper.Map<ProductDTO>(res);
            return productDto;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Product in ProductService");
            throw new ApplicationException("Error adding Product", ex);
        }
    }

    public async Task Update(ProductDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in ProductService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in ProductService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Product.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Product with ID {entity.Id} not found");
            }
            mapper.Map(entity, exists);
            await db.R_Product.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Product with ID {Id} in ProductService", entity.Id);
            throw new ApplicationException("Error updating Product", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in ProductService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Product.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Product with ID {id} not found");
            }

            await db.R_Product.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Product with ID {Id} in ProductService", id);
            throw new ApplicationException("Error deleting Product", ex);
        }
    }

    public async Task<ProductDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in ProductService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_Product.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Product with ID {id} not found");
            }

            return mapper.Map<ProductDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Product with ID {Id} in ProductService", id);
            throw new ApplicationException("Error getting Product", ex);
        }
    }

    public async Task<IEnumerable<ProductDTO>> GetAll()
    {
        try
        {
            var products = await db.R_Product.GetAll();
            if (products == null)
            {
                logger.LogWarning("GetAll returned null in ProductService");
                return Enumerable.Empty<ProductDTO>();
            }

            return mapper.Map<IEnumerable<ProductDTO>>(products);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in ProductService");
            throw new ApplicationException("Error in GetAll function for Product", ex);
        }
    }
    public async Task<CatalogDTO> GetAllCatalog(int pagesize, FilterGetDTO filters)
    {
        try
        {
            var products = await _productRepository.GetAllPage(filters);
            var res = products.MapToDtoList();
            
            res = res.Skip((filters.page - 1) * pagesize).Take(pagesize);
            var total = products.Count();
            
            CatalogDTO catalog = new CatalogDTO()
            {
                limited = Random.Shared.GetItems(res.ToArray(), 3),
                products = res,
                totalCount = total,
                currentPage = filters.page,
                pageSize = pagesize,
            };
            return catalog;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAllCatalog function in ProductService");
            throw new ApplicationException("Error in GetAllCatalog function for Product", ex);
        }
    }

    public async Task<IEnumerable<FilterCellDTO>> GetAllFilters()
    {
        try
        {
            var products = await _productRepository.GetAll();
            var res = products.MapToCellList();
            return res;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAllFilters function in ProductService");
            throw new ApplicationException("Error in GetAllFilters function for Product", ex);
        }
    }
    public async Task<ProductGetDTO> GetPageProduct(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in ProductService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await _productRepository.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Product with ID {id} not found");
            }

            return entity.ToPageDto();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Product with ID {Id} in ProductService", id);
            throw new ApplicationException("Error getting Product", ex);
        }
    }

    public async Task<ProductReviewsDTO> GetProductReview(int id, int userId = 0)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in ProductService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await _productRepository.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Product with ID {id} not found");
            }

            var res = entity.ToReviewDTO(userId);
            return res;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Product with ID {Id} in ProductService", id);
            throw new ApplicationException("Error getting Product", ex);
        }
    }
    public async Task<IEnumerable<ProductSearchDTO>> Search(string query)
    {
        var normalizedQuery = query.Trim().ToLower();

        var products = await db.R_Product.GetAll();

        return products
            .Where(p => p.Name.ToLower().Contains(normalizedQuery))
            .Take(8)
            .Select(p => new ProductSearchDTO
            {
                Id = p.Id,
                Name = p.Name
            });
    }
}