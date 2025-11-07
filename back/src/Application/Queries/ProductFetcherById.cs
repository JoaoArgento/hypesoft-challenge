using Application.DTOs;
using MediatR;

namespace Application.Queries;

public sealed record FetchProductById(int Id) : IRequest<ProductDTO>;