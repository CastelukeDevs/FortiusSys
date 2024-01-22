export type ICompanyData = {
  id: string;
  company_name: string;
  logo: null | string;
  media: [];
};

export type IEmpolyeeData = {
  id: number;
  employee_id: string;
  user_id: string;
  employee_first_name: string;
  employee_last_name: string;
  employee_img: null | string;
  employee_department: null | string;
  full_name: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'employee';
  company_id: string;
  company: ICompanyData;
  employee: IEmpolyeeData;
};

export type IUserFetch = {
  user: IUser;
  token: string;
};
