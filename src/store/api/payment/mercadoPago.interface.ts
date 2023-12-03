export interface Preference {
    items:                Item[];
    payer:                Payer;
    back_urls?:            BackUrls;
    auto_return?:          string;
    notification_url?:     string;
    statement_descriptor?: string;
    external_reference?:   string;
    expires?:              boolean;
}

export interface BackUrls {
    success: string;
    failure: string;
    pending: string;
}

export interface Item {
    id:          string;
    title:       string;
    currency_id: string;
    picture_url?: string;
    description: string;
    category_id: string;
    quantity:    number;
    unit_price:  number;
}

export interface Payer {
    name:           string;
    surname:        string;
    email:          string;
    phone?:          Phone;
    identification?: Identification;
    address?:        Address;
}

export interface Address {
    street_name:   string;
    street_number: number;
    zip_code:      string;
}

export interface Identification {
    type:   string;
    number: string;
}

export interface Phone {
    area_code: string;
    number:    number|string;
}
