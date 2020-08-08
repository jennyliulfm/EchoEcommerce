using System;
using Echo.Ecommerce.Host.Models;
using Echo.Ecommerce.Host.Entities;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Repositories
{
    public class UserRepository: IDisposable
    {
        private readonly UserManager<Entities.User> _userManager;

        public UserRepository(UserManager<Entities.User> userManager)
        {
            this._userManager = userManager;
        }

        public async Task<Entities.User> FindUserByIdAsync(string Id)
        {
            var user = await this._userManager.FindByIdAsync(Id);
            return user;
            
        }
        public async Task< Entities.User> FindUserByEmailAsync(string email)
        {
            var user = await this._userManager.FindByEmailAsync(email);
            return user;

        }

        public async Task<IdentityResult> CreateNewUserAsync(Entities.User user)
        {
            return await this._userManager.CreateAsync(user);
        }

        public async Task<IdentityResult>  CreateRoleForUserAsync(Entities.User user, Role role)
        {
            return await this._userManager.AddToRoleAsync(user, role.ToString());

        }

        public async Task<string> GetRoleOfUserAsync(Entities.User user)
        {
            var roles = await this._userManager.GetRolesAsync(user);
            return roles.FirstOrDefault();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
