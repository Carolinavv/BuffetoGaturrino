using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace Listas.Claz
{
    class CrearPermisoLista
    {
        private ClientContext Ctx { get; set; }

        public static void AsignarPermiso(ClientContext c)
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("Asignando Permisos a Pedido.");
            List pedidos = c.Web.Lists.GetByTitle("Pedidos");
            RoleDefinitionBindingCollection integrantesPedidos = new RoleDefinitionBindingCollection(c);
            RoleDefinition colaborarSinEliminar = c.Web.RoleDefinitions.GetByName("Colaborar sin eliminar");
            Group integrantes = c.Web.SiteGroups.GetByName("Integrantes"); ///////////////////////////////////////////////
            integrantesPedidos.Add(colaborarSinEliminar);
            pedidos.BreakRoleInheritance(false, false);
            c.Load(pedidos.RoleAssignments.Add(integrantes, integrantesPedidos));
            pedidos.Update();
            c.ExecuteQuery();
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("    Asiganado");

            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("Asignando Permisos a Pedido Detalle.");
            List pedidosDetalles = c.Web.Lists.GetByTitle("Pedido Detalle");
            RoleDefinitionBindingCollection integrantesPedidosD = new RoleDefinitionBindingCollection(c);
            integrantesPedidos.Add(colaborarSinEliminar);
            pedidosDetalles.BreakRoleInheritance(false, false);
            c.Load(pedidosDetalles.RoleAssignments.Add(integrantes, integrantesPedidos));
            pedidosDetalles.Update();
            c.ExecuteQuery();
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("    Asiganado");
        }
    }
}
