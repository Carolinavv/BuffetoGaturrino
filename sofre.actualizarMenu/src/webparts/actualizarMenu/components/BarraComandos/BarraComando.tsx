import * as React from 'react';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import '@pnp/polyfill-ie11';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import style from './BarraComando.module.scss';

export default class BarraComando extends React.Component<{}, {}> {
  public render(): JSX.Element {

    return (
        <CommandBar
          items={items}
          farItems={farItems}
          className={style.commandbar}

        />
    );
  }
}

const items = [
  {
    key: 'nuevo',
    name: 'Nuevo',
    cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
    iconProps: {
      iconName: 'Add'
    },
    ariaLabel: 'New',
    subMenuProps: {
      items: [
        {
          key: 'carta',
          name: 'Carta',
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
    key:"modificar",
    name:"Modificar",
    iconProps: {iconName: "Edit"},
  },
  {
    key:"borrar",
    name:"Borrar",
    iconProps: {iconName: "Delete"},
  },
];


const farItems = [
  {
    key:"search",
    onRender:() => <SearchBox placeholder="Search" className={style.searchBox} underlined={true}
    />
  },
  {
    key:"michi",
    iconProps: {iconName: "Cat"},
  },
];
