namespace AplicativoWebMVC.Models
{
  public class DetalleVenta
  {
    public int IdDetalle {get; set;}
    public required int IdVenta {get; set;}
    public required int IdProducto {get; set;}
    public required double Cantidad {get; set;}
    public required double PrecioUnitario {get; set;}
    public double Subtotal {get; set;}
  }
}