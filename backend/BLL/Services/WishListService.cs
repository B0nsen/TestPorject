using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class WishlistService : IWishlistService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<WishlistService> logger;

    public WishlistService(IUnitOfWork db, IMapper mapper, ILogger<WishlistService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

   // public async Task Create(WishlistDTO entity)
  //  {
    //    if (entity == null)
      //  {
        //    logger.LogWarning("Null entity given to Create function in WishlistService");
          //  throw new ArgumentNullException(nameof(entity));
        //}

        //try
        //{
          //  await db.R_Wishlist.Add(mapper.Map<Wishlist>(entity));
       // }
        //catch (Exception ex)
        //{
          //  logger.LogError(ex, "Error adding Wishlist in WishlistService");
            //throw new ApplicationException("Error adding Wishlist", ex);
       // }
    //}

public async Task<WishlistDTO> Create(WishlistDTO entity)
{
    var wishlist = mapper.Map<Wishlist>(entity);

    await db.R_Wishlist.Add(wishlist);

    return mapper.Map<WishlistDTO>(wishlist);
}


    public async Task Update(WishlistDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in WishlistService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in WishlistService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Wishlist.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Wishlist with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Wishlist with ID {entity.Id} not found");
            }

            mapper.Map(entity, exists);
            await db.R_Wishlist.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Wishlist with ID {Id} in WishlistService", entity.Id);
            throw new ApplicationException("Error updating Wishlist", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in WishlistService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Wishlist.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Wishlist with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Wishlist with ID {id} not found");
            }

            await db.R_Wishlist.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Wishlist with ID {Id} in WishlistService", id);
            throw new ApplicationException("Error deleting Wishlist", ex);
        }
    }

public async Task<WishlistDTO> Get(int id)
{
    if (id <= 0)
    {
        throw new ArgumentException("ID must be greater than 0", nameof(id));
    }

    try
    {
        var entity = await db.R_Wishlist.GetById(id);

        if (entity == null)
        {
            throw new KeyNotFoundException($"Wishlist with ID {id} not found");
        }

        return mapper.Map<WishlistDTO>(entity);
    }
    catch (KeyNotFoundException)
    {
        throw;
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error getting Wishlist with ID {Id} in WishlistService", id);
        throw new ApplicationException("Error getting Wishlist", ex);
    }
}


    public async Task<IEnumerable<WishlistDTO>> GetAll()
    {
        try
        {
            var lists = await db.R_Wishlist.GetAll();
            if (lists == null)
            {
                logger.LogWarning("GetAll returned null in WishlistService");
                return Enumerable.Empty<WishlistDTO>();
            }

            return lists.Select(MapWishlist);

        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in WishlistService");
            throw new ApplicationException("Error in GetAll function for Wishlist", ex);
        }
    }
    
    private WishlistDTO MapWishlist(Wishlist wishlist)
    {
        return new WishlistDTO
        {
            Id = wishlist.Id,
            UserId = wishlist.UserId,
            Name = wishlist.Name,
            Items = wishlist.Items.Select(item =>
            {
                var mainImage = item.Product?.Images?
                    .OrderByDescending(image => image.IsMain)
                    //.ThenBy(image => image.SortOrder)
                    .FirstOrDefault();

                return new WishlistItemDTO
                {
                    Id = item.Id,
                    WishlistId = item.WishlistId,
                    ProductId = item.ProductId,
                    //ProductName = item.Product?.Name ?? "",
                    //ProductPrice = item.Product?.Price ?? 0,
                    //ProductImageUrl = mainImage?.ImageUrl
                };
            }).ToList()
        };
    }

}