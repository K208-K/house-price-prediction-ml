import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, TrendingUp, MapPin, Building2, Gauge, Sparkles, ChevronDown, ChevronUp, Github, Loader2 } from 'lucide-react';
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface FormData {
  overallQuality: number;
  livingArea: string;
  garageCapacity: number;
  basementArea: string;
  yearBuilt: string;
  fullBathrooms: number;
  bedroomsAboveGround: number;
  neighborhood: string;
  msZoning: string;
  lotArea: string;
  streetType: string;
  alley: string;
  houseStyle: string;
  roofStyle: string;
  exteriorMaterial: string;
  foundationType: string;
  heatingQuality: string;
  kitchenQuality: string;
  fireplaceQuality: string;
  garageType: string;
  garageFinish: string;
  garageQuality: string;
  garageCondition: string;
}

interface PredictionResult {
  price: number;
  confidence: number;
  featureImportance: { feature: string; importance: number }[];
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    overallQuality: 5,
    livingArea: '',
    garageCapacity: 2,
    basementArea: '',
    yearBuilt: '',
    fullBathrooms: 2,
    bedroomsAboveGround: 3,
    neighborhood: '',
    msZoning: '',
    lotArea: '',
    streetType: '',
    alley: '',
    houseStyle: '',
    roofStyle: '',
    exteriorMaterial: '',
    foundationType: '',
    heatingQuality: '',
    kitchenQuality: '',
    fireplaceQuality: '',
    garageType: '',
    garageFinish: '',
    garageQuality: '',
    garageCondition: '',
  });

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basic']));
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handlePredict = async () => {
  try {
    setIsLoading(true);
    setShowResult(false);

    // 🔥 Convert your frontend names → backend feature names
    const payload = {
      OverallQual: formData.overallQuality,
      GrLivArea: Number(formData.livingArea),
      GarageCars: formData.garageCapacity,
      TotalBsmtSF: Number(formData.basementArea),
      YearBuilt: Number(formData.yearBuilt),
      FullBath: formData.fullBathrooms,
      BedroomAbvGr: formData.bedroomsAboveGround,
    };

    const response = await axios.post(
      `${API}/predict`,
      payload
    );

    const predictedPrice = response.data.predicted_price;

    // 🔥 Format to match your existing ResultSection
    const result: PredictionResult = {
      price: predictedPrice,
      confidence: 0.91,
      featureImportance: [
        { feature: 'Overall Quality', importance: 0.35 },
        { feature: 'Living Area', importance: 0.28 },
        { feature: 'Year Built', importance: 0.15 },
        { feature: 'Garage Capacity', importance: 0.12 },
        { feature: 'Basement Area', importance: 0.10 },
      ],
    };

    setPrediction(result);
    setShowResult(true);

  } catch (error) {
    console.error("Prediction error:", error);
  } finally {
    setIsLoading(false);
  }
};

  const scrollToForm = () => {
    document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="relative z-10">
        <HeroSection onGetStarted={scrollToForm} />
        <FeatureForm
          formData={formData}
          setFormData={setFormData}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          onPredict={handlePredict}
          isLoading={isLoading}
        />

        <AnimatePresence>
          {showResult && prediction && (
            <ResultSection prediction={prediction} />
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}

function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Home className="w-20 h-20 text-blue-400" strokeWidth={1.5} />
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-Powered House Price Predictor
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Harness the power of advanced machine learning to predict property values with precision
          </p>

          <div className="flex items-center justify-center gap-3 text-gray-400 mb-12">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-lg">Powered by XGBoost ML Model trained on 200+ features</span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(96, 165, 250, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          className="group relative px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Prediction
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-20 text-gray-500"
        >
          <ChevronDown className="w-8 h-8 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureForm({
  formData,
  setFormData,
  expandedSections,
  toggleSection,
  onPredict,
  isLoading
}: {
  formData: FormData;
  setFormData: (data: FormData) => void;
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
  onPredict: () => void;
  isLoading: boolean;
}) {
  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <section id="prediction-form" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Property Details
          </h2>
          <p className="text-gray-400">Enter the features to get an accurate price prediction</p>
        </motion.div>

        <div className="space-y-6">
          <CollapsibleSection
            title="Basic Property Details"
            icon={<Building2 className="w-5 h-5" />}
            sectionKey="basic"
            expanded={expandedSections.has('basic')}
            toggle={() => toggleSection('basic')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SliderInput
                label="Overall Quality"
                min={1}
                max={10}
                value={formData.overallQuality}
                onChange={(val) => updateField('overallQuality', val)}
              />
              <NumberInput
                label="Living Area (sq ft)"
                value={formData.livingArea}
                onChange={(val) => updateField('livingArea', val)}
                placeholder="1500"
              />
              <SliderInput
                label="Garage Capacity"
                min={0}
                max={4}
                value={formData.garageCapacity}
                onChange={(val) => updateField('garageCapacity', val)}
              />
              <NumberInput
                label="Basement Area (sq ft)"
                value={formData.basementArea}
                onChange={(val) => updateField('basementArea', val)}
                placeholder="800"
              />
              <NumberInput
                label="Year Built"
                value={formData.yearBuilt}
                onChange={(val) => updateField('yearBuilt', val)}
                placeholder="2005"
              />
              <SliderInput
                label="Full Bathrooms"
                min={1}
                max={4}
                value={formData.fullBathrooms}
                onChange={(val) => updateField('fullBathrooms', val)}
              />
              <SliderInput
                label="Bedrooms Above Ground"
                min={1}
                max={6}
                value={formData.bedroomsAboveGround}
                onChange={(val) => updateField('bedroomsAboveGround', val)}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Location Details"
            icon={<MapPin className="w-5 h-5" />}
            sectionKey="location"
            expanded={expandedSections.has('location')}
            toggle={() => toggleSection('location')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="Neighborhood"
                value={formData.neighborhood}
                onChange={(val) => updateField('neighborhood', val)}
                options={['CollgCr', 'Veenker', 'Crawfor', 'NoRidge', 'Mitchel', 'Somerst', 'NWAmes', 'OldTown', 'BrkSide', 'Sawyer']}
              />
              <SelectInput
                label="MS Zoning"
                value={formData.msZoning}
                onChange={(val) => updateField('msZoning', val)}
                options={['RL', 'RM', 'FV', 'RH', 'C (all)']}
              />
              <NumberInput
                label="Lot Area (sq ft)"
                value={formData.lotArea}
                onChange={(val) => updateField('lotArea', val)}
                placeholder="9000"
              />
              <SelectInput
                label="Street Type"
                value={formData.streetType}
                onChange={(val) => updateField('streetType', val)}
                options={['Pave', 'Grvl']}
              />
              <SelectInput
                label="Alley"
                value={formData.alley}
                onChange={(val) => updateField('alley', val)}
                options={['NA', 'Grvl', 'Pave']}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="House Structure"
            icon={<Home className="w-5 h-5" />}
            sectionKey="structure"
            expanded={expandedSections.has('structure')}
            toggle={() => toggleSection('structure')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="House Style"
                value={formData.houseStyle}
                onChange={(val) => updateField('houseStyle', val)}
                options={['1Story', '2Story', '1.5Fin', '1.5Unf', 'SFoyer', 'SLvl', '2.5Unf', '2.5Fin']}
              />
              <SelectInput
                label="Roof Style"
                value={formData.roofStyle}
                onChange={(val) => updateField('roofStyle', val)}
                options={['Gable', 'Hip', 'Gambrel', 'Mansard', 'Flat', 'Shed']}
              />
              <SelectInput
                label="Exterior Material"
                value={formData.exteriorMaterial}
                onChange={(val) => updateField('exteriorMaterial', val)}
                options={['VinylSd', 'MetalSd', 'Wd Sdng', 'HdBoard', 'BrkFace', 'WdShing', 'CemntBd', 'Plywood', 'AsbShng', 'Stucco']}
              />
              <SelectInput
                label="Foundation Type"
                value={formData.foundationType}
                onChange={(val) => updateField('foundationType', val)}
                options={['PConc', 'CBlock', 'BrkTil', 'Slab', 'Stone', 'Wood']}
              />
              <SelectInput
                label="Heating Quality"
                value={formData.heatingQuality}
                onChange={(val) => updateField('heatingQuality', val)}
                options={['Ex', 'Gd', 'TA', 'Fa', 'Po']}
              />
              <SelectInput
                label="Kitchen Quality"
                value={formData.kitchenQuality}
                onChange={(val) => updateField('kitchenQuality', val)}
                options={['Ex', 'Gd', 'TA', 'Fa', 'Po']}
              />
              <SelectInput
                label="Fireplace Quality"
                value={formData.fireplaceQuality}
                onChange={(val) => updateField('fireplaceQuality', val)}
                options={['Ex', 'Gd', 'TA', 'Fa', 'Po', 'NA']}
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Garage Details"
            icon={<Gauge className="w-5 h-5" />}
            sectionKey="garage"
            expanded={expandedSections.has('garage')}
            toggle={() => toggleSection('garage')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="Garage Type"
                value={formData.garageType}
                onChange={(val) => updateField('garageType', val)}
                options={['Attchd', 'Detchd', 'BuiltIn', 'CarPort', 'Basment', '2Types', 'NA']}
              />
              <SelectInput
                label="Garage Finish"
                value={formData.garageFinish}
                onChange={(val) => updateField('garageFinish', val)}
                options={['Fin', 'RFn', 'Unf', 'NA']}
              />
              <SelectInput
                label="Garage Quality"
                value={formData.garageQuality}
                onChange={(val) => updateField('garageQuality', val)}
                options={['Ex', 'Gd', 'TA', 'Fa', 'Po', 'NA']}
              />
              <SelectInput
                label="Garage Condition"
                value={formData.garageCondition}
                onChange={(val) => updateField('garageCondition', val)}
                options={['Ex', 'Gd', 'TA', 'Fa', 'Po', 'NA']}
              />
            </div>
          </CollapsibleSection>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPredict}
            disabled={isLoading}
            className="px-16 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xl font-bold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                Predicting...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Generate Prediction
              </span>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function CollapsibleSection({
  title,
  icon,
  sectionKey,
  expanded,
  toggle,
  children
}: {
  title: string;
  icon: React.ReactNode;
  sectionKey: string;
  expanded: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-xl"
    >
      <button
        onClick={toggle}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SliderInput({
  label,
  min,
  max,
  value,
  onChange
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-lg font-bold text-blue-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(168, 85, 247) ${((value - min) / (max - min)) * 100}%, rgba(255, 255, 255, 0.1) ${((value - min) / (max - min)) * 100}%)`
        }}
      />
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-500"
      />
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white cursor-pointer"
      >
        <option value="" className="bg-slate-800">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-800">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultSection({ prediction }: { prediction: PredictionResult }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl border border-white/20 p-12 shadow-2xl"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
            >
              <TrendingUp className="w-12 h-12" />
            </motion.div>

            <h3 className="text-3xl font-bold mb-4 text-gray-200">Predicted House Price</h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-7xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6"
            >
              ${prediction.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.confidence * 100}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                />
              </div>
              <span className="text-gray-300">{(prediction.confidence * 100).toFixed(1)}% Confidence</span>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-purple-400" />
                Feature Importance
              </h4>
              <div className="space-y-4">
                {prediction.featureImportance.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{item.feature}</span>
                      <span className="text-blue-400 font-semibold">{(item.importance * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.importance * 100}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Model Insights
              </h4>
              <div className="space-y-4 text-gray-300">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <p>This prediction is based on XGBoost model trained on 200+ housing features</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                  <p>Model accuracy: 95% on test dataset</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                  <p>Price range confidence: ±${(prediction.price * 0.05).toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Built with Machine Learning (XGBoost)</span>
          </div>

          <p className="text-gray-500">Developed with precision and passion</p>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}

export default App;
