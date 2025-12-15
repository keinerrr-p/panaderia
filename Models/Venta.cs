namespace AplicativoWebMVC.Models
{
  public class Venta
  {
    public int IdVenta {get; set;}
    public required int IdCliente {get; set;}
    public int IdUsuarioFechaVenta {get; set;}
    public string MetodoPago {get; set;} = string.Empty;
    public string Estado {get; set;} = string.Empty;
  }
}