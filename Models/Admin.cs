namespace AplicativoWebMVC.Models
{
  public class Admin
  {
    public int IdAdmin {get; set;}
    public required int IdUsuario {get; set;}
    public int NivelAcesso {get; set;} 
  }
}