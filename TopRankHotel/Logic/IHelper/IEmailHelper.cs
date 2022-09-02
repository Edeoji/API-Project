using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.IHelper
{
    public interface IEmailHelper
    {
        bool VerificationEmail(ApplicationUser applicationUser, string linkToClick);
        Task<Userverification> CreateUserToken(string userEmail);
        Task<Userverification> GetUserToken(Guid token);
        bool SendCompanyWelcomeEmail(ApplicationUser applicationUser);
        bool PasswordResetLink(ApplicationUser applicationUser, string linkToClick);
        bool PasswordResetConfirmation(ApplicationUser applicationUser);
        bool UserVerificationEmail(ApplicationUser applicationUser, string linkToClick);
        Task<bool> MarkTokenAsUsed(Userverification userVerification);
        bool PasswordChangeConfirmation(ApplicationUser applicationUser);
        bool Gratitude(ApplicationUser applicationUser);
    }
}
