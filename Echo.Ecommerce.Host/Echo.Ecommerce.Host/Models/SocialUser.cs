﻿using System;
using Microsoft.AspNetCore.Identity;
namespace Echo.Ecommerce.Host.Models
{
    public class SocialUser: User
    {
        public string Provider { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public string AuthToken { get; set; }
        public string IdToken { get; set; }
        public string AuthorizationCode { get; set; }
      
    }
}
