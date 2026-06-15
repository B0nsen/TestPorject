namespace DefaultNamespace;

public class ReviewStatsDTO
{
    // Сводка по всем отзывам
    // AverageRating — средний рейтинг
    // RatingCount — общее количество отзывов
    //     RatingCounts — сколько оценок каждого типа (1⭐–5⭐)
    //     📌 Нужно для:
    // звёздочек ⭐⭐⭐⭐⭐
    // графиков/баров рейтинга
        public double AverageRating { get; set; }
        public int RatingCount { get; set; }

        public int RecommendedCount { get; set; }
    public int VerifiedCount { get; set; }
        public List<RatingItemDTO> RatingBreakdown { get; set; }


    public List<int> RatingCounts =>
        RatingBreakdown?
        .Select(item => item.Count) // Берем свойство Count из объекта
        .ToList()
        ?? new List<int> { 0, 0, 0, 0, 0 };

}