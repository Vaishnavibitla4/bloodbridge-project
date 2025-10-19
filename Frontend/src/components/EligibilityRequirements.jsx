import { CheckCircle, XCircle, Info, Calendar, Heart } from "lucide-react";

const EligibilityRequirements = () => {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
        Eligibility Requirements
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center leading-relaxed">
        To ensure safety for both donors and recipients, certain criteria must be met
        before donating blood. Check below to see if you are eligible.
      </p>

      {/* Basic Requirements */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ Basic Requirements</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600">
          <Calendar className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="text-lg font-semibold">Age</h3>
          <p className="text-gray-700">18 – 65 years (in some places up to 70 with medical approval).</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
          <Heart className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-lg font-semibold">Weight</h3>
          <p className="text-gray-700">Minimum 50 kg to safely donate one unit of blood.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
          <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="text-lg font-semibold">Hemoglobin</h3>
          <p className="text-gray-700">Hemoglobin levels should be at least 12.5 g/dL.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-600">
          <Info className="w-8 h-8 text-yellow-500 mb-2" />
          <h3 className="text-lg font-semibold">Donation Interval</h3>
          <p className="text-gray-700">
            Men: Every 3 months | Women: Every 4 months
          </p>
        </div>
      </div>

      {/* Temporary Ineligibility */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⏳ Temporary Ineligibility</h2>
      <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-12">
        <li>Cold, flu, sore throat, or infection in the past 2 weeks.</li>
        <li>Recent major surgery (within the last 6 months).</li>
        <li>Pregnancy, breastfeeding, or recently delivered baby (6–12 months).</li>
        <li>Recent blood donation (within 3 months for men, 4 months for women).</li>
        <li>Vaccinations (postpone depending on type: 2–4 weeks).</li>
        <li>Recent tattoos, body piercing, or acupuncture (defer for 6–12 months).</li>
        <li>Travel to malaria-affected or high-risk areas (deferral period varies).</li>
      </ul>

      {/* Permanent Ineligibility */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">❌ Permanent Ineligibility</h2>
      <div className="bg-red-50 p-8 rounded-2xl shadow-md mb-12">
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>History of HIV/AIDS, hepatitis B or C, or other transfusion-transmissible infections.</li>
          <li>Certain chronic illnesses (like severe heart disease, uncontrolled diabetes, epilepsy).</li>
          <li>History of drug abuse with shared needles.</li>
          <li>Severe anemia or blood disorders (e.g., hemophilia, sickle cell disease).</li>
          <li>Certain cancers depending on medical advice.</li>
        </ul>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 p-8 rounded-2xl shadow-md flex items-start space-x-4 mb-16">
        <Info className="w-8 h-8 text-yellow-600 mt-1" />
        <div>
          <h3 className="text-xl font-semibold mb-2">Important to Remember</h3>
          <p className="text-gray-700">
            Eligibility may differ slightly depending on medical guidelines in your
            country. Always consult the donation center’s medical officer for final clearance.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-red-600 p-10 rounded-2xl text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Think You’re Eligible? 🎉</h2>
        <p className="mb-6">
          Your single donation can save up to <strong>3 lives</strong>. Take the
          first step toward becoming a life-saving hero today.
        </p>
        <a
          href="/become-donor"
          className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Become a Donor
        </a>
      </div>
    </div>
  );
};

export default EligibilityRequirements;