using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicativoWebMVC.Models
{
    public class Catalogo
    {
        public int IdProducto { get; set; } // clave primaria

        public required int IdCategoria { get; set; } // FK

        public required string  NombreProducto { get; set; } = string.Empty;
        public string  Descripcion { get; set; } = string.Empty;
        public string UnidadMedida { get; set; } = "unidad";
        public string? Imagen { get; set; } 
        public  required decimal  Precio { get; set; }
        public int Estado { get; set; } = 1;
        
        [NotMapped]
        public decimal Stock { get; set; }

        // Propiedad de navegación
        public Categoria? Categoria { get; set; } = null!;
        
    }
}
