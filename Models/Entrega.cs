namespace AplicativoWebMVC.Models
{
  public class Entrega
  {
    public int IdEntrega {get; set;}
    public required int IdVenta {get; set;}
    public required string Direccion {get; set;}
    public string Estado {get; set;} = string.Empty;
    public DateTime FechaProgramada {get; set;}
    public DateTime FechaEntrega {get; set;}
  }
}

