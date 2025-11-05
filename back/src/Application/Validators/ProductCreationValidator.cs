using FluentValidation;
using Application.Commands;
using System.Data;

namespace Application.Validators;

public class ProductCreationValidator :  AbstractValidator<AddProductCommand>
{
    public ProductCreationValidator()
    {
        RuleFor(p => p.Name).NotEmpty().MaximumLength(200);
        RuleFor(p => p.Category).NotNull();
        RuleFor(p => p.Price).GreaterThanOrEqualTo(0);
        RuleFor(p => p.AmountInStock).GreaterThanOrEqualTo(0);

    }
}