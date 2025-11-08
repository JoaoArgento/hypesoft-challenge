using MediatR;

namespace Application.Commands
{
    public record DeleteStorableCommand(int StorableId) : IRequest<bool>;
}