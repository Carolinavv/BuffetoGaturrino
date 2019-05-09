import { CARTA } from '../../Structure/SListas';
import { IListaCartaFieldsItems } from './IListas';
import '@pnp/polyfill-ie11';
import { sp } from '@pnp/sp';

export class ListaCarta{
  static Strings = CARTA;

  Name: string;
  Items : IListaCartaFieldsItems[];


  public constructor(){
   this.Items = this._LoadContent();
  }   

  private _LoadContent():IListaCartaFieldsItems[] {
    let res: IListaCartaFieldsItems[];
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
          console.log(items);
          res = [{
            Id: 0,
            Titulo: 's',
            Categoria: ['s'],
            Disponibilidad: true,
            Precio: 0
          }];
        });;
        return res;   
  }
}
