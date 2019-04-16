using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace Listas.Claz
{
    class CrearLista
    {
        public string DisplayName { get; set; }
        public string InternalName { get; set; }
        public string Descripcion { get; set; }
        public ClientContext Ctx { get; set; }
        public int Type { get; set; }
        public List Ref { get; set; }

        public CrearLista() { }
        public CrearLista(string dName, string iName, string desc, int type, ClientContext c)
        {
            DisplayName = dName;
            InternalName = iName;
            Descripcion = desc;
            Type = type;
            Ctx = c;
        }

        public void Crear() {
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Creando Lista: " + DisplayName);
            if (this.ListExist()) {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("    La lista ya existe");
                Console.ResetColor();
                return;
            }
            try
            {
                ListCreationInformation information = new ListCreationInformation();
                information.Title = InternalName;
                information.Description = Descripcion;
                information.TemplateType = Type;
                Ref = Ctx.Web.Lists.Add(information);
                Ref.Update();
                Ctx.Load(Ref);
                Ctx.ExecuteQuery();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("    Lista Creada " + DisplayName);
                Console.ResetColor();
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("    -Error al crear lista" + DisplayName);
                Console.ResetColor();
            }
        }

        public void CambiarDisplay(string intN = null) {
            if (!String.IsNullOrEmpty(intN)) { InternalName = intN; }
            try
            {
                Ref.Title = DisplayName;
                Ref.Update();

                Ctx.ExecuteQuery();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("    Display cambiado de " + InternalName + " a " + DisplayName);
                Console.ResetColor();
            }
            catch (Exception ex) {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("    -Error al actualizar lista" + DisplayName);
                Console.ResetColor();
            }
        }

        public bool ListExist() {
            try{
                Ref = Ctx.Web.Lists.GetByTitle(DisplayName);
                Ctx.Load(Ref);
                Ctx.ExecuteQuery();
            }catch(Exception ex){
                return false;
            }
            return true;
        }
    }
}
