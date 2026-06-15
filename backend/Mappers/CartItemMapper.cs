using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.Mappers
{
    public static class CartItemMapper
    {
        public static CartItemPageDTO ToPageDto(this CartItem cartitem)
        {
            decimal? listprice = null;
            decimal price = 0;
            if (cartitem.Product.Sale != null)
            {
                listprice = (decimal)cartitem.Product.Price;
                price = Math.Round((decimal)(cartitem.Product.Price * (1 - cartitem.Product.Sale / 100.0)), 2);
            }
            else
            {
                price = (decimal)cartitem.Product.Price;
            }
            return new CartItemPageDTO
            {
                Id = cartitem.Id,
                title = cartitem.Product.Name,
                listPrice = listprice,
                price = price,
                discount = cartitem.Product.Sale,
                quantity = cartitem.Quantity,
                inStock = cartitem.Product.Available,
                image = cartitem.Product.Images.FirstOrDefault().ImageUrl,
            };
        }
        public static IEnumerable<CartItemPageDTO> MapToDtoList(this IEnumerable<CartItem> cartitem)
        {
            return cartitem.Select(c => c.ToPageDto());
        }
    }
}
