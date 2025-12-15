namespace AplicativoWebMVC.Models
{
  public class Facturacion
  {
    public int IdFacturacion {get; set;}
    public int IdFactura {get; set;}
    public required int IdVenta {get; set;}
    public required string NumeroFactura {get; set;}
    public DateTime FechaEmision {get; set;}
    public double Impuestos {get; set;}
    public required double TotalFactura {get; set;}
  }
}