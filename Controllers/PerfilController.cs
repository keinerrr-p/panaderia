using Microsoft.AspNetCore.Mvc;
using AplicativoWebMVC.Models.DTOs;
using AplicativoWebMVC.Data;

public class PerfilController : Controller
{
    private readonly PanaderiaContext _context;

    public PerfilController(PanaderiaContext context)
    {
        _context = context;
    }
    private int ObtenerUsuarioLogueadoId()
    {
         return HttpContext.Session.GetInt32("IdUsuario") ?? 0;
    }

    public IActionResult Editar()

    
    {
        int idUsuario = ObtenerUsuarioLogueadoId();

        var data = (from u in _context.Usuarios
                    join c in _context.Clientes
                        on u.IdUsuario equals c.IdUsuario
                    where u.IdUsuario == idUsuario
                    select new PerfilDTO
                    {
                        IdUsuario = u.IdUsuario,
                        NombreUsuario = u.NombreUsuario,
                        Email = u.Email,
                        Telefono = c.Telefono
                    }).FirstOrDefault();

        if (data == null)
            return NotFound();

        return View(data);
    }


        [HttpPost]
    public IActionResult Editar(PerfilDTO model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var usuario = _context.Usuarios
            .FirstOrDefault(u => u.IdUsuario == model.IdUsuario);

        var cliente = _context.Clientes
            .FirstOrDefault(c => c.IdUsuario == model.IdUsuario);

        if (usuario == null || cliente == null)
            return NotFound();

        // Usuario
        usuario.NombreUsuario = model.NombreUsuario;
        usuario.Email = model.Email;

        if (!string.IsNullOrEmpty(model.NuevaContrasena))
        {
            usuario.Contrasena = model.NuevaContrasena;
        }

        // Cliente
        cliente.Telefono = model.Telefono;

        _context.SaveChanges();
        HttpContext.Session.SetString("NombreUsuario", usuario.NombreUsuario);

        TempData["Success"] = "Perfil actualizado correctamente";
        return RedirectToAction("Editar");
    }
}

