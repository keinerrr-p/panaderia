using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models.DTOs;

namespace AplicativoWebMVC.Controllers
{
    [Route("Carrito")]
    public class CarritoController : Controller
    {
        private readonly PanaderiaContext _context;

        public CarritoController(PanaderiaContext context)
        {
            _context = context;
        }

        // ===============================
        // OBTENER CLIENTE
        // ===============================
        private int ObtenerClienteId()
        {
            var idUsuario = HttpContext.Session.GetInt32("IdUsuario");

            if (idUsuario == null)
                throw new Exception("Usuario no autenticado");

            var idCliente = _context.Clientes
                .Where(c => c.IdUsuario == idUsuario)
                .Select(c => c.IdCliente)
                .FirstOrDefault();

            if (idCliente == 0)
                throw new Exception("Cliente no encontrado");

            return idCliente;
        }

        // ===============================
        // VER CARRITO
        // ===============================
        [HttpGet("")]
        public async Task<IActionResult> Index()
        {
            int idCliente = ObtenerClienteId();

            var carrito = await _context.Set<CarritoItemDTO>()
                .FromSqlRaw("CALL SP_ObtenerDetalleCarrito(@p0)", idCliente)
                .ToListAsync();

            return View(carrito);
        }

        // ===============================
        // AGREGAR
        // ===============================
        [HttpPost("Agregar")]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Agregar(int idProducto, decimal cantidad)
        {
            int idCliente = ObtenerClienteId();

            await _context.Database.ExecuteSqlRawAsync(
                "CALL SP_AgregarAlCarrito(@p0,@p1,@p2)",
                idCliente, idProducto, cantidad
            );

            return Ok();
        }

        // ===============================
        // ACTUALIZAR
        // ===============================
        [HttpPost("Actualizar")]
        public async Task<IActionResult> Actualizar(int idProducto, decimal cantidad)
        {
            int idCliente = ObtenerClienteId();

            await _context.Database.ExecuteSqlRawAsync(
                "CALL SP_ActualizarCantidadCarrito(@p0,@p1,@p2)",
                idCliente, idProducto, cantidad
            );

            return RedirectToAction("Index");
        }

        // ===============================
        // ELIMINAR
        // ===============================
        [HttpPost("Eliminar")]
        public async Task<IActionResult> Eliminar(int idProducto)
        {
            int idCliente = ObtenerClienteId();

            // reutilizamos el SP
            await _context.Database.ExecuteSqlRawAsync(
                "CALL SP_ActualizarCantidadCarrito(@p0,@p1,0)",
                idCliente, idProducto
            );

            return RedirectToAction("Index");
        }

        // ===============================
        // FINALIZAR
        // ===============================
        [HttpPost("Finalizar")]
        public async Task<IActionResult> Finalizar()
        {
            int idCliente = ObtenerClienteId();

            await _context.Database.ExecuteSqlRawAsync(
                "CALL SP_FinalizarCarrito(@p0)",
                idCliente
            );

            return RedirectToAction("Index");
        }
    }
}