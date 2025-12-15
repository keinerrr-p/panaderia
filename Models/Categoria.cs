using System.Collections.Generic;

namespace AplicativoWebMVC.Models
{
    public class Categoria
    {
        public int IdCategoria { get; set; }
        public required string NombreCategoria { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;

        // Colección de productos relacionados
        public List<Catalogo> Productos { get; set; } = new List<Catalogo>();
    }
}
