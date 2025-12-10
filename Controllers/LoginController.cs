using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public LoginController(PanaderiaContext context)
        {
            _context = context;
        }

        // LOGIN CLIENTE
        [HttpPost("Cliente")]
        public async Task<IActionResult> LoginCliente([FromBody] LoginDto login)
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Email) || string.IsNullOrWhiteSpace(login.Contrasena))
                return BadRequest("Email y contraseña son requeridos.");

            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == login.Email && u.Rol == "cliente");

            if (user == null)
                return Unauthorized("El correo no existe o no pertenece a un cliente.");

            if (user.Contrasena != login.Contrasena)
                return Unauthorized("Contraseña incorrecta.");

            return Ok(new
            {
                mensaje = "Login cliente correcto",
                usuario = new { user.IdUsuario, user.NombreUsuario, user.Email }
            });
        }

        // LOGIN ADMINISTRADOR
        [HttpPost("Admin")]
        public async Task<IActionResult> LoginAdmin([FromBody] LoginDto login)
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Email) || string.IsNullOrWhiteSpace(login.Contrasena))
                return BadRequest("Email y contraseña son requeridos.");

            var admin = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == login.Email && u.Rol == "admin");

            if (admin == null)
                return Unauthorized("Acceso denegado. Este correo no es de administrador.");

            if (admin.Contrasena != login.Contrasena)
                return Unauthorized("Contraseña incorrecta.");

            return Ok(new
            {
                mensaje = "Login admin correcto",
                usuario = new { admin.IdUsuario, admin.NombreUsuario, admin.Email }
            });
        }
    }
}