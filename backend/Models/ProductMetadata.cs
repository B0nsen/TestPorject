namespace backend.Models
{
    public class ProductMetadata
    {
        
        public long Id { get; set; }
        public long ProductId { get; set; }
        public Dictionary<string, string> Attribute { get; set; } = new();
        public List<string> AboutItems { get; set; } = new();
    }
}
