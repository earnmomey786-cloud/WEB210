export type ServiceType = 'sin_alquiler' | 'con_alquiler_anual' | 'con_alquiler_trimestral';

export type OrderStatus = 'paid' | 'awaiting_data' | 'ready_for_review' | 'submitted';

export type DocumentType = 'ibi' | 'rental_contract' | 'invoice' | 'escritura' | 'id_document' | 'justificante';

export interface Order {
  id: string;
  order_number: string;
  email: string;
  service_type: ServiceType;
  copropietarios: number;
  total_amount: number;
  status: OrderStatus;
  payment_intent_id?: string;
  briefing_token: string;
  token_expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  order_id: string;
  is_primary: boolean;
  full_name: string;
  address?: string;
  country?: string;
  pesel?: string;
  nie?: string;
  passport_number?: string;
  email?: string;
  phone?: string;
  ownership_percentage?: number;
  created_at: string;
}

export interface Property {
  id: string;
  order_id: string;
  address_spain: string;
  cadastral_number?: string;
  cadastral_value?: number;
  is_shared_ownership: boolean;
  created_at: string;
}

export interface RentalInfo {
  id: string;
  order_id: string;
  rental_period_months?: number;
  gross_income?: number;
  deductible_costs: Record<string, number>;
  is_quarterly: boolean;
  created_at: string;
}

export interface Document {
  id: string;
  order_id: string;
  document_type: DocumentType;
  file_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  uploaded_at: string;
}

export interface ServicePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  additionalInfo?: string[];
}
