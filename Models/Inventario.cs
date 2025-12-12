namespace AplicativoWebMVC.Models
{
    public class Inventario
    {
        public int IdInventario { get; set; }
        public int IdProducto { get; set; }
        public decimal StockActual { get; set; }
        public string Ubicacion { get; set; } = string.Empty;
        public DateTime FechaActualizacion { get; set; }
        public Catalogo? Producto { get; set; }
    }

}