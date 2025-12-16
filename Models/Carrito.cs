using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicativoWebPanaderia.Models
{
    [Table("carrito")]
    public class Carrito
    {
        [Key]
        [Column("id_carrito")]
        public int IdCarrito { get; set; }

        [Column("id_cliente")]
        public int IdCliente { get; set; }

        [Column("fecha_creacion")]
        public DateTime FechaCreacion { get; set; }

        [Column("estado")]
        public string Estado { get; set; } = "activo";

        // 🔗 Navegación
        public ICollection<CarritoDetalle> Detalles { get; set; }
        = new List<CarritoDetalle>();
    }
}
