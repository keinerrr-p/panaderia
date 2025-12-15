using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogoController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public CatalogoController(PanaderiaContext context)
        {
            _context = context;
        }

        // ============================
        // CATÁLOGO PÚBLICO
        // ============================
        [HttpGet("publico")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCatalogoPublico()
        {
            var productos = await _context.Catalogos
                .Include(c => c.Categoria)
                .Where(p => p.Estado == 1)
                .Select(p => new
                {
                    idProducto = p.IdProducto,
                    nombreProducto = p.NombreProducto,
                    descripcion = p.Descripcion,
                    precio = p.Precio,
                    imagen = p.Imagen,
                    categoria = new { nombreCategoria = p.Categoria != null ? p.Categoria.NombreCategoria : "" }
                })
                .ToListAsync();

            return Ok(productos);
        }

        // ============================
        // ADMIN - LISTAR TODOS
        // ============================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productos = await _context.Catalogos
                .Include(c => c.Categoria)
                .Select(p => new
                {
                    idProducto = p.IdProducto,
                    nombreProducto = p.NombreProducto,
                    descripcion = p.Descripcion,
                    precio = p.Precio,
                    unidadMedida = p.UnidadMedida,
                    estado = p.Estado,
                    idCategoria = p.IdCategoria,
                    imagen = p.Imagen,
                    stock = _context.Inventarios
                                .Where(i => i.IdProducto == p.IdProducto)
                                .Select(i => (int?)i.StockActual)
                                .FirstOrDefault() ?? 0,
                    categoria = new { nombreCategoria = p.Categoria != null ? p.Categoria.NombreCategoria : "" }
                })
                .ToListAsync();

            return Ok(productos);
        }

        // ============================
        // GET POR ID (Para editar)
        // ============================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var producto = await _context.Catalogos
                .Include(c => c.Categoria)
                .FirstOrDefaultAsync(p => p.IdProducto == id);

            if (producto == null) return NotFound();

            // Obtener el inventario más reciente
            var inventario = await _context.Inventarios
            .Where(i => i.IdProducto == id)
            .OrderByDescending(i => i.FechaActualizacion)
            .FirstOrDefaultAsync();

            return Ok(new
            {
                idProducto = producto.IdProducto,
                nombreProducto = producto.NombreProducto,
                descripcion = producto.Descripcion,
                precio = producto.Precio,
                unidadMedida = producto.UnidadMedida,
                estado = producto.Estado,
                idCategoria = producto.IdCategoria,
                imagen = producto.Imagen,
                stock = inventario?.StockActual ?? 0,
                categoria = new { nombreCategoria = producto.Categoria?.NombreCategoria ?? "" }
            });
        }

        // ============================
        // CREAR PRODUCTO
        // ============================
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Catalogo c)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Catalogos.Add(c);
            await _context.SaveChangesAsync();

            // Después de guardar c
            var inventario = new Inventario
            {
                IdProducto = c.IdProducto,
                StockActual = c.Stock, // c.Stock debe tener valor
                Ubicacion = "Bodega principal",
                FechaActualizacion = DateTime.Now
            };
            _context.Inventarios.Add(inventario);
            await _context.SaveChangesAsync();

            _context.MovimientosInventario.Add(new MovimientoInventario
            {
                IdProducto = c.IdProducto,
                TipoMovimiento = "ENTRADA",
                Cantidad = (double)c.Stock,
                Precio = c.Precio,
                FechaMovimiento = DateTime.Now,
                Motivo = "Stock inicial",
                IdUsuario = 0,
                IdCliente = 0
            });

            await _context.SaveChangesAsync();
            return Ok(c);
        }

        // ============================
        // EDITAR PRODUCTO + STOCK
        // ============================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Catalogo c)
        {
            if (id != c.IdProducto) return BadRequest();

            var producto = await _context.Catalogos.FindAsync(id);
            if (producto == null) return NotFound();

            producto.NombreProducto = c.NombreProducto;
            producto.Descripcion = c.Descripcion;
            producto.Precio = c.Precio;
            producto.UnidadMedida = c.UnidadMedida;
            producto.Estado = c.Estado;
            producto.IdCategoria = c.IdCategoria;
            producto.Imagen = c.Imagen;

            // Buscar inventario principal
            var inventario = await _context.Inventarios
                .Where(i => i.IdProducto == id && i.Ubicacion == "Bodega principal")
                .OrderByDescending(i => i.FechaActualizacion)
                .FirstOrDefaultAsync();

            if (inventario != null)
            {
                inventario.StockActual = c.Stock;              // <-- Actualiza directamente el stock
                inventario.FechaActualizacion = DateTime.Now;  // <-- Actualiza la fecha
            }
            else
            {
                // Si no existe inventario, lo creamos
                var nuevoInventario = new Inventario
                {
                    IdProducto = id,
                    StockActual = c.Stock,
                    Ubicacion = "Bodega principal",
                    FechaActualizacion = DateTime.Now
                };
                _context.Inventarios.Add(nuevoInventario);
            }

            await _context.SaveChangesAsync();
            return Ok(producto);
        }


        // ============================
        // ELIMINAR PRODUCTO
        // ============================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var producto = await _context.Catalogos.FindAsync(id);
            if (producto == null) return NotFound();

            // Eliminar inventario relacionado (opcional, si quieres limpiar todo)
            var inventarios = _context.Inventarios.Where(i => i.IdProducto == id);
            _context.Inventarios.RemoveRange(inventarios);

            // Eliminar movimientos de inventario relacionados (opcional)
            var movimientos = _context.MovimientosInventario.Where(m => m.IdProducto == id);
            _context.MovimientosInventario.RemoveRange(movimientos);

            // Eliminar el producto
            _context.Catalogos.Remove(producto);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
