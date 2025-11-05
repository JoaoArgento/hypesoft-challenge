using MediatR;
using Application.Interfaces;
using Application.Commands;
using Domain.Entities;

namespace Application.Handlers
{
    public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, bool>
    {
        private IStorableRepository<Product> storableRepository;

        public DeleteProductHandler(IStorableRepository<Product> storableRepository)
        {

            this.storableRepository = storableRepository;
        }


        public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            Product targetProduct = await storableRepository.GetByIdAsync(request.ProductId);

            if (targetProduct == null)
            {
                return false;
            }
            await storableRepository.DeleteByIdAsync(request.ProductId);

            return true;
        }
    }
}