using Application.DTOs;
using MediatR;

namespace Application.Queries;


public sealed record FetchAllProducts() : IRequest<IEnumerable<ProductDTO>>;
