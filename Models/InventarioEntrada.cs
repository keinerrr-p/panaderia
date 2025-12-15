namespace AplicativoWebMVC.Models
{
  public class InventarioEntrada
  {
    public int IdEntrada {get; set;}
    public required int IdMovimiento {get; set;}
    public string Detalle {get; set;} = string.Empty;
    public DateTime FechaEntrada {get; set;}   
  }
 }
