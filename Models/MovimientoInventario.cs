namespace AplicativoWebMVC.Models
{
  public class MovimientoInventario
  {
    public int IdMovimiento {get; set;}
    public required int IdProducto {get; set;}
    public required string TipoMovimiento {get; set;}
    public required double Cantidad {get; set;}
    public required decimal Precio {get; set;}
    public DateTime FechaMovimiento {get; set;}
    public required string Motivo {get; set;}
    public int IdUsuario {get; set;}
    public int IdCliente {get; set;}
  }
}