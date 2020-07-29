using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Entities
{
    [Table("User")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [Required]
        public Guid Identity { get; set; }

        [Required]
        public string FullName { get; set; }
        public string Telephone { get; set; }

        [Required]
        public string PassWord { get; set; }

        public Address Address { get; set; }

        public ICollection<Order> Orders { get; set; }

    }
}
