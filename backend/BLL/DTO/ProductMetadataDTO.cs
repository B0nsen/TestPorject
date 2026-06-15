namespace backend.BLL.DTO
{
    public class ProductMetadataDTO
    {
        public Dictionary<string, string> Attribute { get; set; } = new();
        public List<string> AboutItems { get; set; } = new();
    }

    public class ProductMetadataGetDTO
    {
        public List<AttributesDTO> Attribute { get; set; }
        public List<string> AboutItems { get; set; } = new();
    }

    public class AttributesDTO
    {
        public string Label { get; set; }
        public string Value { get; set;}
    }
}
