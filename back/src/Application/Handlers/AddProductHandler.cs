using Application.Commands;
using MediatR;
using Domain.Entities;
using Application.Interfaces;

namespace Application.Handlers
{

    public class AddProductHandler : IRequestHandler<AddProductCommand, Product>
    {
        private readonly IStorableRepository<Product> storableRepository;

        public AddProductHandler(IStorableRepository<Product> storableRepository)
        {
            this.storableRepository = storableRepository;
        }
        public async Task<Product> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            Product product = new Product(request.Id, request.Name, request.Description, request.Price, request.Category, request.AmountInStock);
            await storableRepository.AddAsync(product);
            return product;
        }
    }


}