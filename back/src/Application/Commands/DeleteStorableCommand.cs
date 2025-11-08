using MediatR;

namespace Application.Commands
{
    public record DeleteStorableCommand<T>(int StorableId) : IRequest<bool>;
}