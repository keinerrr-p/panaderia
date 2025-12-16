using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly PanaderiaContext _context;
        public AdminController(PanaderiaContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Admins.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null) return NotFound();
            return Ok(admin);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Admin admin)
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return Ok(admin);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Admin admin)
        {
            if (id != admin.IdAdmin) return BadRequest();
            _context.Entry(admin).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(admin);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null) return NotFound();

            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();
            return Ok();
        }
        // Añadir esta sección dentro de CatalogoController.cs

        [HttpGet("categorias")] // Nuevo endpoint: /api/Catalogo/categorias
        
        public async Task<IActionResult> GetCategorias()
        {
            var categorias = await _context.Categorias
                .Select(c => new
                {
                    idCategoria = c.IdCategoria,
                    nombreCategoria = c.NombreCategoria
                })
                .ToListAsync();

            return Ok(categorias);
        }
    }
}
