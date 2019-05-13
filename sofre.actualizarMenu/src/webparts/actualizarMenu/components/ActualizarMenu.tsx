import * as React from 'react';
import styles from './ActualizarMenu.module.scss';
import { IActualizarMenuProps } from './IActualizarMenuProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import ListaMenu from './ListaMenu/ListaMenu';
import './Header/HeaderMenu';
import HeaderMenu from './Header/HeaderMenu';
import BarraComando from './BarraComandos/BarraComando';
import FormularioNuevaCarta from './FormularioNuevaCarta/FormularioNuevaCarta';
import FormularioNuevoGI from './FormularioNuevoGI/FormularioNuevoGI';
import {DropDown} from './BarraComandos/DropDown';

export default class ActualizarMenu extends React.Component<IActualizarMenuProps, {}> {
  public render(): React.ReactElement<IActualizarMenuProps> {
    return (
      <div className={ styles.actualizarMenu }> 
        <div className={ styles.container }>
          <div className={ styles.row }>
            <HeaderMenu title={ this.props.title } />
             <BarraComando />
             <DropDown/>
             <ListaMenu />
             <br />
             <br />
             <br />
             <FormularioNuevaCarta />
             <FormularioNuevoGI titulo="Un título" />
            </div>
        </div> 
      </div>
    );
  }
}
