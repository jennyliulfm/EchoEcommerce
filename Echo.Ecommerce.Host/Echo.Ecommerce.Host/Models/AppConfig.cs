using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Models
{
    public class MailSenderSetting
    { 
        public string FromAddress { get; set; }
        public string MailClient { get; set; }
        public string UserID { get; set; }
        public string Password { get; set; }
        public string Port { get; set; }
        public string Sender { get; set; }
        public string Subject { get; set; }
        public string ExpiredDays { get; set; }
    }

    public class AppSetting
    {
        public string JWTSecret { get; set; }
        public string ClientURL { get; set; }
        public string UserConfirmedRoute { get; set; }
        public string AdminName { get; set; }
        public string AdminPassword { get; set; }
    }

    

}
