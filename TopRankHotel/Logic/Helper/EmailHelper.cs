using Core.DATABASE;
using Core.Models;
using Logic.IHelper;
using Logic.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Helper
{
    public class EmailHelper: IEmailHelper
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserHelper _userHelper;
        private IEmailServices _emailServices;
        private readonly IGeneralConfiguration _generalConfiguration;

        public EmailHelper(ApplicationDbContext context, IEmailServices emailServices, IUserHelper userHelper, IGeneralConfiguration generalConfiguration)
        {
            _context = context;
            _userHelper = userHelper;
            _emailServices = emailServices;
            _generalConfiguration = generalConfiguration;
        }
        public async Task<Userverification> GetUserToken(Guid token)
        {
            return await _context.Userverifications.Where(t => t.Used != true && t.Token == token)?.Include(s => s.User).FirstOrDefaultAsync();
        }

        public async Task<Userverification> CreateUserToken(string userEmail)
        {
            try
            {
                var user = await _userHelper.FindUserByEmailAsync(userEmail);
                if (user != null)
                {
                    Userverification userVerification = new Userverification()
                    {
                        UserId = user.Id,
                    };
                    await _context.AddAsync(userVerification);
                    await _context.SaveChangesAsync();
                    return userVerification;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool VerificationEmail(ApplicationUser applicationUser, string linkToClick)
        {
            try
            {
                if (applicationUser != null)
                {
                    string toEmail = applicationUser.Email;
                    string subject = "Activate your account - TopRankHotel ";
                    string message = "Thank you for registering! You’re only one click away from accessing your TopRankHotel account. <br/> " +
                        "<a  href='" + linkToClick + "' target='_blank'>" + "<button style='color:white; background-color:#FFA76F; padding:10px; border:10px;'>Verify Email</button>" + "</a>" + "<br/>" +
                        "If the link does not work copy the link to your browser: " + linkToClick + "<br/>" +
                        "Need help? We’re here for you.Simply reply to this email to contact us. <br/>" +


                        "Kind regards,<br/>" +
                        "Top Rank Hotel Enugu.";
                    _emailServices.SendEmail(toEmail, subject, message);
                    return true;
                };
                return false;
            }

            catch (Exception)
            {
                throw;
            }
        }
        public bool SendCompanyWelcomeEmail(ApplicationUser applicationUser)
        {
            try
            {
                if (applicationUser != null)
                {
                    string toEmail = applicationUser.Email;
                    string subject = "HELLO Thank you for signing up on TopRankHotel";
                    string message = "Your Company Email have being verified. Thank's for registering.<br/> " +
                        "Top Rank Hotel is a website that help our customers ease off the stress of waiting in queue before been attended to. <br/>" +
                        "Need help or complaims? We’re here for you.Simply reply to this email to contact us. <br/>" +

                        "Kind regards,<br/>" +
                        "Top Rank Hotel Enugu.";
                    _emailServices.SendEmail(toEmail, subject, message);
                    return true;
                };

                return false;
            }

            catch (Exception)
            {
                throw;
            }
        }
        public bool PasswordResetLink(ApplicationUser applicationUser, string linkToClick)
        {
            try
            {

                if (applicationUser.Email != null)
                {
                    var user = _context.ApplicationUser.Where(u => u.UserName == u.Email).FirstOrDefault();
                    if (user != null)
                    {
                        string toEmail = applicationUser.Email;
                        string subject = "Top Rank Hotel - RESET PASSWORD";
                        string message = "A password reset has been requested for your TopRankHotel Account, please click on the button below to create " + "a new password<br>" +
                            "<a style:'border:2px;' href='" + linkToClick + "' target='_blank'>" + "<button style='color:white; background-color:#FFA76F; padding:10px; border:1px;'>Reset Password</button>" + "</a>" +
                             "If the link does not work, copy the link to your browser: " + linkToClick + "<br/>" +
                            "<br/> Please make sure you've entered the address you registered with." + "<br/>" +
                            "Need help? We’re here for you.Simply reply to this email to contact us. <br/>" +

                            "<b>Kind regards,</b><br/>" +
                            "<b>Top Rank Hotel Enugu</b>";
                        _emailServices.SendEmail(toEmail, subject, message);
                        return true;
                    }
                   return false;
                };
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool PasswordResetConfirmation(ApplicationUser applicationUser)
        {
            try
            {

                if (applicationUser.Email != null)
                {
                    string toEmail = applicationUser.Email;
                    string subject = "Password Reset Successfully";
                    string message = "Password reset Successfully, please login to continue" +
                        "<br/>Need help? We’re here for you.Simply reply to this email to contact us. <br/>" +

                        "Kind regards,<br/>" +
                        "Top Rank Hotel Enugu.";
                    _emailServices.SendEmail(toEmail, subject, message);
                    return true;
                };
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<bool> MarkTokenAsUsed(Userverification userVerification)
        {
            try
            {
                var VerifiedUser = _context.Userverifications.Where(s => s.UserId == userVerification.User.Id && s.Used != true).FirstOrDefault();
                if (VerifiedUser != null)
                {
                    userVerification.Used = true;
                    userVerification.DateUsed = DateTime.Now;
                    _context.Update(userVerification);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }

            catch (Exception)
            {
                throw;
            }
        }

        public bool PasswordChangeConfirmation(ApplicationUser applicationUser)
        {
            try
            {

                if (applicationUser.Email != null)
                {
                    string toEmail = applicationUser.Email;
                    string subject = "Password Changed Successfully";
                    string message = "Password Changed Successfully, please login to continue" +
                        "Need help? We’re here for you.Simply reply to this email to contact us. <br/>" +

                        "Kind regards,<br/>" +
                        "Top Rank Hoetel Enugu.";
                    _emailServices.SendEmail(toEmail, subject, message);
                    return true;
                };

                return false;
            }

            catch (Exception)
            {
                throw;
            }
        }

        public bool UserVerificationEmail(ApplicationUser applicationUser, string linkToClick)
        {
            try
            {
                if (applicationUser != null)
                {
                    string toEmail = applicationUser.Email;
                    string subject = "Activate your account - Top Rank Hotel ";
                    string message = "Thank you for registering! You’re only one click away from accessing your TopRankHotel Company account. <br/> " +
                        "<a  href='" + linkToClick + "' target='_blank'>" + "<button style='color:white; background-color:#FFA76F; padding:10px; border:10px;'>Verify Email</button>" + "</a>" + "<br/>" +
                        "If the link does not work copy the link to your browser: " + linkToClick + "<br/>" +
                        "Need help? We’re here for you.Simply reply to this email to contact us. <br/>" +


                        "Kind regards,<br/>" +
                        "TopRank  Group.";
                    _emailServices.SendEmail(toEmail, subject, message);
                    return true;
                };
                return false;
            }

            catch (Exception)
            {
                throw;
            }
        }
        public bool Gratitude(ApplicationUser applicationUser)
        {
            try
            {

                if (applicationUser != null)
                {

                    string toEmail = applicationUser.Email;
                    string subject = "HELLO Thank you for signing up on SMARTENTER";
                    string message = "Your Email has been verified.Thank you for registering with us.<br/> " +
                      "<br/>" +
                    "SMARTENTER is an app that helps you ease off the stress of waiting in the queue, <br/>" +
                    "You can Book an appointment with any company on our platform and get a first -class service at your choice of time </br>" +
                    "<br/>" +
                    "Need help? We’re here for you.Simply reply to this email to contact us. <br/>" +
                    "Kind regards,<br/>" +
                    "Smartenter Group.";
                    _emailServices.SendEmail(toEmail, subject, message);
                    return true;
                };

                return false;
            }

            catch (Exception)
            {
                throw;
            }
        }
        public bool CompanyVerificationEmail(ApplicationUser applicationUser, string linkToClick)
        {
            try
            {
                if (applicationUser != null)
                {
                    string toEmail = applicationUser.Email;
                    string subject = "Activate your account - Smartenter ";
                    string message = "Thank you for registering! You’re only one click away from accessing your Smartenter Company account. <br/> " +
                        "<a  href='" + linkToClick + "' target='_blank'>" + "<button style='color:white; background-color:#FFA76F; padding:10px; border:10px;'>Verify Email</button>" + "</a>" + "<br/>" +
                        "If the link does not work copy the link to your browser: " + linkToClick + "<br/>" +
                        "Need help? We’re here for you.Simply reply to this email to contact us. <br/>" +


                        "Kind regards,<br/>" +
                        "Smartenter Group.";
                    _emailServices.SendEmail(toEmail, subject, message);
                    return true;
                };
                return false;
            }

            catch (Exception)
            {
                throw;
            }
        }
    }
}

    
