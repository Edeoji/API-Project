using Core.Models;
using Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.IHelper
{
    public interface IUserHelper
    {
        Task<ApplicationUser> FindUserByIdAsync(string id);
        ApplicationUser FindUserByName(string username);
        ApplicationUser FindUserById(string firstname);
        ApplicationUser FindUserByEmail(string email);
        Task<ApplicationUser> FindUserByNameAsync(string username);
        Task<ApplicationUser> FindUserByEmailAsync(string email);
        Task<ApplicationUser> CreateUserAsync(ApplicationUserViewModel applicationUserViewModel);



    }
}
