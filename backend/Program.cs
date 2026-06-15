using Amazon.S3;
using backend.DAL.Interfaces;
using backend.DAL.Repositories;
using backend.BLL.Infrastructure;
using backend.BLL.Interfaces;
using backend.BLL.Profiles;
using backend.BLL.Services;
using backend.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using DefaultNamespace;
using Microsoft.AspNetCore.WebSockets;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

var connectionString = configuration.GetConnectionString("DefaultConnection");
Console.WriteLine("CONNECTION STRING: " + connectionString);
services.AddAmazonContext(connectionString);
services.AddUnitOfWorkService();

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Добавляем сессии
builder.Services.AddDistributedMemoryCache(); // хранилище сессий в памяти
builder.Services.AddSession(options =>
{
    options.Cookie.Name = ".AmazonClone.Session"; // имя cookie
    options.Cookie.HttpOnly = true; // защита от JS
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest; // HTTPS только
    options.Cookie.IsEssential = true;
    options.IdleTimeout = TimeSpan.FromMinutes(30); // время жизни сессии
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
});
builder.Services.AddControllers();

services.AddScoped<IAddressService, AddressService>();
services.AddScoped<ICartItemService, CartItemService>();
services.AddScoped<ICategoryService, CategoryService>();
services.AddScoped<ICreditCardService, CreditCardService>();
services.AddScoped<IOrderService, OrderService>();
services.AddScoped<IOrderItemService, OrderItemService>();
services.AddScoped<IProductService, ProductService>();
services.AddScoped<IProductImageService, ProductImageService>();
services.AddScoped<IReviewService, ReviewService>();
services.AddScoped<IRoleService, RoleService>();
services.AddScoped<IReviewImagesService, ReviewImagesService>();
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IProductRepository, ProductRepository>();
services.AddScoped<IReviewRepository, ReviewRepository>();
services.AddScoped<ICartItemRepository, CartItemRepository>();
services.AddScoped<IAddressRepository, AddressRepository>();
services.AddScoped<IProductImageRepository, ProductImageRepository>();
services.AddScoped<IHomepageService, HomepageService>();
services.AddScoped<IUserService, UserService>();
services.AddScoped<IWishlistService, WishlistService>();
builder.Services.AddScoped<IWishlistItemService, WishlistItemService>();
builder.Services.AddScoped<IFileStorageService, S3StorageService>();
builder.Services.AddScoped<PasswordCache>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IProductCategoryService, ProductCategoryService>();
services.AddControllers();

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File(
        "logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 7)
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000") // разрешенные домены
            .AllowAnyHeader()                  // разрешить любые заголовки
            .AllowAnyMethod()                  // разрешить любые методы (GET, POST...)
            .AllowCredentials();               // куки
    });
});

builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();

    return new AmazonS3Client(
        config["AWS:AccessKey"],
        config["AWS:SecretKey"],
        Amazon.RegionEndpoint.EUCentral1
    );
});

builder.Services.Configure<AwsOptions>(builder.Configuration.GetSection("AWS"));
builder.Services.AddAutoMapper(typeof(UserProfile));
builder.Configuration.AddUserSecrets<Program>();

builder.Services.AddControllers();
// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();                
    app.UseSwaggerUI(c =>            
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";
    });
}


if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseStaticFiles();

app.UseRouting(); 

app.UseCors("MyCorsPolicy");

app.UseSession(); 

app.UseAuthorization();

app.UseMiddleware<ExceptionMiddleware>();

app.MapControllers(); 

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();