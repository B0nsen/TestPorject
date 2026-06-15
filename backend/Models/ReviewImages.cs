using System.Reflection.Metadata.Ecma335;
using DefaultNamespace;

namespace backend.Models
{
    public class ReviewImages
    {
        public long Id { get; set; }
        public long ReviewId { get; set; }
        public string ImageUrl { get; set; }
        public string FileName { get; set; }
        public Review Review { get; set; }
    }
}
