import * as React from 'react';
import styles from './ActualizarMenu.module.scss';
import { IActualizarMenuProps } from './IActualizarMenuProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import ListaMenu from './ListaMenu/ListaMenu';
import './Header/HeaderMenu';
import HeaderMenu from './Header/HeaderMenu';
import BarraComando from './ListaMenu/BarraComandos/BarraComando';
import {DropDown} from './ListaMenu/BarraComandos/DropDown';
import PanelDerechoCarta from './ListaMenu/BarraComandos/PanelDerecho/PanelDerechoCarta';

export default class ActualizarMenu extends React.Component<IActualizarMenuProps, {}> {

  public render(): React.ReactElement<IActualizarMenuProps> {
    return (
      <div className={ styles.actualizarMenu }> 
        <div className={ styles.container }>
          <div className={ styles.row }>
            <HeaderMenu title={ this.props.title } />
             <ListaMenu />
            </div>
        </div> 
      </div>
    );
  }
}
