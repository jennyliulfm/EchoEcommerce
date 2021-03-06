﻿using System;
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
                var orders = this._dbContext.Orders.Include(o => o.User)
                    .Include( o => o.Address)
                    .Include(o => o.OrderProducts)
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
        public async Task<ActionResult<Object>> CreateOrder(Models.Order model)
        {
            try
            {
                var user = this.GetUser();
                if (user != null)
                {
                    var address = this._dbContext.Addresses.FirstOrDefault(addr => addr.AddressId == model.AddressId);
                    if (address == null) return BadRequest(new { message = "Address is empty" });

                    Order newOrder = new Entities.Order()
                    {
                        User = user,
                        IssueDate = DateTime.UtcNow,
                        Price = model.Price,
                        Address = address,
                        OrderProducts = new List<Entities.OrderProduct>()
                    };

                    await this._dbContext.Orders.AddAsync(newOrder);
                    await this._dbContext.SaveChangesAsync();

                    if (model.OrderProducts.Count >0 )
                    {
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
                    }
                   
                    int result = await this._dbContext.SaveChangesAsync();

                    if (result > 0)
                    {
                        return Ok();
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
        public ActionResult<Models.Order> GetOrdersForUser(int pageNumber)
        {
            try
            {
                var user = this.GetUser();

                if( user != null )
                {
                    var orders = this._dbContext.Orders
                        .Include( o => o.Address)
                        .Include( o => o.OrderProducts)
                        .Where(order => order.User.Id == user.Id)
                        .AsNoTracking()
                        .OrderBy(order => order.IssueDate)
                        .Skip(5 * pageNumber)
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
