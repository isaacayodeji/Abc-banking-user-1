import { ApiRequest } from "../application/client/request";


export namespace State {

  export interface Page {
    filterOption?: string;
    datatableLoading?: boolean;
    showFormModal?: boolean;
    showFormWizard?: boolean;
    showCompanyModal?: boolean;
    response?: any[];
    originalResponse?: any[];
    defaultSelectedKeys?: string;
    calendaDetails?: { startDate?: any; endDate?: any; id?: number };
    getUrl?: string;
    postUrl?: string;
    updateUrl?: string;
    deleteUrl?: string;
    uploadUrl?: string;
    otherFormActionUrl?: string;
    request?: any;
    current: number;
    uploadRequestKey?: any;
    getSelectUrl?: string;
    labelInput?: string;
    btnDisabled?: boolean;
    id?: number;
    menuKey?: any;
    page?: string;
    pageSize?: any;
    pageNumber?: any
    totalRecords?: any;
    showFormOption?: boolean;
    formOptionValue?: any;
    formName?: string;
    record?: any
    // selectOptionValues?: Array<PageProps.SelectOptionValues>;
    showMoreModal?: boolean;
    showEmployeeModalAfterProfileUpdate?: boolean;
    // assignEmployeeModal?:boolean
   
  }
  export interface Auth {
    request: ApiRequest.Auth;
    
    
  }
}
