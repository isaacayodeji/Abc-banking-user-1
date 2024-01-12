import { ColumnProps } from "antd/es/table";

export namespace PageProps {
    export class LayoutProps {
    children?: any;
    defaultSelectedKeys?: string;
    pageTitle?: string;
    openKey?: string;
    key?: string;
    getUrl?: string;
    btnTitle?: string;
    column?: ColumnProps<any>[]
    loading?: boolean;
    dataSource?: any[];
    tabName?: string;
    onClick?: () => void
    scrollX?: number;
    pageSize?: number;
    showFilter?: boolean;
    otherHeaderAction?: any;
    hidePageContentByName?: boolean = true;
    otherPageContent?: React.ReactNode
    hideSearch?:boolean = true
    
  }
   export class TableData {
     dataSource?: any[];
     column?: any[];
     loading?: boolean;
     total?: number;
     pageSize?: number;
     onPagination?: () => void;
     scrollX?: number;
   }
}