using AutoMapper;
using backend.BLL.DTO;
using backend.Models;
using DefaultNamespace;

namespace backend.BLL.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AddressDTO, Address>().ReverseMap();
            CreateMap<CartItemDTO, CartItem>().ReverseMap();
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<CreditCardDTO, CreditCard>().ReverseMap();
            CreateMap<ProductCategoryDTO, ProductCategory>().ReverseMap();

            CreateMap<OrderDTO, Order>();
            CreateMap<Order, OrderDTO>();

            CreateMap<OrderItemDTO, OrderItem>();
            CreateMap<OrderItem, OrderItemDTO>()
                .ForMember(
                    dest => dest.ProductName,
                    opt => opt.MapFrom(src => src.Product.Name)
                )
                .ForMember(
                    dest => dest.ProductPrice,
                    opt => opt.MapFrom(src => src.Product.Price)
                )
                .ForMember(
                    dest => dest.ProductImageUrl,
                    opt => opt.MapFrom(src => src.Product.Images
                        .OrderByDescending(img => img.IsMain)
                        .ThenBy(img => img.SortOrder)
                        .Select(img => img.ImageUrl)
                        .FirstOrDefault()
                    )
                );

            CreateMap<ProductImageCreateDTO, ProductImageDTO>()
                .ForMember(dest => dest.ImageUrl, opt => opt.Ignore());

            CreateMap<ProductDTO, Product>().ReverseMap();
            CreateMap<ProductImageDTO, ProductImage>().ReverseMap();
            CreateMap<ReviewDTO, Review>().ReverseMap();
            CreateMap<RoleDTO, Role>().ReverseMap();
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<ReviewImagesDTO, ReviewImagesDTO>().ReverseMap();
            CreateMap<ProductMetadata, ProductMetadataDTO>().ReverseMap();

            CreateMap<WishlistDTO, Wishlist>();
            CreateMap<Wishlist, WishlistDTO>();

            CreateMap<WishlistItemCreateDTO, WishlistItem>();
            CreateMap<WishlistItemDTO, WishlistItem>();
            CreateMap<Product, ProductGetDTO>()
                .AfterMap((src, dest) =>
                {
                    dest.AboutItems = src.Metadata?.AboutItems ?? new();
                    dest.ProductInfo = src.Metadata?.Attribute
                        ?.Select(x => new AttributesDTO { Label = x.Key, Value = x.Value })
                        .ToList() ?? new();
                });

            CreateMap<WishlistItem, WishlistItemDTO>()
                .ForMember(
                    dest => dest.ProductName,
                    opt => opt.MapFrom(src => src.Product.Name)
                )
                .ForMember(
                    dest => dest.ProductPrice,
                    opt => opt.MapFrom(src => src.Product.Price)
                )
                .ForMember(
                    dest => dest.ProductImageUrl,
                    opt => opt.MapFrom(src => src.Product.Images
                        .OrderByDescending(img => img.IsMain)
                        .ThenBy(img => img.SortOrder)
                        .Select(img => img.ImageUrl)
                        .FirstOrDefault()
                    )
                )
                .ForMember(
                    dest => dest.ProductRating,
                    opt => opt.MapFrom(src =>
                        src.Product.Reviews.Any()
                            ? src.Product.Reviews.Average(review => review.Rating)
                            : 0
                    )
                );
        }
    }
}
