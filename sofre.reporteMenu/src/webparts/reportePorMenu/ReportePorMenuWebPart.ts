import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReportePorMenuWebPartStrings';
import ReportePorMenu from './components/ReportePorMenu';
import { IReportePorMenuProps } from './components/IReportePorMenuProps';

export interface IReportePorMenuWebPartProps {
  description: string;
}

export default class ReportePorMenuWebPart extends BaseClientSideWebPart<IReportePorMenuWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReportePorMenuProps > = React.createElement(
      ReportePorMenu,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
