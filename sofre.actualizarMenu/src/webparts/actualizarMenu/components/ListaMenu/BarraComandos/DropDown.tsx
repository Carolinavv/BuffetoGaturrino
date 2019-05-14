import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const options: IDropdownOption[] = [
  { key: 'carta', text: 'Carta' },
  { key: 'guarnicion', text: 'Guarnicion' },
  { key: 'ingredientes', text: 'Ingredientes' }
];


export const DropDown: React.StatelessComponent = () => {
  return (

    <Dropdown 
    placeholder="Ver Lista " 
    options={options}  
    defaultSelectedKey="carta" />

  );
};