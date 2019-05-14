import * as React from 'react';
import '@pnp/polyfill-ie11';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import style from './BarraComando.module.scss';
import PanelDerechoCarta from './PanelDerecho/PanelDerechoCarta'

export interface IBarraComandosProps {
  onNewItem: Function;
}
export interface IBarraComandosStates {
  showNewItemCartaPanel: boolean;
  showNewItemIngredientePanel: boolean;
  showNewItemGuarnicionPanel: boolean;
}

export default class BarraComandos extends React.Component<IBarraComandosProps, IBarraComandosStates> {
  constructor(props){
    super(props);
    this.state = { 
      showNewItemCartaPanel: false,
      showNewItemIngredientePanel: false,
      showNewItemGuarnicionPanel: false
     }
  }
  
  public render(): JSX.Element {
    return (
      <div>

        {this.state.showNewItemCartaPanel && <PanelDerechoCarta onClose={this.closePanel} />}

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
            iconProps: {
              iconName: 'Brunch'
            }
          },
          {
            key: 'guarnicion',
            name: 'Guarnicion',
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

  private closePanel(){
    this.setState({
      showNewItemCartaPanel: false
    });
  }
}




