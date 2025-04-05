// types/form.ts
export type ServiceCategory = 'Colour & Repair' | 'Clean & Shine' | 'Coat & Guard';

export interface PricingForm {
  category: ServiceCategory | '';
  selectedServices: string[];
  vehicleType: string;
  condition: string;
  paintType: string;
  urgency: 'Standard' | 'Express';
  notes: string;
}
