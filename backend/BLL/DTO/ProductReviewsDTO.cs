using backend.BLL.DTO;
namespace DefaultNamespace;

public class ProductReviewsDTO
{
        
        // Главный контейнер для отзывов товара
        //         содержит:
        // ProductId — к какому товару относятся отзывы
        //         Reviews — список всех отзывов
        //         ReviewStats — общая статистика
        //  Используется как ответ API:
        // GET /products/{id}/reviews
  
        public string ProductId { get; set; }
        public ReviewGetDTO UserReview { get; set; }
        public List<ReviewGetDTO> Reviews { get; set; }
        public ReviewStatsDTO ReviewStats { get; set; }
    
}