using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Echo.Ecommerce.Host.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Echo.Ecommerce.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
                var products = this._dbContext.Products.OrderBy(c => c.ProductId).AsNoTracking()
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
        [Route("AddProduct")]
        public async Task<ActionResult<Models.Category>> AddProduct(Models.Product product)
        {
            try
            {
                //Verify whether the catogry exists in DB or Not
                var _product = await this._dbContext.Products.FirstOrDefaultAsync(c => c.Title.ToUpper().Equals(product.Name.ToUpper()));
                if (_product != null) return Ok("Product is in the DB");

                Echo.Ecommerce.Host.Entities.Product newProduct = new Entities.Product()
                {
                    Title = product.Name,
                    Price = product.Price,
                    Description = product.Description,
                    //Category = product.Category
                };

                await this._dbContext.Products.AddAsync(newProduct);

                int result = await this._dbContext.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok(newProduct);
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

        //[HttpGet]
        //[Route("GetCategoryById")]
        //public async Task<ActionResult<Models.Category>> GetCategoryById(int categoryId)
        //{
        //    try
        //    {
        //        var category = await this._dbContext.Categories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);

        //        if (category != null)
        //        {
        //            return Ok(new Models.Category(category));
        //        }
        //        else
        //        {
        //            return NotFound($"Category ({categoryId}) Not Found");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        this._logger.LogError(ex, "GetCategoryById Failed");
        //        return BadRequest();
        //    }
        //}

        //[HttpDelete]
        //[Route("DeleteCategoryById")]
        //public async Task<ActionResult> DeleteCategoryById(int cateogryId)
        //{
        //    try
        //    {
        //        var category = await this._dbContext.Categories.FirstOrDefaultAsync(c => c.CategoryId == cateogryId);

        //        if (category != null)
        //        {
        //            //Soft delete
        //            category.IsDeleted = true;

        //            await this._dbContext.SaveChangesAsync();
        //            return Ok();
        //        }
        //        else
        //        {
        //            return BadRequest();
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        this._logger.LogError(ex, "DeleteCategoryById Failed");
        //        return BadRequest();

        //    }

        //}
    }
}
