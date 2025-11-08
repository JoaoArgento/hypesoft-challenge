using Application.DTOs;
using Application.Queries;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Handlers;

public class GetAllCategoriesQueryHandler : BaseRequestHandler<GetAllCategoriesQuery, IEnumerable<CategoryDTO>, Category>
{
    public GetAllCategoriesQueryHandler(IStorableRepository<Category> storableRepository, IMapper mapper) : base(storableRepository, mapper){}

    public async override Task<IEnumerable<CategoryDTO>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await storableRepository.GetAllAsync();
        return mapper.Map<IEnumerable<CategoryDTO>>(categories);
    }
}