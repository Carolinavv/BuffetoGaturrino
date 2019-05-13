import { CARTA, GUARNICION, INGREDIENTES } from "../../../structure/SPListas";
import { ListCategoria, ListPedDetalle, ListCarta } from "../ListSchemas";
import "@pnp/polyfill-ie11";
import { sp } from "@pnp/sp";

export class importListaCarta {
    
    public static listaCarta = CARTA;

    public Name: string;
    public Items: ListCarta[];
    public ItemsCount: number;

    public constructor() {
        this.Name = 'carta';
    }

    public async updateItems() {
        this.Items = await sp.web.lists.getByTitle(importListaCarta.listaCarta.Props.Title).items.select(importListaCarta.listaCarta.Fields.Id,
            importListaCarta.listaCarta.Fields.Titulo,
            importListaCarta.listaCarta.Fields.Categoria.Lookup + '/' +
            importListaCarta.listaCarta.Fields.Categoria.Fields[0].Title,
            importListaCarta.listaCarta.Fields.Disponibilidad,
            importListaCarta.listaCarta.Fields.Precio,
            importListaCarta.listaCarta.Fields.Descuento)
            .expand(importListaCarta.listaCarta.Fields.Categoria.Lookup)
            .orderBy("Modified", true)
            .get()
            .then((items: any[]) => {
                return items.map((item) => {
                    return {
                        ID: item.Id,
                        Titulo: item.Title,
                        Categoria: item.carCategoria.Title,
                        Disponibilidad: item.carDisponibilidad,
                        Precio: item.carPrecio,
                        Descuento: item.carDescuento
                    };
                });
            });
        this.ItemsCount = this.Items.length;
        console.log(this.Items.length + ' Items cargados.');
    }

}