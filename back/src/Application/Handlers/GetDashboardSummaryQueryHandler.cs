using Application.DTOs;
using Application.Queries;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Handlers;

public class GetDashboardSummaryQueryHandler : IRequestHandler<GetDashboardSummary, DashboardSummaryDTO>
{
    private IStorableRepository<Product> storableRepository;
    private IMapper mapper;
    
    public GetDashboardSummaryQueryHandler(IStorableRepository<Product> storableRepository, IMapper mapper)
    {
        this.storableRepository = storableRepository;
        this.mapper = mapper;
    }
    public async Task<DashboardSummaryDTO> Handle(GetDashboardSummary request, CancellationToken cancellationToken)
    {
        var products = await storableRepository.GetAllAsync();

        return new DashboardSummaryDTO
        {
            TotalProducts = products.Count(),
            TotalStockValue = products.Sum(p => p.Price * p.AmountInStock),
            LowStockProducts = mapper.Map<IEnumerable<ProductDTO>>(products.Where(p => p.AmountInStock < 10)),
            //ProductsByCategory = products.GroupBy(p => p.Category).Select()

        };

    }
}