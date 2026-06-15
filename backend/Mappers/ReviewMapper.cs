using System.Net.NetworkInformation;
using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewGetDTO ToGetDto(this Review review)
        {
            if (review == null) return null;
            return new ReviewGetDTO
            {
                Id = review.Id,
                UserName = review.User?.Name,
                Title = review.Title,
                Date = review.CreatedAt,
                Rating = review.Rating,
                Country = review.User?.Country,
                FullText = review.Comment,
                userAvatar = review.User.AvatarUrl,
                HelpfulCount = review.Helpful,
                Images = review.ReviewImages?.Select(img => img.ImageUrl).ToList() ?? new List<string>(),
            };
        }
        public static IEnumerable<ReviewGetDTO> MapToDtoList(this IEnumerable<Review> review)
        {
            return review.Select(r => r.ToGetDto());
        }
    }
}
