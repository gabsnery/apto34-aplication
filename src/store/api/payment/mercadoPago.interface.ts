export interface Preference {
  orderId: string;
  items: Item[];
  payer: Payer;
  back_urls?: BackUrls;
  auto_return?: string;
  notification_url?: string;
  statement_descriptor?: string;
  external_reference?: string;
  expires?: boolean;
}
export interface IPreferenceReturn {
  items: Item[];
  payer: Payer;
  back_urls?: BackUrls;
  auto_return?: string;
  notification_url?: string;
  statement_descriptor?: string;
  external_reference?: string;
  expires?: boolean;
}

export interface BackUrls {
  success: string;
  failure: string;
  pending: string;
}

export interface Item {
  id: string;
  title: string;
  currency_id: string;
  picture_url?: string;
  description: string;
  category_id: string;
  quantity: number;
  unit_price: number;
}

export interface Payer {
  name: string;
  surname: string;
  email: string;
  phone?: Phone;
  identification?: Identification;
  address?: Address;
}

export interface Address {
  street_name: string;
  street_number: number;
  zip_code: string;
}

export interface Identification {
  type: string;
  number: string;
}

export interface Phone {
  area_code: string;
  number: number | string;
}

interface IPaymentItem {
  id: string;
  category_id: string;
  currency_id: string;
  description: string;
  title: string;
  quantity: number;
  unit_price: number;
}

interface IPayerPhone {
  area_code: string;
  number: string;
}

interface IPayerAddress {
  zip_code: string;
  street_name: string;
  street_number: string;
}

interface IPayerIdentification {
  number: string;
  type: string;
}

interface IPayer {
  phone?: IPayerPhone;
  address?: IPayerAddress;
  email: string;
  identification: IPayerIdentification;
  first_name: string;
  last_name: string;  
  date_created?: string | null;
  last_purchase?: string | null;
}

interface IPaymentMethod {
  id: string;
}

interface IPaymentMethods {
  default_card_id: string | null;
  default_payment_method_id: string | null;
  excluded_payment_methods: IPaymentMethod[];
  excluded_payment_types: IPaymentMethod[];
  installments: number | null;
  default_installments: number | null;
}

interface IRedirectUrls {
  failure: string;
  pending: string;
  success: string;
}

interface IReceiverAddress {
  zip_code: string;
  street_name: string;
  street_number: string | null;
  floor: string;
  apartment: string;
  city_name: string | null;
  state_name: string | null;
  country_name: string | null;
}

interface IShipments {
  default_shipping_method: string | null;
  receiver_address: IReceiverAddress;
}

export interface IPaymentResponse {
  additional_info: string;
  auto_return: string;
  back_urls: IRedirectUrls;
  binary_mode: boolean;
  client_id: string;
  collector_id: number;
  coupon_code: string | null;
  coupon_labels: string | null;
  date_created: string;
  date_of_expiration: string | null;
  expiration_date_from: string | null;
  expiration_date_to: string | null;
  expires: boolean;
  external_reference: string;
  id: string;
  init_point: string;
  internal_metadata: string | null;
  items: IPaymentItem[];
  marketplace: string;
  marketplace_fee: number;
  metadata: Record<string, unknown>;
  notification_url: string | null;
  operation_type: string;
  payer: IPayer;
  payment_methods: IPaymentMethods;
  processing_modes: string | null;
  product_id: string | null;
  redirect_urls: IRedirectUrls;
  sandbox_init_point: string;
  site_id: string;
  shipments: IShipments;
  total_amount: number | null;
  last_updated: string | null;
  financing_group: string;
}




export interface IPayment {
  id?:string;
  issuer_id?:string;
  payer: IPayer;
  payment_method_id?: string;
  transaction_amount: number;
  date_of_expiration?: Date; 
  installments?: number;
  card_token?: string;
}
