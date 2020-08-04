using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Echo.Ecommerce.Host.Entities;
using Echo.Ecommerce.Host.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Order = Echo.Ecommerce.Host.Entities.Order;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Echo.Ecommerce.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : BasicController
    {
        private readonly ILogger _logger;
        private readonly DBContext _dbContext;

        public OrderController(ILoggerFactory loggerFactory, DBContext dbContext) : base(dbContext)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetAllOrders")]
        public async Task<ActionResult<List<Models.Order>>> GetAllOrders()
        {
            try
            {
                var orders = this._dbContext.Orders.Include(o => o.OrderProducts)
                    .OrderBy(o => o.OrderId)
                    .AsNoTracking()
                    .Select(o => new Models.Order(o))
                    .Take(10)
                    .ToList();

                if (orders.Count > 0)
                {
                    return Ok(orders);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "GetAllOrders Failed");
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("PlaceOrder")]
        [Authorize(Roles = "General")]
        public async Task<Object> PlaceOrder(Models.Order model)
        {

            try
            {
                var user = this.GetUser();
                if (user != null)
                {
                    Order newOrder = new Entities.Order()
                    {
                        User = user,
                        IssueDate = DateTime.UtcNow,
                        OrderProducts = new List<Entities.OrderProduct>()
                    };
                    foreach(Models.OrderProduct op in model.OrderProducts)
                    {
                        Entities.OrderProduct newOp = new Entities.OrderProduct()
                        {
                            OrderId = op.OrderId,
                            Quantity = op.Quantity,
                            ProductId = op.ProductId
                        };
                        newOrder.OrderProducts.Add(newOp);
                    }

                    await this._dbContext.Orders.AddAsync(newOrder);

                    int result = await this._dbContext.SaveChangesAsync();
                    if (result > 0)
                    {
                        return Ok(new Models.Order(newOrder));
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    
                    return BadRequest();
                }

            }
            catch(Exception ex)
            {
                this._logger.LogError(ex, "User not logged in");
                return BadRequest();
            }
            
        }
    }
}
