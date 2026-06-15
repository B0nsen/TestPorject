namespace DefaultNamespace;

public class RatingItemDTO
{
        // Одна строка статистики рейтинга
        // Stars — сколько звёзд (1–5)
        // Count — сколько таких оценок
        public int Stars { get; set; }   // 1–5
        public int Count { get; set; }   // сколько отзывов
    
}