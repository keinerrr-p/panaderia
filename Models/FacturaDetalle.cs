namespace AplicativoWebMVC.Models
{
  public class FacturaDetalle
  {
    public int IdDetalle {get; set;}
    public required int IdFactura {get; set;}
    public  string Descripcion {get; set;} = string.Empty;
    public required double Monto {get; set;}
  }
}