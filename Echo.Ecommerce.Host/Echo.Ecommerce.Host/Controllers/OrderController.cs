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
    public class OrderController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly DBContext _dbContext;

        public OrderController(ILoggerFactory loggerFactory, DBContext dbContext)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;
        }

        //[HttpGet]
        //[Route("GetAllOrders")]
        //public async Task<ActionResult<List<Models.Order>>> GetAllOrders()
        //{
        //    try
        //    {
        //        var orders = this._dbContext.Orders.Include(o => o.OrderProducts)
        //            .OrderBy(o => o.OrderId)
        //            .AsNoTracking()
        //            .Select(o => new Models.Order(o))
        //            .ToList();

        //        if (products.Count > 0)
        //        {
        //            return Ok(products);
        //        }
        //        else
        //        {
        //            return Ok();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        this._logger.LogError(ex, "GetAllProducts Failed");
        //        return BadRequest();
        //    }
        //}
    }
}
