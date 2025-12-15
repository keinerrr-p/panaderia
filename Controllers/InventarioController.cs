using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
    public class InventarioController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public InventarioController(PanaderiaContext context)
        {
            _context = context;
        }
        

        // ============================
        // VER INVENTARIO
        // ============================
        [HttpGet]
        public async Task<IActionResult> GetInventario()
        {
            var data = await _context.Inventarios
                .Include(i => i.Producto)
                .Select(i => new
                {
                    i.IdInventario,
                    i.IdProducto,
                    Producto = i.Producto != null ? i.Producto.NombreProducto : "",
                    i.StockActual,
                    i.Ubicacion,
                    i.FechaActualizacion
                })
                .ToListAsync();

            return Ok(data);
        }

        // ============================
        // HISTORIAL DE MOVIMIENTOS
        // ============================
        [HttpGet("movimientos")]
        public async Task<IActionResult> GetMovimientos()
        {
            var movimientos = await (
                from m in _context.MovimientosInventario
                join p in _context.Catalogos
                    on m.IdProducto equals p.IdProducto
                orderby m.FechaMovimiento descending
                select new
                {
                    m.IdMovimiento,
                    Producto = p.NombreProducto,
                    m.TipoMovimiento,
                    m.Cantidad,
                    m.Motivo,
                    m.FechaMovimiento
                }
            ).ToListAsync();

            return Ok(movimientos);
        }
    }
}