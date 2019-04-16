using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace Listas.Claz
{
    class ActivarFeature
    {
        public static void Activar(ClientContext c){
            try
            {
                var featureId = new Guid("94c94ca6-b32f-4da9-a9e3-1f3d343d7ecb");
                var features = c.Web.Features;
                features.Add(featureId, true, FeatureDefinitionScope.None);
                c.ExecuteQuery();
                Console.ResetColor();
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.WriteLine("Feature Activada");
                Console.ResetColor();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Data);
            }
        }
    }
}
