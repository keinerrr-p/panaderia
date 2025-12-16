using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using AplicativoWebMVC.Models;

namespace AplicativoWebPanaderia.Models
{
    [Table("carrito_detalle")]
    public class CarritoDetalle
    {
        [Key]
        [Column("id_detalle")]
        public int IdDetalle { get; set; }

        [Column("id_carrito")]
        public int IdCarrito { get; set; }

        [Column("id_producto")]
        public int IdProducto { get; set; }

        [Column("cantidad")]
        public decimal Cantidad { get; set; }

        [Column("precio_unitario")]
        public decimal PrecioUnitario { get; set; }

        // ⚠️ Campo generado en BD → SOLO LECTURA
        [Column("subtotal")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal Subtotal { get; set; }

        // 🔗 Navegación
        public Carrito?  Carrito { get; set; }
        public Catalogo? Producto { get; set; }
    }
}
