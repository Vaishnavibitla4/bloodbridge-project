import React from 'react';

const BloodDonationGuide = () => {
  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Header */}
      <header className="text-center py-6 text-red-800">
        <h1 className="text-3xl font-bold">🩸 Blood Donation Guide</h1>
        <p className="text-lg mt-2">Know what to do Before, During, and After donating blood</p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-10">
        {/* Before Donation */}
        <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 animate-bounce">🕒 Before Donation</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Eat a healthy meal (avoid fatty foods).</li>
            <li>Drink plenty of water</li>
            <li>Get a good night's sleep</li>
            <li>Wear a shirt with sleeves that can be rolled up</li>
            <li>Avoid alcohol</li>
          </ul>
        </section>

        {/* During Donation */}
        <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 animate-bounce">💉 During Donation</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Relax and stay calm</li>
            <li>Follow instructions from medical staff</li>
            <li>Let them know if you feel dizzy or uncomfortable</li>
            <li>Enjoy a light snack afterward</li>
            <li>Stay well hydrated</li> 
          </ul>
        </section>

        {/* After Donation */}
        <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 animate-bounce">🌟 After Donation</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Rest for 10–15 minutes before leaving</li>
            <li>Continue drinking fluids throughout the day</li>
            <li>Avoid strenuous activity for 24 hours</li>
            <li>Eat iron-rich foods to replenish your body</li>
            <li>Avoid heavy lifting</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default BloodDonationGuide;