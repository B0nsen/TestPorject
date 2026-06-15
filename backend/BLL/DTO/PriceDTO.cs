namespace backend.BLL.DTO;

public class PriceDTO
{
   
        // Цены и скидки 
        //         ListPrice — обычная цена
        // DiscountPercent — процент скидки
        // CurrentPrice — цена со скидкой
        public decimal ListPrice { get; set; }
        public int DiscountPercent { get; set; }
        public decimal CurrentPrice { get; set; }
    
}