using Application.DTOs;
using Application.Handlers;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;

namespace Application.Commands;


public class AddCategoryHandler : BaseRequestHandler<AddCategoryCommand, CategoryDTO, Category>
{
    public AddCategoryHandler(IStorableRepository<Category> storableRepository, IMapper mapper) : base(storableRepository, mapper)
    {
    }

    public async override Task<CategoryDTO> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
    {
        int id = await storableRepository.GetNextIdAsync("categories");

        Category category = new Category(id, request.Name);
        await storableRepository.AddAsync(category);
        return mapper.Map<CategoryDTO>(category);
    }
}