using System.Runtime.CompilerServices;
using Domain.Repositories;
using Domain.Entities;
using MongoDB.Driver;
using Infrastructure.Data;
using Application.DTOs;

namespace Infrastructure.Repositories;

public class ProductRepository : IStorableRepository<Product>
{
    private readonly MongoDBContext mongoDBContext;
    
    public ProductRepository(MongoDBContext mongoDBContext)
    {
        this.mongoDBContext = mongoDBContext;
    }

    public async Task AddAsync(Product dto)
    {
        if (dto == null)
        {
            throw new NullReferenceException("Storable is null");
        }

        await mongoDBContext.Storables.InsertOneAsync(dto);
    }

    public async Task DeleteByIdAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new ArgumentNullException("id is not valid");
        }
        await mongoDBContext.Storables.DeleteOneAsync(product => product.Id == id);
    
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await mongoDBContext.Storables.Find(_ => true).ToListAsync();
    }

    public async Task<Product> GetByIdAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new ArgumentNullException("id is not valid");
        }
        return await mongoDBContext.Storables.Find(storable => storable.Id == id).FirstOrDefaultAsync();
    }

    public async Task UpdateAsync(Product storableParam)
    {
         if (storableParam == null)
        {
            throw new NullReferenceException("Storable is null");
        }
        await mongoDBContext.Storables.ReplaceOneAsync(storable => storable.Id == storableParam.Id, storableParam);
    }
}