using Core.DATABASE;
using Core.Models;
using Core.ViewModels;
using Logic.IHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Helper
{
    public class UserHelper : IUserHelper
    {
        private readonly ApplicationDbContext _context;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserHelper(ApplicationDbContext context, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        public async Task<ApplicationUser> FindUserByNameAsync(string username)
        {
            return await _userManager.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();
        }
        public async Task<ApplicationUser> FindUserByEmailAsync(string email)
        {
            return await _userManager.Users.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
        public async Task<ApplicationUser> FindUserByIdAsync(string id)
        {
            return await _userManager.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
        }
        public ApplicationUser FindUserByName(string username)
        {
            return _userManager.Users.Where(x => x.UserName == username).FirstOrDefault();
        }
        public ApplicationUser FindUserById(string firstname)
        {
            return _userManager.Users.Where(x => x.firstNmae == firstname).FirstOrDefault();
        }
        public ApplicationUser FindUserByEmail(string email)
        {
            return _userManager.Users.Where(x => x.Email == email).FirstOrDefault();
        }
        public async Task<ApplicationUser> CreateUserAsync(ApplicationUserViewModel applicationUserViewModel)
        {
            try
            {
                var applicationUser = new ApplicationUser
                {
                    UserName = applicationUserViewModel.Email,
                    Email = applicationUserViewModel.Email,
                    Password = applicationUserViewModel.Password,
                    ConfirmPassword = applicationUserViewModel.ConfirmPassword,

                };
                if(applicationUser.Email!=null && applicationUser.Password != null && applicationUser.ConfirmPassword !=null)
                {
                    applicationUser.DateRegistered = DateTime.Now;
                    var result =  _userManager.CreateAsync(applicationUser, applicationUser.Password).Result;
                    if (result.Succeeded)
                    {
                        return applicationUser;
                    }
                    return null;
                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }

    }

}
