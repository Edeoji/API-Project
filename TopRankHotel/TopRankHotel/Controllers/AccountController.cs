using Core.DATABASE;
using Core.Models;
using Core.ViewModels;
using Logic.IHelper;
using Logic.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopRankHotel.Controllers
{
    public class AccountController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailHelper _emailHelper;
        private readonly IEmailServices _emailServices;
        private readonly IUserHelper _userHelper;
        private readonly IGeneralConfiguration _generalConfiguration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AccountController(ApplicationDbContext context, IGeneralConfiguration generalConfiguration, IWebHostEnvironment webHostEnvironment, IEmailServices emailServices, IEmailHelper emailHelper, IUserHelper userHelper, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
            _emailHelper = emailHelper;
            _emailServices = emailServices;
            _userHelper = userHelper;
            _generalConfiguration = generalConfiguration;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Register()
        {
            return  View();
        }
        [HttpPost]
        public async Task <IActionResult> Register(ApplicationUserViewModel applicationUserViewModel)
        {
            try
            {
                if (applicationUserViewModel != null)
                {
                    var createUser = await _userHelper.CreateUserAsync(applicationUserViewModel);
                    if(createUser != null)
                    {
                        var checkIfPassword = _userHelper.FindUserByEmail(createUser.Email);
                        if (checkIfPassword.Email == null)
                        {
                            ViewBag.Message = "Email already exist, Please use another email Address!";
                            return View(applicationUserViewModel);
                        }
                        if (checkIfPassword.Password != checkIfPassword.ConfirmPassword)
                        {
                            ViewBag.Message = "Password does not Match! Please Check.";
                            return View(applicationUserViewModel);
                        }
                        await _signInManager.SignInAsync(createUser, isPersistent: true);
                        var userToken = await _emailHelper.CreateUserToken(createUser.Email);
                        if (userToken != null)
                        {
                            string linkToClick = HttpContext.Request.Scheme.ToString() + "://" + HttpContext.Request.Host.ToString() + "/Account/EmailVerify?token=" + userToken.Token;

                            if (createUser != null)
                            {
                                var SendEmail = _emailHelper.UserVerificationEmail(createUser, linkToClick);
                                if (SendEmail)
                                {
                                    await _context.SaveChangesAsync();
                                    ViewBag.Messages="Registration successful, Please proceed to your email to complete your registration";
                                }
                                return RedirectToAction("Login", "Account");
                            }  
                        }
                    }
                    ViewBag.Messages = "Registration failed";
                    return View();
                }
                ViewBag.Messages= "Please fill the required failed";
                return View(applicationUserViewModel);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(ApplicationUserViewModel model)
        {
            try
            {
                if (ModelState != null)
                {
                    if (model.Password == null)
                    {
                        ViewBag.Message ="Password cannot be empty! Please Check.";
                        return View(model);
                    }
                    if (model.Email == null)
                    {
                        ViewBag.Message = "Email cannot be empty! Please Check.";
                        return View(model);
                    }
                    var user = _context.ApplicationUser.Where(x => x.Email ==model.Email && !x.Deleted ).FirstOrDefault();
                    if(user != null)
                    {
                        var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);
                        if (result.Succeeded)
                        {
                            return RedirectToAction("Index", "Home");
                        }
                        ModelState.AddModelError(string.Empty, "Invalide Login Attempt");
                    }
                    return View(user);
                }
                return View(model);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Account");
        }
        public IActionResult EmailVerify(string token)
        {
            try
            {
                if (token != null)
                {
                    Guid userToken = Guid.Parse(token);
                    var userverification = _context.Userverifications.Where(x => x.Token == userToken).Include(y => y.User).FirstOrDefault();
                    if (userverification == null || userverification.Token == Guid.Empty)
                    {
                        return RedirectToAction("Login");
                    }
                    if (userverification.User.EmailConfirmed)
                    {
                        return View(token);
                    }
                    if (userverification.Used)
                    {
                        return View();
                    }
                    else
                    {
                        userverification.Used = true;
                        userverification.DateUsed = DateTime.Now;
                        userverification.User.EmailConfirmed = true;

                        _context.Update(userverification);
                        _context.Update(userverification.User);

                        var sendemail = _emailHelper.Gratitude(userverification.User);
                        _context.SaveChanges();
                        return View();
                    }
                }
                return RedirectToAction("Login");
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
