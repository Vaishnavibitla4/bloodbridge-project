import { HeartPulse, Activity, Stethoscope, Scale, AlertCircle } from "lucide-react";

const HealthAssessment = () => {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
        Health Assessment for Donors
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center leading-relaxed">
        Blood donation is a safe process, but ensuring the donor’s health is just
        as important as the patient’s. A quick health assessment helps confirm
        that you’re eligible and ready to donate.
      </p>

      {/* What is Checked */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🩺 What is Checked Before Donation?</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600">
          <HeartPulse className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="text-lg font-semibold">Blood Pressure & Pulse</h3>
          <p className="text-gray-700">
            Ensures your heart and circulation are in a healthy range for donation.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
          <Activity className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-lg font-semibold">Hemoglobin Level</h3>
          <p className="text-gray-700">
            A quick finger-prick test checks if your iron level is sufficient 
            to donate safely.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
          <Scale className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="text-lg font-semibold">Weight & Age</h3>
          <p className="text-gray-700">
            Donors usually must weigh at least <strong>50 kg</strong> and be between 
            <strong>18–65 years</strong>.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-600">
          <Stethoscope className="w-8 h-8 text-yellow-500 mb-2" />
          <h3 className="text-lg font-semibold">General Health Check</h3>
          <p className="text-gray-700">
            Donors should be free from fever, cold, infections, or major illnesses 
            at the time of donation.
          </p>
        </div>
      </div>

      {/* Self-Assessment Guide */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ Self-Assessment Guide</h2>
      <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-12">
        <li>You are in good general health and feeling well today.</li>
        <li>Your weight is above 50 kg and age between 18–65.</li>
        <li>You have not donated blood in the last 3 months (men) or 4 months (women).</li>
        <li>You are not currently on strong medication or antibiotics.</li>
        <li>You have no recent history of surgery, major illness, or chronic disease without medical clearance.</li>
        <li>If you are pregnant, breastfeeding, or recently delivered a baby, donation should be postponed.</li>
      </ul>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-8 rounded-2xl shadow-md flex items-start space-x-4 mb-16">
        <AlertCircle className="w-8 h-8 text-yellow-600 mt-1" />
        <div>
          <h3 className="text-xl font-semibold mb-2">Important to Remember</h3>
          <p className="text-gray-700">
            Every donor is screened carefully to protect both the donor and the
            recipient. If you are found temporarily ineligible, don’t be
            discouraged — most conditions are temporary and you may be able to
            donate in the future.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-red-600 p-10 rounded-2xl text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Your Health, Your Gift 💝</h2>
        <p className="mb-6">
          A quick health check ensures your safety and maximizes the life-saving
          impact of your donation. Stay healthy, stay ready, and save lives!
        </p>
        <a
          href="/become-donor"
          className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Proceed to Donor Registration
        </a>
      </div>
    </div>
  );
};

export default HealthAssessment;
