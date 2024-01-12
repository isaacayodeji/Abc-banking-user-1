export namespace ApiResponse {
  export class Api {
    data?: any;
    responseMessage?: string;
    status?: number;
    token?: string;
  }
  export class GetDeposit {
    accountNumber?: number;
    amount?: number;
  }

  export class GetAccountDetails {
    id?: number;
    accountName?: string;
    accountNumber?: string;
    totalBalance?: number;
    crAmount?: number;
    drAmount?: number;
    overDraft?: number;
    currentBalance?: number;
    phoneNumber?: string;
    dateCreated?: string;
    dateUpdated?: string;
    customerId?: number;
  }
  export class GetTransactionStatement {
    accountNumber?: string;
    amount?: number;
    dateCreated?: string;
    senderName?: string;
    senderAccount?: string;
    senderBank?: string;
    remarks?: string;
    beneficiaryName?: string;
    beneficiaryAccount?: string;
    beneficiaryBank?: string;
    type?: string;
    transMethod?: string;
    sessionId?: string;
    customerAccountId?: number;
  }
  export class UserInfo {
    id?: number;
    accountNumber?: any;
    fullName?: string;
    address?: string;
    approvedBy?: string;
    email?: string;
    branch?: string;
    userName?: string;
    hashedPassword?: string;
    roleId?: number;
    isActive?: boolean;
    isApproved?: boolean;
    dateCreated?: string;
    dateModified?: any;
    firstName?: string;
    middleName?: string;
    phoneNumber?: string;
  }
  export class SignUpInfo {
    firstName?: string;
    middleName?: string;
    surname?: string;
    phoneNumber?: string;
    email?: string;
    dob?: string;
    address?: string;
    gender?: string;
    password?: string;
  }

  export class GetAllCustomer {
    id?: number ;
    firstName?: string;
    middleName?: string;
    surname?: string;
    phoneNumber?: string;
    email?: string;
    hashedPassed?: string;
    dob?: string;
    address?: string;
    gender?: any;
    isActive?: boolean;
    isApproved?: boolean;
    dateCreated?: string;
    dateModified?: string;
    approvedBy?: string;
    status?: string;
  }
}
