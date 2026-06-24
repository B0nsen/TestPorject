using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.Mappers
{
    public static class ProductCatalogMapper
    {
        public static ProductCatalogGetDTO ToCatalogDto(this Product product)
        {
            return new ProductCatalogGetDTO
            {
                id = product.Id,
                title = product.Name,
                price = Math.Round(product.Price * (1 - (product.Sale ?? 0.0) / 100.0),2),
                rating = Math.Round(product.Reviews != null && product.Reviews.Any() ? product.Reviews.Average(r => r.Rating) : 0, 1),
                imageUrl = product.Images?.Where(i => i.IsMain).FirstOrDefault()?.ImageUrl ?? "placeholder.png"
            };
        }
        public static IEnumerable<ProductCatalogGetDTO> MapToDtoList(this IEnumerable<Product> products)
        {
            return products.Select(p => p.ToCatalogDto());
        }

        public static ProductReviewsDTO ToReviewDTO(this Product product, int userId)
        {
            if (product == null) return null;
            ReviewGetDTO review = new ReviewGetDTO();
            Console.WriteLine(userId);
            if (userId != 0)
            {
                review = product.Reviews?.Where(r => r.UserId == userId).FirstOrDefault().ToGetDto() ?? new ReviewGetDTO();
            }
            return new ProductReviewsDTO
                {
                    ProductId = product.Id.ToString(),
                    UserReview = review,
                    Reviews = product.Reviews?.Where(r => r.UserId != userId).MapToDtoList().ToList() ?? new List<ReviewGetDTO>(),
                    ReviewStats = new ReviewStatsDTO
                    {
                        AverageRating = Math.Round(product.Reviews != null && product.Reviews.Any() ? product.Reviews.Average(r => r.Rating) : 0, 1),
                        RatingCount = product.Reviews?.Count ?? 0,
                        RecommendedCount = product.Reviews?.Where(r => r.Rating >= 4).Count() ?? 0,
                        VerifiedCount = product.Reviews?.Where(r => r.Verified).Count() ?? 0,
                        RatingBreakdown = new List<RatingItemDTO>
                    {
                        new RatingItemDTO { Stars = 5, Count = product.Reviews.Where(r => r.Rating == 5).Count() },
                        new RatingItemDTO { Stars = 4, Count = product.Reviews.Where(r => r.Rating == 4).Count() },
                        new RatingItemDTO { Stars = 3, Count = product.Reviews.Where(r => r.Rating == 3).Count() },
                        new RatingItemDTO { Stars = 2, Count = product.Reviews.Where(r => r.Rating == 2).Count() },
                        new RatingItemDTO { Stars = 1, Count = product.Reviews.Where(r => r.Rating == 1).Count() }
                    }
                    }
                };
        }
    }
}
