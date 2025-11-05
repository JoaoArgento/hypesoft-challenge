using Application.Commands;
using MediatR;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using Application.DTOs;

namespace Application.Handlers
{

    public class AddProductHandler : IRequestHandler<AddProductCommand, ProductDTO>
    {
        private readonly IStorableRepository<Product> storableRepository;
        private readonly IMapper mapper;
        public AddProductHandler(IStorableRepository<Product> storableRepository, IMapper mapper)
        {
            this.storableRepository = storableRepository;
            this.mapper = mapper;
        }
        public async Task<ProductDTO> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            Product product = new Product(Guid.NewGuid(), request.Name, request.Description, request.Price, request.Category, request.AmountInStock);
            await storableRepository.AddAsync(product);
            return mapper.Map<ProductDTO>(product);
        }
    }


}