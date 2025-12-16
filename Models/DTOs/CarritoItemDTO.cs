namespace AplicativoWebMVC.Models.DTOs
{
    public class CarritoItemDTO
    {
        public int IdDetalle { get; set; }
        public int IdCarrito { get; set; }
        public int IdProducto { get; set; }

        public string NombreProducto { get; set; } = string.Empty;
        public string Imagen { get; set; } = string.Empty;

        public decimal Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal { get; set; }
    }
}
