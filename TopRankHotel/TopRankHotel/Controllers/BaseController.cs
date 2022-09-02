using Core.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopRankHotel.Controllers
{
    public class BaseController : Controller
    {
        protected void SetMessage(string message, Messages.Category messageType)
        {
            Messages msg = new Messages(message, (int)messageType);
            TempData["Message"] = msg;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
