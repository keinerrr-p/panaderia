using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;
using System;
using System.Threading.Tasks;

namespace AplicativoWebMVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public RegistroController(PanaderiaContext context)
        {
            _context = context;
        }

        
        [HttpPost]
        public async Task<IActionResult> Registrar([FromBody] RegistroDto registro)
        {
            if (registro == null)
                return BadRequest("Datos inválidos.");

            // Verificar si el correo ya existe
            var existe = await _context.Usuarios.AnyAsync(u => u.Email == registro.Email);
            if (existe)
                return BadRequest("El correo ya está registrado.");

            try
            {
                // Crear usuario
                var usuario = new Usuario
                {
                    NombreUsuario = registro.NombreUsuario,
                    Email = registro.Email,
                    Contrasena = registro.Contrasena,
                    Rol = "cliente",
                    Estado = 1,
                    CreadoEn = DateTime.Now
                };

                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();

                // Crear cliente con teléfono
                var cliente = new Cliente
                {
                    IdUsuario = usuario.IdUsuario,
                    Telefono = registro.Telefono
                };
                _context.Clientes.Add(cliente);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    mensaje = "Cliente registrado correctamente",
                    id_usuario = usuario.IdUsuario,
                    id_cliente = cliente.IdCliente
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = ex.Message,
                    inner = ex.InnerException?.Message
                });
            }
        }

    }
}