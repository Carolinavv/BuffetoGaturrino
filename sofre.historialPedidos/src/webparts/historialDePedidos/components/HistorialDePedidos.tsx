import * as React from 'react';
import styles from './HistorialDePedidos.module.scss';
import { IHistorialDePedidosProps } from './IHistorialDePedidosProps';
import ListaDePedidos from './Lista/ListaDePedidos';

export default class HistorialDePedidos extends React.Component<IHistorialDePedidosProps, {}> {
  public render(): React.ReactElement<IHistorialDePedidosProps> {
    return (
      <div className={ styles.historialDePedidos }>
        <div className={ styles.container }>
          <ListaDePedidos/>
        </div>
      </div>
    );
  }
}
