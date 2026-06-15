namespace backend.BLL.DTO;

public class ProductInfoItemDTO
{
        // Характеристика товара (ключ-значение)
        // Label — название характеристики (например, “Brand”)
        // Value — значение характеристики (например, “SmartFit”)
        public string Label { get; set; }
        public string Value { get; set; }
    
}