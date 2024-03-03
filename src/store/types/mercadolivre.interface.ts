export interface PaymentMethods {
    paging: Paging
    results: Result[]
}

export interface Paging {
    total: number
    limit: number
    offset: number
}

export interface Result {
    financial_institutions: any[]
    secure_thumbnail: string
    payer_costs: PayerCost[]
    issuer: Issuer
    total_financial_cost: number
    min_accreditation_days: number
    max_accreditation_days: number
    merchant_account_id: any
    id: string
    payment_type_id: string
    accreditation_time: number
    settings: Setting[]
    thumbnail: string
    bins: number[]
    marketplace: string
    deferred_capture: string
    agreements: any[]
    labels: string[]
    financing_deals: FinancingDeals
    name: string
    site_id: string
    processing_mode: string
    additional_info_needed: string[]
    status: string
}

export interface PayerCost {
    installment_rate: number
    discount_rate: number
    min_allowed_amount: number
    labels: any[]
    installments: number
    reimbursement_rate: any
    max_allowed_amount: number
    payment_method_option_id: string
}

export interface Issuer {
    default: boolean
    name: string
    id: number
}

export interface Setting {
    security_code: SecurityCode
    card_number: CardNumber
    bin: Bin
}

export interface SecurityCode {
    mode: string
    card_location: string
    length: number
}

export interface CardNumber {
    length: number
    validation: string
}

export interface Bin {
    pattern: string
    installments_pattern: string
    exclusion_pattern: string
}

export interface FinancingDeals {
    legals: any
    installments: any
    expiration_date: any
    start_date: any
    status: string
}
