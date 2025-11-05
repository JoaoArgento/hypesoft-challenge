namespace Application.DTOs;


public sealed record ProductDTO(Guid Id, string Name, string Description,
                                int Category, decimal Price, int AmountInStock);
