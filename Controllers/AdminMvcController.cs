using Microsoft.AspNetCore.Mvc;

namespace AplicativoWebMVC.Controllers
{
    public class AdminMvcController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
