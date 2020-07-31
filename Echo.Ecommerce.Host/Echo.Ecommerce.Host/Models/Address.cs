using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Models
{
    public class Address
    {
        public int AddressId { get; set; } 
        public User User { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public Address ()
        {

        }

        public Address (Entities.Address  address)
        {
            this.AddressId = address.AddressId;

            if ( address.User != null)
            {
                this.User = new Models.User(address.User);
            }
          
            this.Street = address.Street;
            this.City = address.City;
            this.Country = address.Country;
        }
    }
}
