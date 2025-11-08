using AutoMapper;
using Domain.Repositories;
using MediatR;

namespace Application.Handlers;


public abstract class BaseRequestHandler<TCommand, TRequest, TRepository> : IRequestHandler<TCommand, TRequest> where TCommand : IRequest<TRequest>
{
    protected IStorableRepository<TRepository> storableRepository;
    protected IMapper mapper;

    public BaseRequestHandler(IStorableRepository<TRepository> storableRepository, IMapper mapper)
    {
        this.storableRepository = storableRepository;
        this.mapper = mapper;
    }
    
    public abstract Task<TRequest> Handle(TCommand request, CancellationToken cancellationToken);
}