using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Mappers;
using backend.Migrations;
using backend.Models;
using DefaultNamespace;
using static Amazon.S3.Util.S3EventNotification;

public class ReviewService : IReviewService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<ReviewService> logger;
    private readonly IReviewRepository _reviewRepository;
    private readonly IFileStorageService storage;

    public ReviewService(IUnitOfWork db, IMapper mapper, ILogger<ReviewService> logger, IReviewRepository reviewRepository, IFileStorageService storage)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
        _reviewRepository = reviewRepository;
        this.storage = storage;
    }

    public async Task Create(ReviewDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in ReviewService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_Review.Add(mapper.Map<Review>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Review in ReviewService");
            throw new ApplicationException("Error adding Review", ex);
        }
    }

    public async Task Update(ReviewDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in ReviewService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in ReviewService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Review.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Review with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Review with ID {entity.Id} not found");
            }
            mapper.Map(entity, exists);
            await db.R_Review.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Review with ID {Id} in ReviewService", entity.Id);
            throw new ApplicationException("Error updating Review", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in ReviewService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Review.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Review with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Review with ID {id} not found");
            }

            await db.R_Review.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Review with ID {Id} in ReviewService", id);
            throw new ApplicationException("Error deleting Review", ex);
        }
    }

    public async Task<ReviewDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in ReviewService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_Review.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Review with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Review with ID {id} not found");
            }

            return mapper.Map<ReviewDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Review with ID {Id} in ReviewService", id);
            throw new ApplicationException("Error getting Review", ex);
        }
    }

    public async Task<IEnumerable<ReviewDTO>> GetAll()
    {
        try
        {
            var reviews = await db.R_Review.GetAll();
            if (reviews == null)
            {
                logger.LogWarning("GetAll returned null in ReviewService");
                return Enumerable.Empty<ReviewDTO>();
            }

            return mapper.Map<IEnumerable<ReviewDTO>>(reviews);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in ReviewService");
            throw new ApplicationException("Error in GetAll function for Review", ex);
        }
    }

    public async Task<IEnumerable<ReviewGetDTO>> GetAllProductReview()
    {
        try
        {
            var reviews = await _reviewRepository.GetAll();
            if (reviews == null)
            {
                logger.LogWarning("GetAll returned null in ReviewService");
                return Enumerable.Empty<ReviewGetDTO>();
            }
            var res = reviews.MapToDtoList();
            return res;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in ReviewService");
            throw new ApplicationException("Error in GetAll function for Review", ex);
        }
    }

    public async Task<ReviewGetDTO> CreateReview(CreateReviewDTO entity, long uid)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in ReviewService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            var review = new Review
            {
                ProductId = entity.ProductId,
                Comment = entity.Review,
                Title = entity.Title,
                Rating = entity.Rating,
                UserId = uid,
                CreatedAt = DateTime.UtcNow,
                ReviewImages = new List<ReviewImages>()
            };

            if(entity.Images!= null && entity.Images.Any())
            {
                foreach (var file in entity.Images)
                {
                    string filename = $"{Guid.NewGuid()}_{file.FileName}";
                    string url = await storage.UploadFileAsync(file, filename);

                    review.ReviewImages.Add(new ReviewImages
                    {
                        ImageUrl = url,
                        FileName = filename,
                    });

                }
            }
            await db.R_Review.Add(review);
            await db.SaveAsync();
            var savedReview = await _reviewRepository.GetById(review.Id);
            return savedReview.ToGetDto();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Review in ReviewService");
            throw new ApplicationException("Error adding Review", ex);
        }
    }

    public async Task<bool> AddHelpful(int reviewId, int uid)
    {
        if (reviewId <= 0 || uid <= 0)
        {
            logger.LogWarning("ReviewId or uid in 0 or lower");
            throw new ArgumentNullException(nameof(reviewId));
        }

        try
        {
            var review = await _reviewRepository.GetById(reviewId);
            var user = await db.R_User.GetById(uid);
            if (review == null || user == null)
            {
                logger.LogWarning("Error in adding helpful rating towards review");
                throw new KeyNotFoundException($"Error in adding helpful rating towards review");
            }
            if(review.UsersLiked.Any(u => u.Id == user.Id))
            {
                review.Helpful--;
                review.UsersLiked.Remove(user);
            }
            else
            {
                review.Helpful++;
                review.UsersLiked.Add(user);
            }
                
            
            await db.SaveAsync();
            return true;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding helpful Review with ID {Id} in ReviewService", reviewId);
            throw new ApplicationException("Error updating Review", ex);
        }
    }
}