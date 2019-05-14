import * as React from 'react';
import '@pnp/polyfill-ie11';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import style from './BarraComando.module.scss';
import PanelDerechoCarta from './PanelDerecho/PanelDerechoCarta'
import PanelDerechoCategorias from './PanelDerecho/PanelDerechoCategorias';
import PanelDerechoGuarnicion from './PanelDerecho/PanelDerechoGuarnicion';
import PanelDerechoIngredientes from './PanelDerecho/PanelDerechoIngredientes';

export interface IBarraComandosProps {
  onNewItem: Function;
}
export interface IBarraComandosStates {
  showNewItemCartaPanel: boolean;
  showNewItemGuarnicionPanel: boolean;
  showNewItemIngredientesPanel: boolean;
  showNewItemCategoriasPanel: boolean;
}

export default class BarraComandos extends React.Component<IBarraComandosProps, IBarraComandosStates> {
  constructor(props){
    super(props);
    this.state = { 
      showNewItemCartaPanel: false,
      showNewItemGuarnicionPanel: false,
      showNewItemIngredientesPanel: false,
      showNewItemCategoriasPanel: false
     }
  }
  
  public render(): JSX.Element {
    return (
      <div>

      {this.state.showNewItemCartaPanel && <PanelDerechoCarta onClose={this.closePanelCarta} />}
      {this.state.showNewItemGuarnicionPanel && <PanelDerechoGuarnicion onClose={this.closePanelGuarnicion} />}
      {this.state.showNewItemIngredientesPanel && <PanelDerechoIngredientes onClose={this.closePanelIngredientes} />}
      {this.state.showNewItemCategoriasPanel && <PanelDerechoCategorias onClose={this.closePanelCategorias} />}
      

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
            key: 'ingrediente',
            name: 'Ingrediente',
            onClick: ()=> this.newItemIngredientes(),
            iconProps: {
              iconName: 'Brunch'
            }
          },
          {
            key: 'guarnicion',
            name: 'Guarnicion',
            onClick: ()=> this.newItemGuarnicion(),
            iconProps: {
              iconName: 'Breakfast'
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
      showNewItemCartaPanel: true
    });
  }

  private closePanelCarta(){
    this.setState({
      showNewItemCartaPanel: false
    });
  }

  private newItemGuarnicion() {
    this.setState({
      showNewItemGuarnicionPanel: true
    });
  }

  private closePanelGuarnicion(){
    this.setState({
      showNewItemGuarnicionPanel: false
    });
  }

  private newItemCategorias() {
    this.setState({
      showNewItemCategoriasPanel: true
    });
  }

  private closePanelCategorias(){
    this.setState({
      showNewItemCategoriasPanel: false
    });
  }

  private newItemIngredientes() {
    this.setState({
      showNewItemIngredientesPanel: true
    });
  }

  private closePanelIngredientes(){
    this.setState({
      showNewItemIngredientesPanel: false
    });
  }

}




