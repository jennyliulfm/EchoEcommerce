using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Entities
{
   
    [Table("Order")]
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        [ForeignKey("AddressId")]
        public Address Address { get; set; }
       
        public DateTime IssueDate { get; set; }
        public OrderStatus OrderStatus { get; set; }

        public List<OrderProduct> OrderProducts { get; set; }

    }
}
