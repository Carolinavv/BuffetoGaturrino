
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { IListaConFiltroItem, IListaPedidoDetalleState } from './IListaConFiltro';
import { sp } from '@pnp/sp';


const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px'
});



export class DetailsListBasicExample extends React.Component<{}, IListaPedidoDetalleState> {
    private _selection: Selection;
    private _allItems: IListaConFiltroItem[];
    private _columns: IColumn[];

    constructor(props: {}) {
        super(props);

        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
        });

        // Populate with items for demos.
        this._allItems = [];

        this.getListPedidoDetalle = this.getListPedidoDetalle.bind(this);

        this._columns = [
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true }
        ];

        this.state = {
            items: null,
            selectionDetails: this._getSelectionDetails()
        };
    }

    public getListPedidoDetalle() {
        sp.web.lists.getByTitle("Pedido Detalle").items.select("peddtUsuario/Title", "peddtUsuario/EMail").expand("peddtUsuario").orderBy("Title", true).top(5000).get().then((data: any[]) => {
            let listPeddet: IListaConFiltroItem[];
            let arrayPedidoDetalle: string[] = [];

            for (let index = 0; index < data.length; index++) {
                arrayPedidoDetalle[index] = data[index]["peddtUsuario"]["EMail"];
                //console.log({ key: index, text: arrayPedidoDetalle[index] });
                console.log(data[index]["peddtUsuario"]["EMail"]);

                listPeddet.push({ key: index.toString(), text: arrayPedidoDetalle[index] });
                //console.log(listPeddet);

            }
            this.setState({ items: listPeddet });


        });

    }

    public componentDidMount() {
        this.getListPedidoDetalle();
    }

    public render(): JSX.Element {
        const { items, selectionDetails } = this.state;


        return (
            <Fabric>
                <div className={exampleChildClass}>{selectionDetails}</div>
                <TextField
                    className="ms-fontWeight-bold"
                    label="Filter by name:"
                    onChanged={this._onFilter.bind(this)}
                    style={{ maxWidth: "300px" }}

                />
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        items={items}
                        columns={this._columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        onItemInvoked={this._onItemInvoked}
                    />
                </MarqueeSelection>
            </Fabric>
        );
    }

    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + (this._selection.getSelection()[0] as IListaConFiltroItem).text;
            default:
                return `${selectionCount} items selected`;
        }
    }

    private _onFilter = (text: string): void => {
        this.setState({
            items: text ? this._allItems.filter(i => i.text.toLowerCase().indexOf(text) > -1) : this._allItems
        });
    };

    private _onItemInvoked = (item: IListaConFiltroItem): void => {
        alert(`Item invoked: ${item.text}`);
    };
}