using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string firstNmae { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Address { get; set; }
        public string Picture { get; set; }
        public DateTime DateRegistered { get; set; }
        public bool Activated { get; set; }
        public bool Deleted { get; set; }
        public string Nationality { get; set; }
        public string State { get; set; }
        public string Gender { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool RememberPassword { get; set; }
        public string Description { get; set; }
    }
}
