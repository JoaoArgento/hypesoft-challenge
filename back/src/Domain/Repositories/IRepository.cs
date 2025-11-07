namespace Domain.Repositories;

public interface IStorableRepository<T>
{
    public Task AddAsync(T storable);
    public Task<T> GetByIdAsync(int id);
    public Task UpdateAsync(T storable);
    public Task DeleteByIdAsync(int id);
    public Task<int> GetNextIdAsync(string collectionName);

    public Task<IEnumerable<T>> GetAllAsync();

}