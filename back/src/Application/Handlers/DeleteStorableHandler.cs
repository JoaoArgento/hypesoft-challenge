using MediatR;
using Domain.Repositories;
using Application.Commands;
using Domain.Entities;
using Application.DTOs;

namespace Application.Handlers
{
    public class DeleteStorableHandler<TStorable> : IRequestHandler<DeleteStorableCommand, bool>
    {
        private IStorableRepository<TStorable> storableRepository;

        public DeleteStorableHandler(IStorableRepository<TStorable> storableRepository)
        {

            this.storableRepository = storableRepository;
        }


        public async Task<bool> Handle(DeleteStorableCommand request, CancellationToken cancellationToken)
        {
            TStorable targetStorable = await storableRepository.GetByIdAsync(request.StorableId);

            if (targetStorable == null)
            {
                return false;
            }
            await storableRepository.DeleteByIdAsync(request.StorableId);

            return true;
        }
    }
}