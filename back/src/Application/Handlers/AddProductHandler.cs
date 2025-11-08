using Application.Commands;
using MediatR;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using Application.DTOs;
using Serilog;

namespace Application.Handlers
{
    public class AddProductHandler : BaseRequestHandler<AddProductCommand, ProductDTO, Product>
    {
        public AddProductHandler(IStorableRepository<Product> storableRepository, IMapper mapper) : base(storableRepository, mapper) { }
        public async override Task<ProductDTO> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            int productId = await storableRepository.GetNextIdAsync("products");
            Product product = new Product(productId, request.Name, request.Description, request.Price, request.Category, request.AmountInStock);
            await storableRepository.AddAsync(product);
            return mapper.Map<ProductDTO>(product);
        }
    } 


}