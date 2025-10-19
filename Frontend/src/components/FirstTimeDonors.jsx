import { ShieldCheck, Gift, Users, Zap } from "lucide-react";

const FirstTimeDonors = () => {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
        First-Time Blood Donors
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center leading-relaxed">
        Welcome, hero! Taking the first step to donate blood is a life-saving
        decision. If you’re donating for the very first time, here’s everything
        you should know to feel confident and proud.
      </p>

      {/* Why Donors are Special */}
      <div className="bg-red-50 p-8 rounded-2xl shadow-md mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🌟 Why First-Time Donors Are Extra Special
        </h2>
        <p className="text-gray-700">
          Every day, hospitals need fresh blood supplies. Many regular donors
          started with just one donation — <strong>their first</strong>. That
          single act often inspires a lifetime of giving. By donating for the
          first time, you’re not only saving lives but also joining a community
          of everyday heroes.
        </p>
      </div>

      {/* Myths vs Facts */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🧐 Myths vs Facts</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600">
          <h3 className="text-lg font-semibold mb-2">❌ Myth</h3>
          <p className="text-gray-700">“Donating blood is painful and unsafe.”</p>
          <h3 className="text-lg font-semibold mt-4">✅ Fact</h3>
          <p className="text-gray-700">
            Donation is very safe. The process uses sterile, single-use needles,
            and most people feel only a quick pinch.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
          <h3 className="text-lg font-semibold mb-2">❌ Myth</h3>
          <p className="text-gray-700">“I’ll feel weak for weeks.”</p>
          <h3 className="text-lg font-semibold mt-4">✅ Fact</h3>
          <p className="text-gray-700">
            Your body replenishes the lost fluid within 24 hours, and red blood
            cells within a few weeks. Most donors feel normal the same day.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold mb-2">❌ Myth</h3>
          <p className="text-gray-700">“Only rare blood groups are needed.”</p>
          <h3 className="text-lg font-semibold mt-4">✅ Fact</h3>
          <p className="text-gray-700">
            All blood types are essential, because patients come from every
            group. Even common types are in constant demand.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-600">
          <h3 className="text-lg font-semibold mb-2">❌ Myth</h3>
          <p className="text-gray-700">“I’m too young or too old to donate.”</p>
          <h3 className="text-lg font-semibold mt-4">✅ Fact</h3>
          <p className="text-gray-700">
            Most healthy people aged <strong>18–65</strong> can donate. Age
            limits may vary, but many first-time donors are young students!
          </p>
        </div>
      </div>

      {/* Benefits of Donating */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">💪 Benefits of Donating</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="flex items-start space-x-4 bg-red-50 p-6 rounded-xl shadow-md">
          <ShieldCheck className="w-7 h-7 text-red-500 mt-1" />
          <p className="text-gray-700">
            Free mini health check-up (blood pressure, hemoglobin, pulse).
          </p>
        </div>
        <div className="flex items-start space-x-4 bg-red-50 p-6 rounded-xl shadow-md">
          <Gift className="w-7 h-7 text-green-500 mt-1" />
          <p className="text-gray-700">Feel proud knowing you saved lives!</p>
        </div>
        <div className="flex items-start space-x-4 bg-red-50 p-6 rounded-xl shadow-md">
          <Users className="w-7 h-7 text-blue-500 mt-1" />
          <p className="text-gray-700">Become part of a global community of donors.</p>
        </div>
        <div className="flex items-start space-x-4 bg-red-50 p-6 rounded-xl shadow-md">
          <Zap className="w-7 h-7 text-yellow-500 mt-1" />
          <p className="text-gray-700">Boost your energy by giving back to society.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-red-600 p-10 rounded-2xl text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Be Brave, Be the First! 💉</h2>
        <p className="mb-6">
          Your first donation could be the start of a life-saving journey. Step
          forward with courage — someone out there is waiting for you.
        </p>
        <a
          href="/become-donor"
          className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Register as a Donor
        </a>
      </div>
    </div>
  );
};

export default FirstTimeDonors;