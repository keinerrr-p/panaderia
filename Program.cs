using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;

var builder = WebApplication.CreateBuilder(args);

// ---------------------------------------------
// 1. Agregar conexión a MySQL (Pomelo)
// ---------------------------------------------
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddHttpContextAccessor();



builder.Services.AddDbContext<PanaderiaContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true; // opcional para que se vea bonito
    });


// ---------------------------------------------
// 2. Activar MVC (Controladores + Vistas)
// ---------------------------------------------
builder.Services.AddControllersWithViews();

var app = builder.Build();

// ---------------------------------------------
// 3. Configuración de entorno
// ---------------------------------------------
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
    app.UseHttpsRedirection();
}
// ---------------------------------------------
// 4. Archivos estáticos (wwwroot)
// ---------------------------------------------
app.UseStaticFiles();

// ---------------------------------------------
// 5. Routing y autorización
// ---------------------------------------------
app.UseRouting();
app.UseSession();
app.UseAuthorization();
// ---------------------------------------------
// 6. Ruta por defecto 
// ---------------------------------------------
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=AdminMvc}/{action=Index}/{id?}"
);

// ---------------------------------------------
// Ejecutar app
// ---------------------------------------------
app.Run();
