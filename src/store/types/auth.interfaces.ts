import { status } from '@types'


export interface Login {
  email: string
  password?: string
  refreshToken?: string
}

export interface AuthState {
  status: status
  accessToken:  string;
  expiresIn:    number;
  refreshToken: string;
  userId:       number;
  email:        string;
  name:         string;
  cnpjcpf:      string;
  cellphone:    string;
  telephone:    string;
  company:      Company;
  profiles:     Layer[];
  layers:       Layer[];
  framesbi:       BI[];
  tools:        any[];
}
export interface Company {
  Id:     number;
  Name:   string;
  CNPJ:   string;
  Active: boolean;
}
export interface Category {
  Id:     number;
  Name:   string;
}
export interface Layer {
  Id:   number;
  Name: string;
  Url: string;
  Params?: string[];
  Category: Category;
}
export interface BI {
  Id:   number;
  Name: string;
  UrlFrame: string;
  Type?: string;
}