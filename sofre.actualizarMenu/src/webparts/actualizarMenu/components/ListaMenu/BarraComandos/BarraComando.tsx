import * as React from 'react';
import '@pnp/polyfill-ie11';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import style from './BarraComando.module.scss';
import PanelDerechoCarta from './PanelDerecho/PanelDerechoCarta'
import PanelDerechoCategorias from './PanelDerecho/PanelDerechoCategorias';
import PanelDerechoGuarnicion from './PanelDerecho/PanelDerechoGuarnicion';
import PanelDerechoIngredientes from './PanelDerecho/PanelDerechoIngredientes';
import { PanelFlags } from './PanelFlags';

export interface IBarraComandosProps {
  onNewItem: Function;
}
export interface IBarraComandosStates {
  CartaPanel:        PanelFlags;
  GuarnicionPanel:   PanelFlags;
  IngredientesPanel: PanelFlags;
  CategoriasPanel:   PanelFlags;
}

export default class BarraComandos extends React.Component<IBarraComandosProps, IBarraComandosStates> {
  constructor(props){
    super(props);
    this.state = { 
      CartaPanel:        {open: false, new: true},
      GuarnicionPanel:   {open: false, new: true},
      IngredientesPanel: {open: false, new: true},
      CategoriasPanel:   {open: false, new: true}
     }

     this.closePanelCarta         = this.closePanelCarta.bind(this);
     this.closePanelCategorias    = this.closePanelCategorias.bind(this);
     this.closePanelGuarnicion    = this.closePanelGuarnicion.bind(this);
     this.closePanelIngredientes  = this.closePanelIngredientes.bind(this);
  }
  
  public render(): JSX.Element {
    return (
      <div>

      {this.state.CartaPanel.open         && <PanelDerechoCarta         onClose={this.closePanelCarta}        />}
      {this.state.GuarnicionPanel.open    && <PanelDerechoGuarnicion    onClose={this.closePanelGuarnicion}   />}
      {this.state.IngredientesPanel.open  && <PanelDerechoIngredientes  onClose={this.closePanelIngredientes} />}
      {this.state.CategoriasPanel.open    && <PanelDerechoCategorias    onClose={this.closePanelCategorias}   />}
      

        <CommandBar
          items={this._items}
          farItems={this._farItems}
          className={style.commandbar}
        />
      </div>
      
    );
  }

  private _items = [
    {
      key: 'nuevo',
      name: 'Nuevo',
      cacheKey: 'myCacheKey',
      iconProps: {
        iconName: 'Add'
      },
      ariaLabel: 'New',
      subMenuProps: {
        items: [
          {
            key: 'carta',
            name: 'Carta',
            onClick: ()=> this.newItemCarta(),
            iconProps: {
              iconName: 'EatDrink'
            }
          },
          {
            key: 'ingredientes',
            name: 'Ingredientes',
            onClick: ()=> this.newItemIngredientes(),
            iconProps: {
              iconName: 'Brunch'
            }
          },
          {
            key: 'guarnicion',
            name: 'Guarnición',
            onClick: ()=> this.newItemGuarnicion(),
            iconProps: {
              iconName: 'Breakfast'
            }
          },
          {
            key: 'categorias',
            name: 'Categorías',
            onClick: ()=> this.newItemCategorias(),
            iconProps: {
              iconName: 'Tag'
            }
          }
        ]
      }
    },
    {
      key: "modificar",
      name: "Modificar",
      iconProps: { iconName: "Edit" },
    },
    {
      key: "borrar",
      name: "Borrar",
      iconProps: { iconName: "Delete" },
    },
  ];

  private _farItems = [
    {
      key: "search",
      onRender: () => <SearchBox placeholder="Search" className={style.searchBox} underlined={true}
      />
    },
    {
      key: "michi",
      iconProps: { iconName: "Cat" },
    },
  ];

  private newItemCarta() {
    this.setState({
      CartaPanel: {open: true, new: true}
    });
  }

  public closePanelCarta(){
    this.setState({
      CartaPanel: {open: false, new: true}
    });
  }

  private newItemGuarnicion() {
    this.setState({
      GuarnicionPanel: {open: true, new: true}
    });
  }

  public closePanelGuarnicion(){
    this.setState({
      GuarnicionPanel: {open: false, new: true}
    });
  }

  private newItemCategorias() {
    this.setState({
      CategoriasPanel: {open: true, new: true}
    });
  }

  public closePanelCategorias(){
    this.setState({
      CategoriasPanel: {open: false, new: true}
    });
  }

  private newItemIngredientes() {
    this.setState({
      IngredientesPanel: {open: true, new: true}
    });
  }

  public closePanelIngredientes(){
    this.setState({
      IngredientesPanel: {open: false, new: true}
    });
  }

}