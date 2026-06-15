using backend.DAL.EF;
using backend.DAL.Interfaces;
using backend.Models;
using DefaultNamespace;

namespace backend.DAL.Repositories
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private readonly AmazonContext context;

        public IRepository<Address> R_Address { get; }
        public IRepository<CartItem> R_CartItem { get; }
        public IRepository<Category> R_Category { get; }
        public IRepository<CreditCard> R_CreditCard { get; }
        public IOrderRepository R_Order { get; }

        public IRepository<OrderItem> R_OrderItem { get; }
        public IRepository<Product> R_Product { get; }
        public IRepository<ProductCategory> R_ProductCategory { get; }
        public IRepository<ProductImage> R_ProductImage { get; }
        public IRepository<Review> R_Review { get; }
        public IRepository<Role> R_Role { get; }
        public IRepository<User> R_User { get; }
        public IWishlistRepository R_Wishlist { get; }
        public IRepository<WishlistItem> R_WishlistItem { get; }
        public IRepository<ReviewImages> R_ReviewImages { get; }
        public IRepository<PasswordResetToken> R_PasswordResetToken { get; }
        public IRepository<EmailConfirmationToken> R_EmailConfirmationToken { get; }

        public EFUnitOfWork(AmazonContext context)
        {
            this.context = context;

            R_Address = new GenericRepository<Address>(context);
            R_CartItem = new GenericRepository<CartItem>(context);
            R_Category = new GenericRepository<Category>(context);
            R_CreditCard = new GenericRepository<CreditCard>(context);
            R_Order = new OrderRepository(context);
            R_OrderItem = new GenericRepository<OrderItem>(context);
            R_Product = new GenericRepository<Product>(context);
            R_ProductImage = new GenericRepository<ProductImage>(context);
            R_Review = new GenericRepository<Review>(context);
            R_Role = new GenericRepository<Role>(context);
            R_User = new GenericRepository<User>(context);
            R_Wishlist = new WishlistRepository(context);
            R_WishlistItem = new GenericRepository<WishlistItem>(context);
            R_ReviewImages = new GenericRepository<ReviewImages>(context);
            R_PasswordResetToken = new GenericRepository<PasswordResetToken>(context);
            R_EmailConfirmationToken = new GenericRepository<EmailConfirmationToken>(context);
            R_ProductCategory = new GenericRepository<ProductCategory>(context);
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
