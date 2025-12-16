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

        private int ObtenerClienteId()
            {
                var idUsuario = HttpContext.Session.GetInt32("IdUsuario");

                if (idUsuario == null)
                    throw new Exception("Usuario no autenticado");

                return _context.Clientes
                    .Where(c => c.IdUsuario == idUsuario)
                    .Select(c => c.IdCliente)
                    .First();
            }


        [HttpPost("Agregar")]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Agregar(int idProducto, decimal cantidad)
        {
            int idCliente = ObtenerClienteId();

            await _context.Database.ExecuteSqlRawAsync(
                "CALL SP_AgregarAlCarrito(@p0, @p1, @p2)",
                idCliente, idProducto, cantidad
            );

            return Ok();
        }

        public async Task<IActionResult> Index()
        {
            int idCliente = ObtenerClienteId();

            var carrito = await _context.CarritoItems
                .FromSqlRaw("CALL SP_ObtenerDetalleCarrito(@p0)", idCliente)
                .ToListAsync();

            return View(carrito);
        }
    

        // ✏️ ACTUALIZAR CANTIDAD
        [HttpPost]
        public async Task<IActionResult> Actualizar(int idProducto, decimal cantidad)
        {
            int idCliente = ObtenerClienteId();

            await _context.Database.ExecuteSqlRawAsync(
                "CALL SP_ActualizarCantidadCarrito(@p0, @p1, @p2)",
                idCliente, idProducto, cantidad
            );

            return RedirectToAction("Index");
        }

        // ❌ ELIMINAR ITEM
        [HttpPost]
        public async Task<IActionResult> Eliminar(int idCarrito, int idProducto)
        {
            await _context.Database.ExecuteSqlRawAsync(
                "CALL SP_EliminarItemCarrito(@p0, @p1)",
                idCarrito, idProducto
            );

            return RedirectToAction("Index");
        }

        // ✅ FINALIZAR CARRITO
        [HttpPost]
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
