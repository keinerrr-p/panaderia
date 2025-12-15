namespace AplicativoWebMVC.Models
{
  public class Usuario
  {
    public int IdUsuario {get; set;}
    public required string NombreUsuario {get; set;}
    public required string Email {get; set;}
    public required string Contrasena {get; set;}
    public required string Rol {get; set;}
    public int Estado {get; set;}
    public DateTime CreadoEn {get; set;}
  }
}