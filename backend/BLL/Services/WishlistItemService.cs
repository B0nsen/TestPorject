using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class WishlistItemService : IWishlistItemService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<WishlistItemService> logger;

    public WishlistItemService(
        IUnitOfWork db,
        IMapper mapper,
        ILogger<WishlistItemService> logger
    )
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(WishlistItemDTO entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        await db.R_WishlistItem.Add(mapper.Map<WishlistItem>(entity));
    }

    public async Task Update(WishlistItemDTO entity)
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        await db.R_WishlistItem.Update(mapper.Map<WishlistItem>(entity));
    }

    public async Task Delete(int id)
    {
        await db.R_WishlistItem.Delete(id);
    }

    public async Task<WishlistItemDTO> Get(int id)
    {
        var entity = await db.R_WishlistItem.GetById(id);

        if (entity == null)
        {
            throw new KeyNotFoundException($"WishlistItem with ID {id} not found");
        }

        return mapper.Map<WishlistItemDTO>(entity);
    }

    public async Task<IEnumerable<WishlistItemDTO>> GetAll()
    {
        var items = await db.R_WishlistItem.GetAll();
        return mapper.Map<IEnumerable<WishlistItemDTO>>(items);
    }
}
