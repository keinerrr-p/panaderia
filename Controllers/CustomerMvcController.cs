using Microsoft.AspNetCore.Mvc;

namespace AplicativoWebMVC.Controllers
{
    public class CustomerMvcController : Controller
    {
        public IActionResult Index()

        
        {
            ViewBag.NombreUsuario = HttpContext.Session.GetString("NombreUsuario");
           return View();
            
        }

        
    }
}
