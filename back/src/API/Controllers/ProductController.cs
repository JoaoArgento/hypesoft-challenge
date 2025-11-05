using Application.Commands;
using Application.Queries;
using Domain.Entities;
using Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace API.Controllers;

[ApiController]
[Route("products")]
public class ProductController : ControllerBase
{
    private IStorableRepository<Product> productRepository;
    private IMediator mediator;
    public ProductController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await mediator.Send(new FetchAllProducts());
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var product = await mediator.Send(new FetchProductById(id));

        if (product is null)
        {
            return NotFound(new {message =  "Product not found"});
        }

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddProductCommand addProductCommand)
    {
        var result = await mediator.Send(addProductCommand);
        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var result = await mediator.Send(new DeleteProductCommand(id));
        return result ? NoContent() : NotFound();
    }
}
