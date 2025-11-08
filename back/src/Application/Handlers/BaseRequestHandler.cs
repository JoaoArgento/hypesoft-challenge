using AutoMapper;
using Domain.Repositories;
using MediatR;

namespace Application.Handlers;


public abstract class BaseRequestHandler<T1, T2, TRepository> : IRequestHandler<T1, T2> where T1 : IRequest<T2>
{
    protected IStorableRepository<TRepository> storableRepository;
    protected IMapper mapper;

    public BaseRequestHandler(IStorableRepository<TRepository> storableRepository, IMapper mapper)
    {
        this.storableRepository = storableRepository;
        this.mapper = mapper;
    }
    
    public abstract Task<T2> Handle(T1 request, CancellationToken cancellationToken);
}