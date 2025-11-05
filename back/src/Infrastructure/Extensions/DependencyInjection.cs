using Microsoft.Extensions.DependencyInjection;
using Application.Interfaces;
using Infrastructure;
using Microsoft.Extensions.Configuration;
using Infrastructure.Persistence;
using Domain.Entities;

namespace Infrastructure.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection AddInfra(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddSingleton(typeof(MongoDBContext<>),
        sp =>
        {
            return new MongoDBContext<Product>("products", configuration);
        });

        serviceCollection.AddScoped<IStorableRepository<Product>, ProductRepository>();

        return serviceCollection;
    }

}