using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infrastructure.Data;

public class MongoDBContext : DbContext
{
    private IMongoDatabase database;
    private string collectionName;
    public MongoDBContext(string collectionName, IConfiguration configuration)
    {

        if (string.IsNullOrEmpty(collectionName))
        {
            throw new ArgumentNullException(nameof(collectionName), "Is null or empty");
        }

        this.collectionName = collectionName;

        string? connection = configuration.GetConnectionString("MongoDb");
        string? databaseName = configuration["DatabaseSettings:DatabaseName"];

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
            product.Property(p => p.ProductName).IsRequired(true);
            product.Property(p => p.Description).IsRequired(false);
            product.Property(p => p.Category).IsRequired(true);
            product.Property(p => p.Price).HasPrecision(18, 2);
            product.Property(p => p.AmountInStock);
        });
    }

    public IMongoCollection<Product> Storables => database.GetCollection<Product>(collectionName);
}