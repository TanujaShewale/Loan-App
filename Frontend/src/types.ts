export interface Customer {
  id?: number;
  cname: string;
  cemail: string;
  cphone: string;
  cpass: string;
  ccpass?: string;
  cadd: string;
  loans?: Loan[];
}

export interface Loan {
  lid?: number;
  loancateg: string;
  amount: string;
  ten: number;
  loanpur: string;
  occup: string;
  monthinc: number;
  ladd: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  customer?: Customer;
}

export interface Admin {
  ausername: string;
  apassword: string;
}
