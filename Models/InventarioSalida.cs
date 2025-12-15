namespace AplicativoWebMVC.Models
{
  public class InventarioSalida
  {
    public int IdSalida {get; set;}
    public required int IdMovimiento {get; set;}
    public  string Destino {get; set;} = string.Empty;
    public  string Detalle {get; set;} = string.Empty;
    public DateTime FechaSalida {get; set;}
  }
}