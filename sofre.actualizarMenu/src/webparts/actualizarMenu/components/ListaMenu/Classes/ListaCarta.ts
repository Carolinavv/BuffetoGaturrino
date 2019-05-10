import { CARTA } from '../../../Structure/SListas';
import IListaMenuItem from '../IListaMenuItem';
import '@pnp/polyfill-ie11';
import { sp } from '@pnp/sp';

export class ListaCarta{
  public static Strings = CARTA;

  public Name: string;
  public Items: IListaMenuItem[];
  public ItemsCount: number;
  // static get ItemsCount() {
  //     return (async () => await this.up())();
  // }

  public constructor(){
    this.Name = 'carta';
  }   

  public async updateItems() {
    this.Items = await sp.web
      .lists
      .getByTitle(ListaCarta.Strings.Props.Title)
        .items
        .select(ListaCarta.Strings.Fields.Id,
                ListaCarta.Strings.Fields.Titulo,
                ListaCarta.Strings.Fields.Categoria.Lookup + '/' +
                ListaCarta.Strings.Fields.Categoria.Fields[0].Title,
                ListaCarta.Strings.Fields.Disponibilidad,
                ListaCarta.Strings.Fields.Precio)
        .expand(ListaCarta.Strings.Fields.Categoria.Lookup)
        .orderBy("Modified", true)
        .get()
        .then((items: any[])=>{
          return items.map((item)=>{
            return {
              ID:             item.Id,
              Titulo:         item.Title,
              Categoria:      item.carCategoria.Title,
              Disponibilidad: item.carDisponibilidad,
              Precio:         item.carPrecio
            };
          });
        });
        this.ItemsCount = this.Items.length;
        console.log(this.Items.length + ' Items cargados.');
  }
}