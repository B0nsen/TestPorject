using Microsoft.EntityFrameworkCore;
using DefaultNamespace;
using backend.Models;
using Microsoft.IdentityModel.Abstractions;
using System.Text.Json;

namespace backend.DAL.EF
{
    public class AmazonContext : DbContext
    {
        public DbSet<Address> T_Address { get; set; }
        public DbSet<CartItem> T_CartItem { get; set; }
        public DbSet<Category> T_Category { get; set; }
        public DbSet<CreditCard> T_CreditCard { get; set; }
        public DbSet<Order> T_Order { get; set; }
        public DbSet<OrderItem> T_OrderItem { get; set; }
        public DbSet<Product> T_Product { get; set; }
        public DbSet<ProductImage> T_ProductImage { get; set; }
        public DbSet<ProductCategory> T_ProductCategory { get; set; }
        public DbSet<Review> T_Review { get; set; }
        public DbSet<Role> T_Role { get; set; }
        public DbSet<User> T_User { get; set; }
        public DbSet<Wishlist> T_Wishlist { get; set; }
        public DbSet<WishlistItem> T_WishlistItem { get; set; }
        public DbSet<ReviewImages> T_ReviewImages { get; set; }
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }
        public DbSet<EmailConfirmationToken> T_EmailConfirmationToken { get; set; }


        public AmazonContext(DbContextOptions<AmazonContext> options) : base(options)
        {
            // Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>().HasKey(c => new {c.CategoryId, c.ProductId});
            modelBuilder.Entity<CartItem>().HasIndex(r => new { r.UserId, r.ProductId }).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Review>().HasOne(r => r.User).WithMany(u => u.Reviews).HasForeignKey(r => r.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Review>().HasMany(r => r.UsersLiked).WithMany();
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(p => p.Metadata).HasConversion(v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<ProductMetadata>(v, (JsonSerializerOptions)null)).HasColumnType("json");
                
            });
            modelBuilder.Entity<Role>().HasData(
              new Role { Id = 1, Name = "User" },
              new Role { Id = 2, Name = "Admin" },
              new Role { Id = 3, Name = "SuperAdmin" }
        );
            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
