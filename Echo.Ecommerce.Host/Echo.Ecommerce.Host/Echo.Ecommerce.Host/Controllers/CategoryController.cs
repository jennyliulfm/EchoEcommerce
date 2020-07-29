using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models = Echo.Ecommerce.Host.Models;
using Microsoft.Extensions.Logging;
using Echo.Ecommerce.Host.Entities;
using Microsoft.EntityFrameworkCore;

using Entities = Echo.Ecommerce.Host.Entities;

namespace Echo.Ecommerce.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly DBContext _dbContext;

        public CategoryController(ILoggerFactory loggerFactory, DBContext dbContext)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetAllCategroies")]
        public async Task<ActionResult<List<Models.Category>>> GetAllCategories()
        {
            try
            {
                var categories = this._dbContext.Categories.OrderBy(c => c.CategoryName).AsNoTracking()
                .Select(category => new Models.Category(category))
                .ToList();

                if (categories.Count > 0)
                {
                    return Ok(categories);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "GetAllCategories Failed");
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("CreateCategory")]
        public async Task<ActionResult<Models.Category>> CreateCategory(Models.Category model)
        {
            try
            {
                //Verify whether the catogry exists in DB or Not
                var category = await this._dbContext.Categories.FirstOrDefaultAsync(c => c.CategoryName.ToUpper().Equals(model.CategoryName.ToUpper()));
                if (category != null) return Ok("Category is in the DB");

                Echo.Ecommerce.Host.Entities.Category newCategory = new Entities.Category()
                {
                    CategoryName = model.CategoryName,
                    Description = model.Description
                };

                await this._dbContext.Categories.AddAsync(newCategory);

                int result = await this._dbContext.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok(new Models.Category(newCategory));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "CreateCategory Failed");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetCategoryById")]
        public async Task<ActionResult<Models.Category>> GetCategoryById(int categoryId)
        {
            try
            {
                var category = await this._dbContext.Categories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);

                if (category != null)
                {
                    return Ok(new Models.Category(category));
                }
                else
                {
                    return NotFound($"Category ({categoryId}) Not Found");
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "GetCategoryById Failed");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("DeleteCategoryById")]
        public async Task<ActionResult> DeleteCategoryById(int cateogryId)
        {
            try
            {
                var category = await this._dbContext.Categories.FirstOrDefaultAsync(c => c.CategoryId == cateogryId);

                if (category != null)
                {
                    //Soft delete
                    category.IsDeleted = true;

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
                this._logger.LogError(ex, "DeleteCategoryById Failed");
                return BadRequest();

            }

        }
    }
}
