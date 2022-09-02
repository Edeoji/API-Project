using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels
{
    public class ApplicationUserViewModel
    {
        
        public int UserId { get; set; }
        public string firstNmae { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Picture { get; set; }
        public DateTime DateRegistered { get; set; }
        public bool Activated { get; set; }
        public bool Deleted { get; set; }
        public string Nationality { get; set; }
        public string State { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public bool RememberPassword { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Phonenumber { get; set; }
        public string Username { get; set; }
        public bool RememberMe { get; set; }
    }
}
