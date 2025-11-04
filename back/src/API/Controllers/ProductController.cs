using Domain.Entities;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private IStorableRepository<Product> productRepository;

    public ProductController(IStorableRepository<Product> productRepository)
    {
        this.productRepository = productRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await productRepository.GetAllAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var product = await productRepository.GetByIdAsync(id);

        if (product == null)
        {
            return NotFound(new {message =  "Product not found"});
        }

        return Ok(product);
    }


}
