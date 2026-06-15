namespace backend.BLL.DTO;

public class ActionsDTO
{
 
        
        // Информация о доставке и оплате
        //         DeliveryText — текст про доставку
        //         DeliveryDate — ориентировочная дата
        // ShippingLocation — место отправки
        // Shipper — служба доставки
        // Returns — условия возврата
        // Payment — способ оплаты / безопасность транзакции
        public string DeliveryText { get; set; }
        public string DeliveryDate { get; set; }
        public string ShippingLocation { get; set; }
        public string Shipper { get; set; }
        public string Returns { get; set; }
        public string Payment { get; set; }
    
}