import { useState } from 'react';
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

// Sample pricing data - you'd replace these with actual pricing logic
const servicePrices = {
  'Spray painting': 15000,
  'Accident repair': 25000,
  'Full body repaints': 50000,
  'Facelift': 20000,
  'Paintless Dent Repair': 8000,
  'Interior detail': 3500,
  'Engine detail': 2500,
  'Buffing': 6897,
  'Rims': 4310,
  'Watermark': 6897,
  'Headlight restoration': 3448,
  'PPF': 35000,
  'Wrap': 40000,
  'Ceramic Coating': 30000,
  'Standard body wash': 1500,
  'Waxing': 3000,
  'Tyre polish': 1000,
  'Watermark removal': 6897,
  'Rims cleaning': 4310,
};

const packages = [
  {
    id: 'candle',
    name: 'CANDLE',
    includes: ['Interior detail', 'Standard body wash'],
  },
  {
    id: 'bonfire',
    name: 'BONFIRE',
    includes: ['Interior detail', 'Standard body wash', 'Waxing', 'Tyre polish'],
  },
  {
    id: 'ember',
    name: 'EMBER',
    includes: ['Interior detail', 'Standard body wash', 'Waxing', 'Tyre polish', 'Buffing'],
  },
  {
    id: 'blaze',
    name: 'BLAZE',
    includes: [
      'Interior detail',
      'Standard body wash',
      'Waxing',
      'Tyre polish',
      'Buffing',
      'Watermark removal',
      'Rims cleaning',
    ],
  },
];

const vehicleTypes = [
  'Saloon/Sedan e.g Toyota Premio, M Benz C200',
  'Hatchback e.g VW Golf, Toyota Auris, Nissan Juke',
  'Mid SUV e.g Subaru Forester, Honda CRV, Nissan X-trail',
  'SUV e.g Toyota Prado, Range Rover',
  'Station wagon e.g Toyota Fielder, Subaru Legacy',
  'Pickup e.g Toyota Hilux, Isuzu D-max',
  'Van e.g Toyota Hiace, Nissan NV350',
  'Truck e.g Isuzu N-series, Fuso Canter',
  'Bus e.g Coaster, Nissan Civilian',
] as const;

const conditions = ['New', 'Good', 'Minor scratches', 'Dents'] as const;
type PaintType = 'Normal' | 'Metallic' | 'Pearl' | 'Custom';
const urgencyOptions = ['Standard', 'Express'] as const;

type Category = (typeof categories)[number];
type VehicleType = (typeof vehicleTypes)[number];
type Condition = (typeof conditions)[number];
// Removed redundant type definition since PaintType is now directly defined.
type Urgency = (typeof urgencyOptions)[number];

interface PricingForm {
  category: Category | '';
  selectedServices: string[];
  selectedPackage: string;
  vehicleType: VehicleType | '';
  condition: Condition | '';
  paintType: PaintType | '';
  urgency: Urgency | '';
  notes: string;
  phoneNumber: string;
}

export default function PricingConfigurator() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<PricingForm>({
    category: '',
    selectedServices: [],
    selectedPackage: '',
    vehicleType: '',
    condition: '',
    paintType: '',
    urgency: '',
    notes: '',
    phoneNumber: '',
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [tel, setTel] = useState('');

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
    setShowModal(true);
  };

  // Calculate subtotal based on selected services
  const calculateSubtotal = () => {
    return form.selectedServices.reduce((sum, service) => {
      return sum + (servicePrices[service as keyof typeof servicePrices] || 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = Math.round(subtotal * 0.16); // 16% tax
  const total = subtotal + tax;
  

  return (
    <div className="bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="flex items-left mb-8">
        <img src={logo} alt="Garage Logo" className="w-12 h-12 mr-4" />
      </div>
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-8">Hippo AutO Spa Ai Calculator</h1>
        <p className="text-center text-gray-600 mb-4">
          Get an instant quote for your vehicle services
        </p>
        <p className="text-center text-gray-600 mb-8">
        Use this pricing wizard to get the cost of a service(s) of your choice. If you are unable to see your car make/type below, choose a category that closely matches in terms of size.
        </p>

        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-1/2 h-px bg-gray-200 left-0 right-0"></div>

          {['Vehicle', 'Category', 'Services/Package'].map((label, index) => (
            <div key={label} className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= index + 1 ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
                {step > index + 1 ? (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
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
              value={form.urgency}
              onChange={(e) => handleInput('urgency', e.target.value as Urgency)}
              className="w-full p-4 border border-gray-200 rounded-lg"
            >
              <option value="">Select Urgency</option>
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

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                style={{ backgroundColor: '#293445' }}
                className="w-24 py-3 text-white font-medium rounded-lg"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select a Package or Category</h2>
            <div className="space-y-3">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => {
                    handleInput('selectedPackage', pkg.name);
                    handleInput('category', '');
                    handleInput('selectedServices', pkg.includes);
                    setStep(3);
                  }}
                  className="w-full bg-white border border-gray-200 text-gray-800 py-4 px-4 rounded-lg hover:bg-gray-50 transition duration-300 text-left"
                >
                  {pkg.name} Package
                </button>
              ))}

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">or choose by category:</p>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleInput('category', cat);
                      handleInput('selectedPackage', '');
                      handleInput('selectedServices', []);
                      setStep(3);
                    }}
                    className="w-full bg-white border border-gray-200 text-gray-800 py-4 px-4 rounded-lg hover:bg-gray-50 transition duration-300 text-left"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700">Back</button>
          </div>
        )}

        {step === 3 && form.category && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Choose Services</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {services[form.category].map((srv) => (
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
              <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-gray-700">Back</button>
              <button
                disabled={form.selectedServices.length === 0}
                onClick={handleSubmit}
                style={{ backgroundColor: '#293445' }}
                className="w-24 py-3 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {step === 3 && form.selectedPackage && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Selected Package: {form.selectedPackage}</h2>
            <div className="grid grid-cols-2 gap-2">
              {form.selectedServices.map((srv) => (
                <div key={srv} className="bg-gray-50 p-3 rounded-lg">
                  <span>• {srv}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-gray-700">Back</button>
              <button
                onClick={handleSubmit}
                style={{ backgroundColor: '#293445' }}
                className="w-24 py-3 text-white font-medium rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
  <div className="fixed inset-0 bg-gray-200 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-center mb-8">
        <img src={logo} alt="Garage Logo" className="w-12 h-12 mr-4" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">PRICING SUMMARY</h2>
      <p className="text-center text-gray-600 mb-6">to receive this quote on Whats App, complete the form below this table</p>
      
      {/* Pricing Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left border">#</th>
              <th className="py-2 px-4 text-left border">DESCRIPTION</th>
              <th className="py-2 px-4 text-left border">UNIT</th>
              <th className="py-2 px-4 text-left border">QUANTITY</th>
              <th className="py-2 px-4 text-right border">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {form.selectedServices.map((service, index) => (
              <tr key={service} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border text-blue-500">{service}</td>
                <td className="py-2 px-4 border text-right">{servicePrices[service as keyof typeof servicePrices]?.toLocaleString()}</td>
                <td className="py-2 px-4 border text-center">1</td>
                <td className="py-2 px-4 border text-right bg-blue-500 text-white">{servicePrices[service as keyof typeof servicePrices]?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="py-2 px-4 border text-right">SUBTOTAL</td>
              <td className="py-2 px-4 border text-right">KES {subtotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={4} className="py-2 px-4 border text-right">TAX 16%</td>
              <td className="py-2 px-4 border text-right">KES {tax.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={4} className="py-2 px-4 border text-right font-bold">GRAND TOTAL</td>
              <td className="py-2 px-4 border text-right text-blue-500 font-bold">KES {total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <button
        onClick={() => {
          alert('Appointment booked!');
          setShowModal(false);
        }}
        className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 mb-6"
      >
        ✓ Book appointment now
      </button>
      
      <h3 className="text-xl font-bold text-center mb-4">RECEIVE THIS QUOTE ON Email</h3>
      
      <div className="space-y-4 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full p-4 border border-gray-200 rounded-lg"
        />
        
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          className="w-full p-4 border border-gray-200 rounded-lg"
        />
      </div>

      <div className="flex justify-between gap-4">
        <a
          href={`https://wa.me/254710256557?text=${encodeURIComponent(
            `Hello, I'd like to book an appointment for the following:\n\nVehicle: ${form.vehicleType}\nCondition: ${form.condition}\nUrgency: ${form.urgency}\nCategory: ${form.category}\nServices: ${form.selectedServices.join(', ')}\nSubtotal: KES ${subtotal}\nTax (16%): KES ${tax}\nTotal: KES ${total}\nNotes: ${form.notes}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold text-center hover:bg-green-700 flex-1"
        >
          Book via WhatsApp
        </a>

        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 flex-1"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
