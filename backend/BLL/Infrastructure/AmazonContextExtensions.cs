// using Microsoft.EntityFrameworkCore;
// using backend.DAL.EF;
// namespace backend.BLL.Infrastructure;
//
// public static class AmazonContextExtensions
// {
//     public static void AddAmazonContext(this IServiceCollection services, string connection)
//     {
//         services.AddDbContext<AmazonContext>(options => options.UseMySql(connection,ServerVersion.AutoDetect(connection)));
//     }
// }

using Microsoft.EntityFrameworkCore;
using backend.DAL.EF;

namespace backend.BLL.Infrastructure;

public static class AmazonContextExtensions
{
    public static void AddAmazonContext(this IServiceCollection services, string connection)
    {
        services.AddDbContext<AmazonContext>(options =>
            options.UseMySql(
                connection,
                new MySqlServerVersion(new Version(8, 0, 36)),
                mySqlOptions => mySqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(10),
                    errorNumbersToAdd: null
                )
            )
        );
    }
}


