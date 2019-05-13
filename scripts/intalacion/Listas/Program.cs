using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using System.Configuration;
using Listas.Claz;

namespace Listas
{
    class Program
    {
        static void Main(string[] args)
        {
            string usrUser   = Properties.Settings.Default.User;
            string usrInPass = Properties.Settings.Default.Pass;
            string usrURL    = Properties.Settings.Default.URL;
            System.Security.SecureString usrPass = new System.Security.SecureString();
            foreach (char chr in usrInPass.ToCharArray()) { usrPass.AppendChar(chr); }

            using (ClientContext ctx = new ClientContext(usrURL))
            {
                ctx.Credentials = new SharePointOnlineCredentials(usrUser, usrPass);
                Web web = ctx.Web;
                ctx.Load(web);
                ctx.ExecuteQuery();

                CrearLista creacion = new CrearLista("Categoria", "categoria", "Almacena los datos de las categorías en los que agrupan los platos.", (int)ListTemplateType.GenericList, ctx);
                creacion.Crear();
                creacion.CambiarDisplay();
                List listaCategoria = creacion.Ref;

                creacion = new CrearLista("Ingredientes", "ingredientes", "Almacena los datos de los ingredientes para las ensaladas.", (int)ListTemplateType.GenericList, ctx);
                creacion.Crear();
                creacion.CambiarDisplay();
                List listaIngredientes = creacion.Ref;

                creacion = new CrearLista("Guarnicion", "guarnicion", "Almacena los datos de las guarniciones que acompañan los platos.", (int)ListTemplateType.GenericList, ctx);
                creacion.Crear();
                creacion.CambiarDisplay();
                List listaGuarnicion = creacion.Ref;

                creacion = new CrearLista("Carta", "carta", "Almacena los datos de los platos establecido en el menú.", (int)ListTemplateType.GenericList, ctx);
                creacion.Crear();
                creacion.CambiarDisplay();
                List listaCarta = creacion.Ref;

                creacion = new CrearLista("Pedidos", "pedidos", "Almacena los datos de los pedidos.", (int)ListTemplateType.GenericList, ctx);
                creacion.Crear();
                creacion.CambiarDisplay();
                List listaPedido = creacion.Ref;

                creacion = new CrearLista("Pedido Detalle", "pedidodetalle", "Almacena el detalle de los pedidos.", (int)ListTemplateType.GenericList, ctx);
                creacion.Crear();
                creacion.CambiarDisplay();
                List listaPedidoDetalle = creacion.Ref;

                //Creacion de Fields
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("-- CREANDO CAMPOS --");
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Responsabilidad de FEDE y CAROs.");
                Console.ForegroundColor = ConsoleColor.Yellow;
                int cntF = 0;


                //Categoría Guarnicion
                Console.WriteLine("  Definiendo Campos de: {0} ", "Categoría");
                listaCategoria.Fields.AddFieldAsXml("<Field ID='{F266F118-3B06-48EE-9DF4-3E3FD0CC94CA}' "
                                                     + " DisplayName='catGuarnicion' "
                                                     + " Name='catGuarnicion' "
                                                     + " Type ='LookupMulti' "
                                                     + " List='{" + listaGuarnicion.Id + "}' "
                                                     + " ShowField='Title' "
                                                     + " Mult='TRUE' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Guarnicion");
                try
                {
                    ctx.ExecuteQuery();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("    - EXISTENTE");
                    Console.ForegroundColor = ConsoleColor.Green;
                }
                Field Campo = listaCategoria.Fields.GetByInternalNameOrTitle("catGuarnicion");
                Campo.Title = "Guarnición";
                Campo.Update();
                cntF++;
                ctx.ExecuteQuery();

                //Ingredientes Disponibilidad --------------------------------------------------------------------------------------------
                Console.WriteLine("  Definiendo Campos de: {0} ", "Ingredientes");
                listaIngredientes.Fields.AddFieldAsXml("<Field ID='{5BF90F4C-E9DA-47AB-8863-19B7B27DBC95}' "
                                                            + " DisplayName='ingDisponibilidad' "
                                                            + " Name='ingDisponibilidad' "
                                                            + " Type='Boolean' "
                                                            + " Required='TRUE'>"
                                                       + " <Default>1</Default>"
                                                    + " </Field>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Disponibilidad");
                listaIngredientes.Update();
                try
                {
                    ctx.ExecuteQuery();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("    - EXISTENTE");
                    Console.ForegroundColor = ConsoleColor.Green;
                }
                Campo = listaIngredientes.Fields.GetByInternalNameOrTitle("ingDisponibilidad");
                Campo.Title = "Disponibilidad";
                Campo.Update();
                cntF++;
                ctx.ExecuteQuery();

                //Guarnicion Disponibilidad --------------------------------------------------------------------------------------------
                Console.WriteLine("  Definiendo Campos de: {0} ", "Guarnición");
                listaGuarnicion.Fields.AddFieldAsXml("<Field ID='{65C95CD6-DE9D-4104-81E6-906DA253ACC6}' "
                                                          + " DisplayName='guaDisponibilidad' "
                                                          + " Name='guaDisponibilidad' "
                                                          + " Type ='Boolean' "
                                                          + " Required='TRUE'>"
                                                      + " <Default>1</Default>"
                                                   + " </Field>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Disponibilidad");
                listaGuarnicion.Update();
                try
                {
                    ctx.ExecuteQuery();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("    -EXISTENTE");
                    Console.ForegroundColor = ConsoleColor.Green;
                }
                Campo = listaGuarnicion.Fields.GetByInternalNameOrTitle("guaDisponibilidad");
                Campo.Title = "Disponibilidad";
                Campo.Update();
                cntF++;
                ctx.ExecuteQuery();

                //Carta Categoria --------------------------------------------------------------------------------------------
                Console.WriteLine("  Definiendo Campos de: {0} ", "Carta");
                listaCarta.Fields.AddFieldAsXml("<Field ID='{553BCE71-1FB0-441A-9A25-CED4EAA24C47}' "
                                                     + " DisplayName='carCategoria' "
                                                     + " Name='carCategoria' "
                                                     + " Type='Lookup' "
                                                     + " List='{" + listaCategoria.Id + "}' "
                                                     + " ShowField='Title' "
                                                     + " Indexed='TRUE' "
                                                     + " Required='TRUE' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Categoria");
                //Carta Disponibilidad
                listaCarta.Fields.AddFieldAsXml("<Field ID='{7696EE45-CBF1-4541-88B7-BB8B0EAC52DD}' "
                                                          + " DisplayName='carDisponibilidad' "
                                                          + " Name='carDisponibilidad' "
                                                          + " Type ='Boolean' "
                                                          + " Required='TRUE'>"
                                                      + " <Default>1</Default>"
                                                   + " </Field>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Disponibilidad");
                //Carta Precio
                listaCarta.Fields.AddFieldAsXml("<Field ID='{891E690D-94EF-416F-BE34-B6D21D145BB4}' "
                                                          + " DisplayName='carPrecio' "
                                                          + " Name='carPrecio' "
                                                          + " Type ='Currency' "
                                                          + " LCID= '11274'"
                                                          + " Min= '0' "
                                                          + " Required='TRUE'/>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Precio");
                //Carta Descuento 
                listaCarta.Fields.AddFieldAsXml("<Field ID='{ED828D92-0444-457B-A4E5-0652BBC7AB6B}' "
                                                          + " DisplayName='carDescuento' "
                                                          + " Name='carDescuento' "
                                                          + " Type ='Number' "
                                                          + " Min= '0' "
                                                          + " Percentage='TRUE'"
                                                          + " Required='TRUE'>"
                                                      + " <Default>0</Default>"
                                                   + " </Field>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Descuento");
                //Carta Total
                listaCarta.Fields.AddFieldAsXml("<Field ID='{428F1064-C8AA-491F-AEE3-B3FD6146B9DA}'"
                                                          + " DisplayName='carTotal' "
                                                          + " Name='carTotal' "
                                                          + " Type ='Calculated' "
                                                          + " LCID= '11274'"
                                                          + " Min= '0' "
                                                          + " Required='TRUE' "
                                                          + " ResultType='Currency' >"
                                                          + "<Formula> =[carDescuento]*[carPrecio]</Formula>"
                                                          + "<FieldRefs>"
                                                            + "<FieldRef Name='carPrecio' />"
                                                            + "<FieldRef Name='carDescuento' />"
                                                          + "</FieldRefs>"
                                                          + " </Field>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Total");
                listaCarta.Update();
                try
                {
                    ctx.ExecuteQuery();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("    -EXISTENTE");
                    Console.ForegroundColor = ConsoleColor.Green;
                }
                Field[] CamposCarta = new Field[5];
                CamposCarta[0] = listaCarta.Fields.GetByInternalNameOrTitle("carCategoria");
                CamposCarta[0].Title = "Categoría";
                CamposCarta[1] = listaCarta.Fields.GetByInternalNameOrTitle("carDisponibilidad");
                CamposCarta[1].Title = "Disponibilidad";
                CamposCarta[2] = listaCarta.Fields.GetByInternalNameOrTitle("carPrecio");
                CamposCarta[2].Title = "Precio";
                CamposCarta[3] = listaCarta.Fields.GetByInternalNameOrTitle("carDescuento");
                CamposCarta[3].Title = "Descuento";
                CamposCarta[4] = listaCarta.Fields.GetByInternalNameOrTitle("carTotal");
                CamposCarta[4].Title = "Total";
                foreach (Field c in CamposCarta)
                {
                    c.Update();
                    cntF++;
                }
                ctx.ExecuteQuery();
                //Pedidos Observaciones --------------------------------------------------------------------------------------------
                Console.WriteLine("  Definiendo Campos de: {0} ", "Pedidos");
                listaPedido.Fields.AddFieldAsXml("<Field DisplayName='pedObsevaciones' "
                                                     + " ID='{A80C1348-14CE-4441-8259-E5D4E18DC93A}' "
                                                     + " Name='pedObsevaciones' "
                                                     + " Type ='Note' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Observaciones");
                //Pedidos Estado
                listaPedido.Fields.AddFieldAsXml("<Field DisplayName='pedEstado' "
                                                     + " ID='{72B7F7D5-253A-4957-A6BE-14DFC6ABA116}' "
                                                          + " Name='pedEstado' "
                                                          + " Type ='Choice' >"
                                                      + " <CHOICES>"
                                                      + "<CHOICE>Pendiente</CHOICE>"
                                                      + "<CHOICE>Cancelado</CHOICE>"
                                                      + "<CHOICE>Listo</CHOICE>"
                                                      + "<CHOICE>Finalizado</CHOICE>"
                                                      + " </CHOICES>"
                                                      + " <Default>Pendiente</Default>"
                                                   + " </Field>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Estado");
                //Pedidos Ubicación 
                listaPedido.Fields.AddFieldAsXml("<Field DisplayName='pedUbicacion' "
                                                      + " ID='{81C5AFE3-5D85-4E85-8E76-62C3D612D610}' "
                                                          + " Name='pedUbicacion' "
                                                          + " Type ='Text' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Ubicación");
                //Pedidos SubTotal 
                listaPedido.Fields.AddFieldAsXml("<Field DisplayName='pedSubTotal' "
                                                          + " ID='{F9883EA5-03FC-460A-8A61-7FAD0219BF08}' "
                                                          + " Name='pedSubTotal' "
                                                          + " Type ='Currency' "
                                                          + " LCID= '11274'"
                                                          + " Min= '0' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "SubTotal");
                //Pedidos Historial Estado
                listaPedido.Fields.AddFieldAsXml("<Field DisplayName='pedHistorialEstado' "
                                                          + " ID='{B4A1021F-6256-4F06-86EC-C0ED1EB38B04}' "
                                                          + " Name='pedHistorialEstado' "
                                                          + " Type ='Note' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Historial Estado");
                //Pedido Horario
                listaPedido.Fields.AddFieldAsXml("<Field DisplayName='pedHorario' "
                                                     + " ID='{A2782181-6653-49A3-B756-7A39608A5AFF}' "
                                                     + " Name='pedHorario' "
                                                     + " Type ='DateTime' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Horario");
                //Pedido Bonificaciones 
                listaPedido.Fields.AddFieldAsXml("<Field DisplayName='pedBonificaciones' "
                                                     + " ID='{B652D0D1-D682-4AD5-9239-CFA7203DA4B5}' "
                                                     + " Name='pedBonificaciones' "
                                                     + " Type ='Currency' "
                                                     + " LCID= '11274'"
                                                     + " Min= '0' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Bonificaciones");
                //Pedido Total 
                listaPedido.Fields.AddFieldAsXml("<Field DisplayName='pedTotal' "
                                                     + " ID='{2067DC44-00C2-433D-945D-E01C01DFD808}' "
                                                     + " Name='pedTotal' "
                                                     + " Type ='Currency' "
                                                     + " LCID= '11274'"
                                                     + " Min= '0' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Total");
                listaPedido.Update();
                try
                {
                    ctx.ExecuteQuery();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("    -EXISTENTE");
                    Console.ForegroundColor = ConsoleColor.Green;
                }
                Field[] CamposPedido = new Field[8];
                CamposPedido[0] = listaPedido.Fields.GetByInternalNameOrTitle("pedObservaciones");
                CamposPedido[0].Title = "Observaciones";
                CamposPedido[1] = listaPedido.Fields.GetByInternalNameOrTitle("pedEstado");
                CamposPedido[1].Title = "Estado";
                CamposPedido[2] = listaPedido.Fields.GetByInternalNameOrTitle("pedUbicacion");
                CamposPedido[2].Title = "Ubicación";
                CamposPedido[3] = listaPedido.Fields.GetByInternalNameOrTitle("pedSubTotal");
                CamposPedido[3].Title = "SubTotal";
                CamposPedido[4] = listaPedido.Fields.GetByInternalNameOrTitle("pedHistorialEstado");
                CamposPedido[4].Title = "Historial Estado";
                CamposPedido[5] = listaPedido.Fields.GetByInternalNameOrTitle("pedHorario");
                CamposPedido[5].Title = "Horario";
                CamposPedido[6] = listaPedido.Fields.GetByInternalNameOrTitle("pedBonificaciones");
                CamposPedido[6].Title = "Bonificaciones";
                CamposPedido[7] = listaPedido.Fields.GetByInternalNameOrTitle("pedTotal");
                CamposPedido[7].Title = "Total";
                foreach (Field c in CamposPedido)
                {
                    c.Update();
                    cntF++;
                }
                ctx.ExecuteQuery();
                //Pedido Detalle --------------------------------------------------------------------------------------------
                Console.WriteLine("  Definiendo Campos de: {0} ", "Pedido Detalle");
                //Pedido Detalle cubiertos
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtCubiertos' "
                                                     + " ID='{0102837A-CB07-4C4F-9106-669C5BF92D79}' "
                                                     + " Name='peddtCubiertos' "
                                                     + " Type ='Boolean' >"
                                                      + " <Default>1</Default>"
                                                   + " </Field>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Cubiertos");
                
                //Pedido Detalle aderezos
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtAderezos' "
                                                          + " ID='{CC120D44-8FF3-495A-9D13-208EDC5571B7}' "
                                                          + " Name='peddtAderezos' "
                                                          + " Type ='Choice' >"
                                                      + " <CHOICES>"
                                                      + "<CHOICE>Ninguno</CHOICE>"
                                                      + "<CHOICE>Mayonesa</CHOICE>"
                                                      + "<CHOICE>Ketechup</CHOICE>"
                                                      + "<CHOICE>Mostaza</CHOICE>"
                                                      + "<CHOICE>Sal</CHOICE>"
                                                      + "<CHOICE>Queso</CHOICE>"
                                                      + " </CHOICES>"
                                                      + " <Default>Ninguno</Default>"
                                                   + " </Field>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Aderezos");
                listaPedidoDetalle.Update();
                //Pedido Detalle cantidad
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtCantidad' "
                                                          + " ID='{AFD709FC-AF19-4EB1-A6A6-FD3F6E2B217A}' "
                                                          + " Name='peddtCantidad' "
                                                          + " Type ='Number'"
                                                          + " Min= '1' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Cantidad");
                
                //Pedido Detalle pan
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtPan' "
                                                          + " ID='{B16E25DB-0134-4ECD-A09C-1DC02CA0A56B}' "
                                                          + " Name='peddtPan' "
                                                          + " Type ='Boolean' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Pan");
                listaPedidoDetalle.Update();
                //Pedido Detalle Observaciones
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtObservaciones' "
                                                          + " ID='{9C446E32-69B3-4B8F-AD53-1E1A2648BC5C}' "
                                                          + " Name='peddtObservaciones' "
                                                          + " Type ='Note' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Observaciones");
                listaPedidoDetalle.Update();
                //Pedido Detalle usuario
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtUsuario' "
                                                     + " ID='{377B04EB-46F5-4A47-ABD8-C61EDD7169E4}' "
                                                     + " Name='peddtUsuario' "
                                                     + " Type ='User' "
                                                     + " Required='TRUE' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Usuario");
                listaPedidoDetalle.Update();
                //Pedido Detalle Id Pedido
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtIDPedido' "
                                                     + " ID='{F46E68EA-5F70-4023-9757-602DA9183652}' "
                                                     + " Name='peddtIDPedido' "
                                                     + " Type ='Number' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Id Pedido");
                listaPedidoDetalle.Update();
                //Pedido Detalle ID Guarnicion
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtIDGuarnicion' "
                                                     + " ID='{E7CCE4F2-099F-4E71-BDD1-3704A804D29D}' "
                                                     + " Name='peddtIDGuarnicion' "
                                                     + " Type ='Number' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Id Guarnicion");
                listaPedidoDetalle.Update();
                //Pedido Detalle  ID carta
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtIDCarta' "
                                                    + " ID='{CE032EC2-8E07-4353-9CBE-7D5B3E12E42A}' "
                                                    + " Name='peddtIDCarta' "
                                                    + " Type ='Number' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Id Carta");
                listaPedidoDetalle.Update();
                //Pedido Detalle Tipo Guarnicion 
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtTituloGuarnicion' "
                                                     + " ID='{DEC90067-9289-4A9D-9D21-75E497974FEE}' "
                                                     + " Name='peddtTituloGuarnicion' "
                                                     + " Type ='Text' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Tipo Guarnicion");
                listaPedidoDetalle.Update();
                //Pedido Detalle SubTotal
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtSubTotal' "
                                                     + " ID='{5CB1ED9A-720B-4B74-AF3D-7B1D0FC7F999}' "
                                                     + " Name='peddtSubTotal' "
                                                     + " Type ='Currency' "
                                                     + " LCID= '11274'"
                                                     + " Min= '0' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Sub Total");
                
                //Pedido Detalle Bonificaciones
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtBonificaciones' "
                                                     + " ID='{F062E586-B859-4332-8B2F-9C4ECF2343DE}' "
                                                     + " Name='peddtTituloGuarnicion' "
                                                     + " Type ='Currency' "
                                                     + " LCID= '11274'/>", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Bonificaciones");
                listaPedidoDetalle.Update();
                //Pedido Detalle Total
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtTotal' "
                                                     + " ID='{A4A86576-1732-4DB9-9A02-45610E527A02}' "
                                                     + " Name='peddtTituloGuarnicion' "
                                                     + " Type ='Currency' "
                                                     + " LCID= '11274'"
                                                     + " Min= '0' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Total ");
                listaPedidoDetalle.Update();
                //Pedido Detalle Ingredientes
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtIngredientes' "
                                                     + " ID='{E981CE78-9608-43CA-AB9C-93F6FFAC7100}' "
                                                     + " Name='peddtIngredidentes' "
                                                     + " Type ='Note' />", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Ingredientes");
                listaPedidoDetalle.Update();
                ////Pedido Detalle Categoria ERROR
                listaPedidoDetalle.Fields.AddFieldAsXml("<Field DisplayName='peddtCategoria' "
                                                     + " ID='{2C9F202A-3934-48B4-9230-CAD91D9122C1}' "
                                                     + " Name='peddtCategoria' "
                                                     + " Type ='Text'/> ", true, AddFieldOptions.DefaultValue);
                Console.WriteLine("    -{0} ", "Categoria ");
                listaPedidoDetalle.Update();
                try
                {
                    ctx.ExecuteQuery();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("    - EXISTENTE");
                    Console.ForegroundColor = ConsoleColor.Green;
                }
                Field[] CamposPedidoD = new Field[15];
                CamposPedidoD[0] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtCubiertos");
                CamposPedidoD[0].Title = "Cubiertos";
                CamposPedidoD[1] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtAderezos");
                CamposPedidoD[1].Title = "Aderezos";
                CamposPedidoD[2] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtCantidad");
                CamposPedidoD[2].Title = "Cantidad";
                CamposPedidoD[3] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtPan");
                CamposPedidoD[3].Title = "Pan";
                CamposPedidoD[4] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtObservaciones");
                CamposPedidoD[4].Title = "Observaciones";

                CamposPedidoD[5] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtUsuario");
                CamposPedidoD[5].Title = "Usuario";
                CamposPedidoD[6] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtIDPedido");
                CamposPedidoD[6].Title = "ID Pedido";
                CamposPedidoD[7] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtIDGuarnicion");
                CamposPedidoD[7].Title = "ID Guarnición";
                CamposPedidoD[8] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtIDCarta");
                CamposPedidoD[8].Title = "ID Carta";
                CamposPedidoD[9] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtTituloGuarnicion");
                CamposPedidoD[9].Title = "Titulo Guarnición";

                CamposPedidoD[10] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtSubTotal");
                CamposPedidoD[10].Title = "SubTotal";
                CamposPedidoD[11] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtBonificaciones");
                CamposPedidoD[11].Title = "Bonificaciones";
                CamposPedidoD[12] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtTotal");
                CamposPedidoD[12].Title = "Total";
                CamposPedidoD[13] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtIngredientes");
                CamposPedidoD[13].Title = "Ingredientes";
                CamposPedidoD[14] = listaPedidoDetalle.Fields.GetByInternalNameOrTitle("peddtCategoria");
                CamposPedidoD[14].Title = "Categoría";
                foreach (Field c in CamposPedidoD)
                {
                    c.Update();
                    cntF++;
                }
                ctx.ExecuteQuery();

                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("------- FIELDS CREADAS --------");
                Console.WriteLine("Cantidad de Fields configurados: " + cntF);
                Console.ResetColor();

                CrearPermisos PermisBuffet = new CrearPermisos("Buffet", "Buffet", usrUser, ctx);
                PermisBuffet.CrearGrupo();
                CrearPermisos PermisIntegrantes = new CrearPermisos("Integrantes", "Integrantes", usrUser, ctx);
                PermisIntegrantes.CrearGrupo();
                CrearPermisos PermisEmpresa = new CrearPermisos("Empresa", "Empresa", usrUser, ctx);
                PermisEmpresa.CrearGrupo();

                CrearPermisos.CrearNivel(ctx);
                CrearPermisos.AsignarPermis(ctx);
                CrearPermisoLista.AsignarPermiso(ctx);
                ActivarFeature.Activar(ctx);
            }
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("\n ###### FIN ###### ");
       Console.WriteLine("\n         .-o=o-.");
       Console.WriteLine("       ,  /=o=o=o=\\ .--.");
       Console.WriteLine("      _|\\|=o=O=o=O=|    \\");
       Console.WriteLine("  __.'  a`\\=o=o=o=(`\\   /");
       Console.WriteLine("  '.   a 4/`|.-\"\"'`\\ \\ ;'`)   .---.");
       Console.WriteLine("    \\   .'  /   .--'  |_.'   / .-._)");
       Console.WriteLine("     `)  _.'   /     /`-.__.' /");
       Console.WriteLine("     `'-.____;     /'-.___.-'");
       Console.WriteLine("             `\"\"\"`')");
            Console.BackgroundColor = ConsoleColor.Green;
            Console.ReadKey();
        }
    }
}


