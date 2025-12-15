namespace AplicativoWebMVC.Models
{
  public class Cliente
  {
    public int IdCliente {get; set;}
    public required int IdUsuario {get; set;}
    public required string Telefono {get; set;}
  }
}
