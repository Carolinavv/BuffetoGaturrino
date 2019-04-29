using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace Listas.Claz
{
    class CrearPermisos
    {
        private ClientContext Ctx { get; set; }
        private string User { get; set; }
        private string Title { get; set; }
        private string Desc { get; set; }

        public CrearPermisos(string title, string desc, string user, ClientContext c)
        {
            Ctx = c;
            Title = title;
            Desc = desc;
            User = user;
        }

        public void CrearGrupo()
        {
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine("    Grupo: " + Title);
                try
                {
                    GroupCreationInformation Grupo = new GroupCreationInformation();
                    Grupo.Title = Title;
                    Grupo.Description = Desc;
                    User EmpresaOwner = Ctx.Web.EnsureUser(User);
                    User EmpresaMember = Ctx.Web.EnsureUser(User);
                    Group Empresa = Ctx.Web.SiteGroups.Add(Grupo);
                    Empresa.Owner = EmpresaOwner;
                    Empresa.Users.AddUser(EmpresaMember);
                    Empresa.Update();
                    Ctx.ExecuteQuery();
                }
                catch (Exception ex) {
                    Console.ForegroundColor = ConsoleColor.Magenta;
                    Console.WriteLine("    Grupo Existentes");
                    Console.ResetColor();
                }
        }

        public static void CrearNivel(ClientContext c) {
            //try
            //{
            c.Load(
              c.Web,
               website => website.Title,
               website => website.HasUniqueRoleAssignments);

            c.ExecuteQuery();
            Console.WriteLine("Creando nivel de permiso");
            if (!c.Web.HasUniqueRoleAssignments)
            {
                c.Web.BreakRoleInheritance(false, true);
                c.ExecuteQuery();
            }
            BasePermissions permisoBuffet = new BasePermissions();
            permisoBuffet.Set(PermissionKind.EmptyMask);
            permisoBuffet.Set(PermissionKind.AddListItems);
            permisoBuffet.Set(PermissionKind.EditListItems);
            permisoBuffet.Set(PermissionKind.ViewListItems);
            permisoBuffet.Set(PermissionKind.ViewVersions);
            permisoBuffet.Set(PermissionKind.DeleteVersions);
            permisoBuffet.Set(PermissionKind.CreateAlerts);
            permisoBuffet.Set(PermissionKind.ViewFormPages);
            permisoBuffet.Set(PermissionKind.OpenItems);
            permisoBuffet.Set(PermissionKind.BrowseDirectories);
            permisoBuffet.Set(PermissionKind.ViewPages);
            permisoBuffet.Set(PermissionKind.UseRemoteAPIs);
            permisoBuffet.Set(PermissionKind.BrowseUserInfo);
            permisoBuffet.Set(PermissionKind.UseClientIntegration);
            permisoBuffet.Set(PermissionKind.Open);
            permisoBuffet.Set(PermissionKind.EditMyUserInfo);
            permisoBuffet.Set(PermissionKind.ManagePersonalViews);
            permisoBuffet.Set(PermissionKind.AddDelPrivateWebParts);
            permisoBuffet.Set(PermissionKind.UpdatePersonalWebParts);
            permisoBuffet.Set(PermissionKind.CreateSSCSite);
            permisoBuffet.Set(PermissionKind.CreateAlerts);

            RoleDefinitionCreationInformation creationInfo = new RoleDefinitionCreationInformation();
            creationInfo.BasePermissions = permisoBuffet;
            creationInfo.Description = "Colaborar sin eliminar";
            creationInfo.Name = "Colaborar sin eliminar";
            creationInfo.Order = 0;
            RoleDefinition rd = c.Web.RoleDefinitions.Add(creationInfo);
            c.ExecuteQuery();
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("--- NIVEL DE PERMISO CREADO --");
            Console.ResetColor();
            //}
            //catch (Exception ex)
            //{
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("--- ERROR AL CREAR EL NIVEL DE PERMISO --");
                Console.ResetColor();
            //}
            c.ExecuteQuery();
        }

        public static void AsignarPermis(ClientContext c) {
            try
            {
                Principal buffet = c.Web.SiteGroups.GetByName("Buffet");
                RoleDefinition buffetPermiso = c.Web.RoleDefinitions.GetByName("Colaborar");
                RoleDefinitionBindingCollection coleccionBPermisos = new RoleDefinitionBindingCollection(c);
                coleccionBPermisos.Add(buffetPermiso);
                RoleAssignment buffetRoleAssigment = c.Web.RoleAssignments.Add(buffet, coleccionBPermisos);

                Principal integrantes = c.Web.SiteGroups.GetByName("Integrantes");
                RoleDefinition integrantesPermiso = c.Web.RoleDefinitions.GetByName("Leer");
                RoleDefinitionBindingCollection coleccionIPermisos = new RoleDefinitionBindingCollection(c);
                coleccionIPermisos.Add(integrantesPermiso);
                RoleAssignment integrantesRoleAssigment = c.Web.RoleAssignments.Add(integrantes, coleccionIPermisos);
                c.ExecuteQuery();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("--- PERMISOS ASIGNADOS ---");
                Console.ResetColor();
            }
            catch (Exception ex) {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("--- ERROR AL ASIGNAR PERMISOS A LOS GRUPOS ---");
                Console.ResetColor();
            }
        }
    }
}
