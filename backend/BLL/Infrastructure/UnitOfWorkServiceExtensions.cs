using Microsoft.Extensions.DependencyInjection;
using backend.DAL.Interfaces;
using backend.DAL.Repositories;
namespace backend.BLL.Infrastructure;

public static class UnitOfWorkServiceExtensions
{
	public static void AddUnitOfWorkService(this IServiceCollection services)
	{
		services.AddScoped<IUnitOfWork, EFUnitOfWork>();
	}
}