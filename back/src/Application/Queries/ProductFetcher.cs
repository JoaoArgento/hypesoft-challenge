using Application.DTOs;
using MediatR;

namespace Application.Queries;

public sealed record FetchProductById(Guid Id) : IRequest<ProductDTO>;