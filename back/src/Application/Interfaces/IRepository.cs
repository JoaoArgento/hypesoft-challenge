namespace Application.Interfaces;

public interface IStorableRepository<T>
{
    public Task AddAsync(T storable);
    public Task<T> GetByIdAsync(string id);
    public Task UpdateAsync(T storable);
    public Task DeleteByIdAsync(string id);

    public Task<IEnumerable<T>> GetAllAsync();

}