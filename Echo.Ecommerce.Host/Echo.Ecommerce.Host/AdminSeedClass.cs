using System;
using Microsoft.Extensions.DependencyInjection;
using Echo.Ecommerce.Host.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Echo.Ecommerce.Host.Models;

namespace Echo.Ecommerce.Host
{
    public static class AdminSeedClass
    {
        public static void Initialize(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var provider = scope.ServiceProvider;
                var context = provider.GetRequiredService<DBContext>();
                var userManager = provider.GetRequiredService<UserManager<Entities.User>>();
                var roleManager = provider.GetRequiredService<RoleManager<IdentityRole>>();

                // automigration 
                context.Database.Migrate();
                CreateAdminUser(userManager, roleManager, configuration);
            }
        }

        private static void CreateAdminUser(UserManager<Entities.User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {

            AppSetting appSetting = new AppSetting()
            {
                AdminName = configuration["AppSettings:AdminName"].ToString(),
                AdminPassword = configuration["AppSettings:AdminPassword"].ToString(),
            };


            var adminRole = roleManager.RoleExistsAsync(Role.Admin.ToString()).Result;
            if (!adminRole)
            {
                //create the roles and seed them to the database
                roleManager.CreateAsync(new IdentityRole(Role.Admin.ToString())).GetAwaiter().GetResult();
            }

            var user = userManager.FindByNameAsync(appSetting.AdminName).Result;
            if (user == null)
            {
                var adminUser = new Entities.User()
                {
                    UserName = appSetting.AdminName,
                    Email = appSetting.AdminName,
                };

                var createPowerUser = userManager.CreateAsync(adminUser, appSetting.AdminPassword).Result;
                if (createPowerUser.Succeeded)
                {
                    userManager.AddToRoleAsync(adminUser, Role.Admin.ToString()).GetAwaiter().GetResult();
                }
            }
        }
    }
    
}
