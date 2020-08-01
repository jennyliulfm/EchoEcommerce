using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Echo.Ecommerce.Host.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Echo.Ecommerce.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize]
    public class ProductController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly DBContext _dbContext;

        public ProductController(ILoggerFactory loggerFactory, DBContext dbContext)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<ActionResult<List<Models.Product>>> GetAllProducts()
        {
            try
            {
                var products = this._dbContext.Products.Include( p => p.Category)
                    .OrderBy( p => p.Name)
                    .Where( p => p.IsDeleted == false )
                    .AsNoTracking()
                    .Select( p => new Models.Product( p ))
                    .ToList();

                if (products.Count > 0)
                {
                    return Ok(products);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "GetAllProducts Failed");
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("CreateProduct")]
        public async Task<ActionResult<Models.Product>>  CreateProduct(Models.Product model)
        {
            try
            {
                //Verify whether the product exists in DB or Not
                var product = await this._dbContext.Products.FirstOrDefaultAsync(c => c.Name.ToUpper().Equals(model.Name.ToUpper()));
                if (product != null) return Ok("Product is in the DB");

                var cateogry = await this._dbContext.Categories.FirstOrDefaultAsync(c => c.CategoryId == model.Category.CategoryId);
                if (cateogry == null) return NotFound("Cateogry Not Found");

                Echo.Ecommerce.Host.Entities.Product newProduct = new Entities.Product()
                {
                    Name = model.Name,
                    Price = model.Price,
                    Description = model.Description,
                    Category = cateogry,
                };

                await this._dbContext.Products.AddAsync(newProduct);

                int result = await this._dbContext.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok(new Models.Product(newProduct));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "CreateProduct Failed");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetProductById")]
        public async Task<ActionResult<Models.Product>> GetProductById(int productId)
        {
            try
            {
                var product = await this._dbContext.Products.FirstOrDefaultAsync(p => p.ProductId == productId);

                if (product != null)
                {
                    return Ok(new Models.Product(product));
                }
                else
                {
                    return NotFound($"Product ({productId}) Not Found");
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "GetProductById Failed");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("DeleteProductById")]
        public async Task<ActionResult> DeleteProductById(int productId)
        {
            try
            {
                var product = await this._dbContext.Products.FirstOrDefaultAsync(p => p.ProductId == productId);

                if (product != null)
                {
                    //Soft delete
                    product.IsDeleted = true;

                    await this._dbContext.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "DeleteProductById Failed");
                return BadRequest();

            }

        }

        [HttpPut]
        [Route("UpdateProduct")]
        public async Task<ActionResult> UpdateProduct(Models.Product model)
        {
            try
            {
                var product = await this._dbContext.Products.FirstOrDefaultAsync(p => p.ProductId == model.ProductId);

                if (product != null)
                {
                    product.Price = model.Price;
                    product.Name = model.Name;
                    product.Description = model.Description;

                    //Todo: Need to deal with its cateogry
                    // For new category, need to link them together
                    // For old category, need to update it information

                    await this._dbContext.SaveChangesAsync();
                    return Ok( new Models.Product(product));
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "DeleteProductById Failed");
                return BadRequest();
            }
        }
    }
}
