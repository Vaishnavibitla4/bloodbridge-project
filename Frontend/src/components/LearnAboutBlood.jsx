import { Droplet, Activity, HeartPulse } from "lucide-react";

const LearnAboutBlood = () => {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
        Learn About Blood
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center leading-relaxed">
        Blood is the life-saving fluid that flows through our veins, 
        carrying oxygen, nutrients, and immunity throughout the body. 
        Understanding blood and its components helps us see how important 
        every donation really is.
      </p>

      {/* Components of Blood */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🧬 Components of Blood</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-red-500">
          <Droplet className="w-7 h-7 text-red-500 mb-2" />
          <h3 className="text-xl font-semibold">Red Blood Cells (RBCs)</h3>
          <p className="text-gray-600">
            Carry oxygen from the lungs to the body and return carbon dioxide 
            back to the lungs. They are the most common type of cell in blood.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-yellow-500">
          <HeartPulse className="w-7 h-7 text-yellow-500 mb-2" />
          <h3 className="text-xl font-semibold">Platelets</h3>
          <p className="text-gray-600">
            Tiny cell fragments that help in clotting. They stop bleeding 
            when you get a cut or injury, making them crucial for surgeries 
            and cancer treatments.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-blue-500">
          <Activity className="w-7 h-7 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold">Plasma</h3>
          <p className="text-gray-600">
            The liquid portion of blood that carries proteins, hormones, 
            and nutrients. Plasma also helps in fighting infections.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-green-500">
          <Droplet className="w-7 h-7 text-green-500 mb-2" />
          <h3 className="text-xl font-semibold">White Blood Cells (WBCs)</h3>
          <p className="text-gray-600">
            The defenders of the body. They fight infections and keep the 
            immune system strong against diseases.
          </p>
        </div>
      </div>

      {/* Blood Groups */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🩸 Blood Groups</h2>
      <p className="text-gray-700 mb-6">
        Blood is classified into groups based on the presence of antigens and 
        antibodies. The main groups are:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-10">
        <li><strong>A+</strong> / <strong>A-</strong></li>
        <li><strong>B+</strong> / <strong>B-</strong></li>
        <li><strong>AB+</strong> / <strong>AB-</strong> (Universal Plasma Donor)</li>
        <li><strong>O+</strong> / <strong>O-</strong> (O- is the Universal Donor)</li>
      </ul>

      {/* Fun Facts */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Interesting Facts About Blood</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-red-50 p-6 rounded-xl shadow-sm text-center">
          <p className="text-gray-800 font-semibold">The average adult has about <strong>5 liters</strong> of blood.</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow-sm text-center">
          <p className="text-gray-800 font-semibold">Blood makes up <strong>7–8% of body weight</strong>.</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow-sm text-center">
          <p className="text-gray-800 font-semibold">Every <strong>2 seconds</strong> someone needs blood worldwide.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-red-600 p-10 rounded-2xl text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Blood is Life 💓</h2>
        <p className="mb-6">
          By donating blood, you share this gift of life with others. 
          Even a single donation can save up to <strong>3 lives</strong>.
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

export default LearnAboutBlood;