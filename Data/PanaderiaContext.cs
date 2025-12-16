using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Models;
using AplicativoWebPanaderia.Models;
using AplicativoWebMVC.Models.DTOs;

namespace AplicativoWebMVC.Data
{
    public class PanaderiaContext : DbContext
    {
        public PanaderiaContext(DbContextOptions<PanaderiaContext> options)
            : base(options)
        {
        }

        // DbSets
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<DetalleVenta> DetallesVenta { get; set; }
        public DbSet<Entrega> Entregas { get; set; }
        public DbSet<Facturacion> Facturaciones { get; set; }
        public DbSet<FacturaDetalle> FacturaDetalles { get; set; }
        public DbSet<Inventario> Inventarios { get; set; }
        public DbSet<InventarioEntrada> InventarioEntradas { get; set; }
        public DbSet<InventarioSalida> InventarioSalidas { get; set; }
        public DbSet<MovimientoInventario> MovimientosInventario { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<Catalogo> Catalogos { get; set; }

        public DbSet<Carrito> Carrito { get; set; }

        public DbSet<CarritoDetalle> Detalles { get; set; }
        public DbSet<CarritoItemDTO> CarritoItems { get; set; }


        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             modelBuilder.Entity<CarritoDetalle>()
                .Property(cd => cd.Subtotal)
                .ValueGeneratedOnAddOrUpdate();

            base.OnModelCreating(modelBuilder);

             modelBuilder.Entity<CarritoItemDTO>().HasNoKey();
    base.OnModelCreating(modelBuilder);
            // ==================== USUARIO ====================
            modelBuilder.Entity<Usuario>(entity =>
             {
                entity.ToTable("usuario");
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario").ValueGeneratedOnAdd();
                entity.Property(e => e.NombreUsuario).HasColumnName("nombre_usuario").HasMaxLength(100).IsRequired();
                entity.Property(e => e.Contrasena).HasColumnName("contrasena").HasMaxLength(255).IsRequired();
                entity.Property(e => e.Email).HasColumnName("email").HasMaxLength(150).IsRequired();
                entity.Property(e => e.Rol).HasColumnName("rol").HasMaxLength(20).HasDefaultValue("cliente").IsRequired();
                entity.Property(e => e.Estado).HasColumnName("estado").HasDefaultValue(1);
                entity.Property(e => e.CreadoEn).HasColumnName("creado_en").HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasIndex(e => e.Email).IsUnique();
            });

            // ==================== ADMIN ====================
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("admin");
                entity.HasKey(e => e.IdAdmin);

                entity.Property(e => e.IdAdmin).HasColumnName("id_admin").ValueGeneratedOnAdd();
                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario").IsRequired();
                entity.Property(e => e.NivelAcesso).HasColumnName("nivel_acesso");
            });

            // ==================== CATEGORÍA ====================
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.ToTable("categoria");
                entity.HasKey(e => e.IdCategoria);

                entity.Property(e => e.IdCategoria).HasColumnName("id_categoria").ValueGeneratedOnAdd();
                entity.Property(e => e.NombreCategoria).HasColumnName("nombre_categoria").HasMaxLength(100).IsRequired();
                entity.Property(e => e.Descripcion).HasColumnName("descripcion").HasMaxLength(255);
            });

            // ==================== CATALOGO ====================
            modelBuilder.Entity<Catalogo>(entity =>
            {
                entity.ToTable("catalogo");
                entity.HasKey(e => e.IdProducto); // <-- usar IdProducto

                entity.Property(e => e.IdProducto).HasColumnName("id_producto").ValueGeneratedOnAdd();
                entity.Property(e => e.IdCategoria).HasColumnName("id_categoria").IsRequired();
                entity.Property(e => e.NombreProducto).HasColumnName("nombre_producto").HasMaxLength(150).IsRequired();
                entity.Property(e => e.Descripcion).HasColumnName("descripcion").HasColumnType("TEXT");
                entity.Property(e => e.UnidadMedida).HasColumnName("unidad_medida").HasMaxLength(20).HasDefaultValue("unidad");
                entity.Property(e => e.Precio).HasColumnName("precio").HasColumnType("DECIMAL(10,2)").IsRequired();
                entity.Property(e => e.Estado).HasColumnName("estado").HasDefaultValue(1);

                // relación con categoría
                entity.HasOne(e => e.Categoria)
                    .WithMany(c => c.Productos)
                    .HasForeignKey(e => e.IdCategoria)
                    .OnDelete(DeleteBehavior.Restrict);
        });


            // ==================== CLIENTE ====================
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("cliente");
                entity.HasKey(e => e.IdCliente);

                entity.Property(e => e.IdCliente).HasColumnName("id_cliente").ValueGeneratedOnAdd();
                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario").IsRequired();
                entity.Property(e => e.Telefono).HasColumnName("telefono").HasMaxLength(10).IsRequired();
            });

            // ==================== CATALOGO / PRODUCTOS ====================
            modelBuilder.Entity<Catalogo>(entity =>
            {
                entity.ToTable("catalogo");
                entity.HasKey(e => e.IdProducto);
                
                entity.Property(e => e.IdProducto).HasColumnName("id_producto").ValueGeneratedOnAdd();
                entity.Property(e => e.IdCategoria).HasColumnName("id_categoria").IsRequired();
                entity.Property(e => e.NombreProducto).HasColumnName("nombre_producto").HasMaxLength(150).IsRequired();
                entity.Property(e => e.Descripcion).HasColumnName("descripcion").HasColumnType("TEXT");
                entity.Property(e => e.UnidadMedida).HasColumnName("unidad_medida").HasMaxLength(20).HasDefaultValue("unidad");
                entity.Property(e => e.Precio).HasColumnName("precio").HasColumnType("DECIMAL(10,2)").IsRequired();
                entity.Property(e => e.Estado).HasColumnName("estado").HasDefaultValue(1);
                entity.HasOne(e => e.Categoria).WithMany(c => c.Productos).HasForeignKey(e => e.IdCategoria).OnDelete(DeleteBehavior.Restrict);
            });

            // ==================== VENTA ====================
            modelBuilder.Entity<Venta>(entity =>
            {
                entity.ToTable("venta");
                entity.HasKey(e => e.IdVenta);

                entity.Property(e => e.IdVenta).HasColumnName("id_venta").ValueGeneratedOnAdd();
                entity.Property(e => e.IdCliente).HasColumnName("id_cliente").IsRequired();
                entity.Property(e => e.IdUsuarioFechaVenta).HasColumnName("id_usuario_fecha_venta");
                entity.Property(e => e.MetodoPago).HasColumnName("metodo_pago").HasMaxLength(50);
                entity.Property(e => e.Estado).HasColumnName("estado").HasMaxLength(50);
            });

            // ==================== DETALLE VENTA ====================
            modelBuilder.Entity<DetalleVenta>(entity =>
            {
                entity.ToTable("detalle_venta");
                entity.HasKey(e => e.IdDetalle);

                entity.Property(e => e.IdDetalle).HasColumnName("id_detalle").ValueGeneratedOnAdd();
                entity.Property(e => e.IdVenta).HasColumnName("id_venta").IsRequired();
                entity.Property(e => e.IdProducto).HasColumnName("id_producto").IsRequired();
                entity.Property(e => e.Cantidad).HasColumnName("cantidad").IsRequired();
                entity.Property(e => e.PrecioUnitario).HasColumnName("precio_unitario").IsRequired();
                entity.Property(e => e.Subtotal).HasColumnName("subtotal");
            });

            // ==================== ENTREGA ====================
            modelBuilder.Entity<Entrega>(entity =>
            {
                entity.ToTable("entrega");
                entity.HasKey(e => e.IdEntrega);

                entity.Property(e => e.IdEntrega).HasColumnName("id_entrega").ValueGeneratedOnAdd();
                entity.Property(e => e.IdVenta).HasColumnName("id_venta").IsRequired();
                entity.Property(e => e.Direccion).HasColumnName("direccion").HasMaxLength(255).IsRequired();
                entity.Property(e => e.Estado).HasColumnName("estado").HasMaxLength(50);
                entity.Property(e => e.FechaProgramada).HasColumnName("fecha_programada");
                entity.Property(e => e.FechaEntrega).HasColumnName("fecha_entrega");
            });

            // ==================== FACTURACION ====================
            modelBuilder.Entity<Facturacion>(entity =>
            {
                entity.ToTable("facturacion");
                entity.HasKey(e => e.IdFacturacion);

                entity.Property(e => e.IdFacturacion).HasColumnName("id_facturacion").ValueGeneratedOnAdd();
                entity.Property(e => e.IdFactura).HasColumnName("id_factura");
                entity.Property(e => e.IdVenta).HasColumnName("id_venta").IsRequired();
                entity.Property(e => e.NumeroFactura).HasColumnName("numero_factura").HasMaxLength(50).IsRequired();
                entity.Property(e => e.FechaEmision).HasColumnName("fecha_emision");
                entity.Property(e => e.Impuestos).HasColumnName("impuestos");
                entity.Property(e => e.TotalFactura).HasColumnName("total_factura").IsRequired();
            });

            // ==================== FACTURA DETALLE ====================
            modelBuilder.Entity<FacturaDetalle>(entity =>
            {
                entity.ToTable("factura_detalle");
                entity.HasKey(e => e.IdDetalle);

                entity.Property(e => e.IdDetalle).HasColumnName("id_detalle").ValueGeneratedOnAdd();
                entity.Property(e => e.IdFactura).HasColumnName("id_factura").IsRequired();
                entity.Property(e => e.Descripcion).HasColumnName("descripcion").HasMaxLength(255);
                entity.Property(e => e.Monto).HasColumnName("monto").IsRequired();
            });

            // ==================== INVENTARIO ====================
            modelBuilder.Entity<Inventario>(entity =>
            {
                entity.ToTable("inventario");
                entity.HasKey(e => e.IdInventario);

                entity.Property(e => e.IdInventario).HasColumnName("id_inventario").ValueGeneratedOnAdd();
                entity.Property(e => e.IdProducto).HasColumnName("id_producto").IsRequired();
                entity.Property(e => e.StockActual).HasColumnName("stock_actual").HasColumnType("DECIMAL(10,2)");
                entity.Property(e => e.Ubicacion).HasColumnName("ubicacion").HasMaxLength(100);
                entity.Property(e => e.FechaActualizacion).HasColumnName("fecha_actualizacion");

                entity.HasOne(e => e.Producto)
                    .WithMany()
                    .HasForeignKey(e => e.IdProducto)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // ==================== INVENTARIO ENTRADA ====================
            modelBuilder.Entity<InventarioEntrada>(entity =>
            {
                entity.ToTable("inventario_entrada");
                entity.HasKey(e => e.IdEntrada);

                entity.Property(e => e.IdEntrada).HasColumnName("id_entrada").ValueGeneratedOnAdd();
                entity.Property(e => e.IdMovimiento).HasColumnName("id_movimiento").IsRequired();
                entity.Property(e => e.Detalle).HasColumnName("detalle").HasMaxLength(255);
                entity.Property(e => e.FechaEntrada).HasColumnName("fecha_entrada");
            });

            // ==================== INVENTARIO SALIDA ====================
            modelBuilder.Entity<InventarioSalida>(entity =>
            {
                entity.ToTable("inventario_salida");
                entity.HasKey(e => e.IdSalida);

                entity.Property(e => e.IdSalida).HasColumnName("id_salida").ValueGeneratedOnAdd();
                entity.Property(e => e.IdMovimiento).HasColumnName("id_movimiento").IsRequired();
                entity.Property(e => e.Destino).HasColumnName("destino").HasMaxLength(255);
                entity.Property(e => e.Detalle).HasColumnName("detalle").HasMaxLength(255);
                entity.Property(e => e.FechaSalida).HasColumnName("fecha_salida");
            });

            // ==================== MOVIMIENTO INVENTARIO ====================
            modelBuilder.Entity<MovimientoInventario>(entity =>
            {
                entity.ToTable("movimiento_inventario");
                entity.HasKey(e => e.IdMovimiento);

                entity.Property(e => e.IdMovimiento).HasColumnName("id_movimiento").ValueGeneratedOnAdd();
                entity.Property(e => e.IdProducto).HasColumnName("id_producto").IsRequired();
                entity.Property(e => e.TipoMovimiento).HasColumnName("tipo_movimiento").HasMaxLength(50).IsRequired();
                entity.Property(e => e.Cantidad).HasColumnName("cantidad").IsRequired();
                entity.Property(e => e.Precio).HasColumnName("precio").IsRequired();
                entity.Property(e => e.FechaMovimiento).HasColumnName("fecha_movimiento");
                entity.Property(e => e.Motivo).HasColumnName("motivo").HasMaxLength(255).IsRequired();
                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
                entity.Property(e => e.IdCliente).HasColumnName("id_cliente");

                
            });
            
        }
 
 
    }
}
