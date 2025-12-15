namespace AplicativoWebMVC.Models
{
  public class AjusteInventarioDTO
  {
    public int IdProducto { get; set; }

    // Cantidad a sumar o restar (NO stock final)
    public decimal Cantidad { get; set; }

    // "entrada" o "salida"
    public string TipoMovimiento { get; set; } = string.Empty;

    // motivo del ajuste
    public string Motivo { get; set; } = string.Empty;
  }

}