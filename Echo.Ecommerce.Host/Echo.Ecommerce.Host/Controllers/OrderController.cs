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
        [Route("CreateOrder")]
        [Authorize(Roles = "General")]
        public async Task<ActionResult<Models.Order>> CreateOrder(Models.Order model)
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
                        // Todo: need to add order status here
                        Price = model.Price,
           
                        OrderProducts = new List<Entities.OrderProduct>()
                    };

                    await this._dbContext.Orders.AddAsync(newOrder);

                    foreach (Models.OrderProduct op in model.OrderProducts)
                    {
                        var product = await this._dbContext.Products.FirstOrDefaultAsync(p => p.ProductId == op.ProductId);

                        if (product != null)
                        {
                            Entities.OrderProduct orderProduct = new Entities.OrderProduct()
                            {
                                Order = newOrder,
                                Product = product,
                                Quantity = op.Quantity,
                            };

                            await this._dbContext.OrderProducts.AddAsync(orderProduct);
                        }
                    }    

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
                this._logger.LogError(ex, "CreateOrder Failed");
                return BadRequest();
            }
            
        }

        [HttpGet]
        [Route("GetOrdersForUser")]
        public async ActionResult<Models.Order> GetOrdersForUser()
        {
            try
            {
                var user = this.GetUser();

                if( user != null )
                {
                    var orders = this._dbContext.Orders.Where(order => order.User.Id == user.Id)
                        .AsNoTracking()
                        .OrderBy(order => order.IssueDate)
                        .Take(5)
                        .Select(order => new Models.Order(order))
                        .ToList();

                    return Ok(orders);
                }
                else
                {
                    return Ok();
                }
            }
            catch( Exception ex)
            {
                this._logger.LogError(ex, "GetOrdersForUser Failed");
                return BadRequest();
            }
           
        }
    }
}
