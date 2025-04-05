import  { useState } from 'react';
import logo from './assets/Hipposautospa-logo.png';

const categories = ['Colour & Repair', 'Clean & Shine', 'Coat & Guard'] as const;

const services: Record<(typeof categories)[number], string[]> = {
  'Colour & Repair': [
    'Spray painting',
    'Accident repair',
    'Full body repaints',
    'Facelift',
    'Paintless Dent Repair',
  ],
  'Clean & Shine': [
    'Interior detail',
    'Engine detail',
    'Buffing',
    'Rims',
    'Watermark',
    'Headlight restoration',
  ],
  'Coat & Guard': ['PPF', 'Wrap', 'Ceramic Coating'],
};

const vehicleTypes = ['Sedan', 'SUV', 'Van', 'Truck'] as const;
const conditions = ['New', 'Good', 'Minor scratches', 'Dents'] as const;
const paintTypes = ['Normal', 'Metallic', 'Pearl', 'Custom'] as const;
const urgencyOptions = ['Standard', 'Express'] as const;

type Category = (typeof categories)[number];
type VehicleType = (typeof vehicleTypes)[number];
type Condition = (typeof conditions)[number];
type PaintType = (typeof paintTypes)[number];
type Urgency = (typeof urgencyOptions)[number];

interface PricingForm {
  category: Category | '';
  selectedServices: string[];
  vehicleType: VehicleType | '';
  condition: Condition | '';
  paintType: PaintType | '';
  urgency: Urgency;
  notes: string;
}

export default function PricingConfigurator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<PricingForm>({
    category: '',
    selectedServices: [],
    vehicleType: '',
    condition: '',
    paintType: '',
    urgency: 'Standard',
    notes: '',
  });

  const handleInput = <K extends keyof PricingForm>(key: K, value: PricingForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting form:', form);
  };

  // const steps = ['Category', 'Services', 'Details'];

  return (
    <div className=" bg-gray-100 p-6 flex flex-col items-center justify-center">
           <div className="flex items-left mb-8">
          <img
            src={logo} 
            alt="Garage Logo"
            className="w-12 h-12 mr-4"
          />
    
        </div>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-8">Hippo AutO Spa Ai Calculator</h1>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 relative">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 h-px bg-gray-200 left-0 right-0"></div>
          
          {/* Step 1: Category */}
          <div className="flex flex-col items-center relative z-10">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= 1 ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
              {step > 1 ? (
                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            <span className="mt-2 text-sm font-medium">Category</span>
          </div>
          
          {/* Step 2: Services */}
          <div className="flex flex-col items-center relative z-10">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= 2 ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
              {step > 2 ? (
                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              )}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-500">Services</span>
          </div>
          
          {/* Step 3: Details */}
          <div className="flex flex-col items-center relative z-10">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= 3 ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
              {step > 3 ? (
                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              )}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-500">Details</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select Service Category</h2>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    handleInput('category', cat);
                    handleInput('selectedServices', []);
                    setStep(2);
                  }}
                  className="w-full bg-white border border-gray-200 text-gray-800 py-4 px-4 rounded-lg hover:bg-gray-50 transition duration-300 text-left"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Choose Services</h2>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {form.category &&
                services[form.category].map((srv) => (
                  <label
                    key={srv}
                    className="flex items-center space-x-3 bg-white border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={form.selectedServices.includes(srv)}
                      onChange={() => toggleService(srv)}
                      className="h-4 w-4"
                    />
                    <span>{srv}</span>
                  </label>
                ))}
            </div>
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setStep(1)} 
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Back
              </button>
              <button
                disabled={form.selectedServices.length === 0}
                onClick={() => setStep(3)}
                style={{ backgroundColor: '#293445' }}
                className="w-24 py-3  text-white font-medium rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>

            <select
              required
              value={form.vehicleType}
              onChange={(e) => handleInput('vehicleType', e.target.value as VehicleType)}
              className="w-full p-4 border border-gray-200 rounded-lg"
            >
              <option value="">Select Vehicle Type</option>
              {vehicleTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <select
              required
              value={form.condition}
              onChange={(e) => handleInput('condition', e.target.value as Condition)}
              className="w-full p-4 border border-gray-200 rounded-lg"
            >
              <option value="">Select Vehicle Condition</option>
              {conditions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={form.paintType}
              onChange={(e) => handleInput('paintType', e.target.value as PaintType)}
              className="w-full p-4 border border-gray-200 rounded-lg"
            >
              <option value="">Select Paint Type</option>
              {paintTypes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <select
              value={form.urgency}
              onChange={(e) => handleInput('urgency', e.target.value as Urgency)}
              className="w-full p-4 border border-gray-200 rounded-lg"
            >
              {urgencyOptions.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>

            <textarea
              value={form.notes}
              onChange={(e) => handleInput('notes', e.target.value)}
              placeholder="Additional notes (optional)"
              className="w-full p-4 border border-gray-200 rounded-lg"
              rows={3}
            />

            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setStep(2)} 
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Back
              </button>
              <button
                type="submit"
                style={{ backgroundColor: '#293445' }}
                className="w-24 py-3  text-white font-medium rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}