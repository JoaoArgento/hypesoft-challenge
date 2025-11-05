using Microsoft.Extensions.DependencyInjection;
using Domain.Repositories;
using Infrastructure.Repositories;
using Domain.Entities;
using Infrastructure.Data;

namespace API.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection AddInfra(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddSingleton(typeof(MongoDBContext),
        sp =>
        {
            return new MongoDBContext("products", configuration);
        });

        serviceCollection.AddScoped<IStorableRepository<Product>, ProductRepository>();

        return serviceCollection;
    }

}