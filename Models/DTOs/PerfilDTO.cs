using System.ComponentModel.DataAnnotations;

namespace AplicativoWebMVC.Models.DTOs

{
    public class PerfilDTO

 {
    public int IdUsuario { get; set; }

    [Required]
    [StringLength(100)]
    public string NombreUsuario { get; set; } = null!;

    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(10)]
    public string Telefono { get; set; } = null!;

    [DataType(DataType.Password)]
    public string? NuevaContrasena { get; set; }

    [DataType(DataType.Password)]
    [Compare("NuevaContrasena", ErrorMessage = "Las contraseñas no coinciden")]
    public string? ConfirmarContrasena { get; set; }
}
}
