using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infrastructure.Data;

public class MongoDBContext : DbContext
{
    private IMongoDatabase database;
    public MongoDBContext(IConfiguration configuration)
    {

        string? connection = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING");

        string? databaseName = configuration["DatabaseSettings:DatabaseName"];

        Console.WriteLine(connection);

        if (string.IsNullOrEmpty(connection))
        {
            throw new ArgumentNullException(nameof(connection), "connection failed");
        }

        if (string.IsNullOrEmpty(databaseName))
        {
            throw new ArgumentNullException(nameof(databaseName), "Invalid name!");
        }

        MongoClient client = new MongoClient(connection);
        database = client.GetDatabase(databaseName);

    } 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(product =>
        {
            product.HasKey(p => p.Id);
            product.Property(p => p.Name).IsRequired(true);
            product.Property(p => p.Description).IsRequired(false);
            product.Property(p => p.Category).IsRequired(true);
            product.Property(p => p.Price).HasPrecision(18, 2);
            product.Property(p => p.AmountInStock);
        });
    }

    public IMongoCollection<Category> Categories => database.GetCollection<Category>("categories");
    public IMongoCollection<Product> Products => database.GetCollection<Product>("products");
    public IMongoDatabase MongoDatabase => database;
}