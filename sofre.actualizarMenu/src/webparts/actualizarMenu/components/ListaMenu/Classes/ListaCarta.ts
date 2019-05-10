import { CARTA } from '../../../Structure/SListas';
import IListaMenuItem from '../IListaMenuItem';
import '@pnp/polyfill-ie11';
import { sp } from '@pnp/sp';

export class ListaCarta{
  static Strings = CARTA;

  Name: string;
  Items : IListaMenuItem[];

  public constructor(){
    this.Name = 'carta';
    this.getFields();
  }   

  public getFields() {
    sp.web
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
          this.Items = items.map((item)=>{
            return {
              ID:             item.Id,
              Titulo:         item.Title,
              Categoria:      item.carCategoria.Title,
              Disponibilidad: item.carDisponibilidad,
              Precio:         item.carPrecio
            };
          })
          console.log(this.Items.length + ' Items cargados.');
        });;
  }
}
