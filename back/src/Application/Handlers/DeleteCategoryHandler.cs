using Domain.Entities;
using Domain.Repositories;

namespace Application.Handlers;

public class DeleteCategoryHandler : DeleteStorableHandler<Category>
{
    public DeleteCategoryHandler(IStorableRepository<Category> storableRepository) : base(storableRepository)
    {
    }
}