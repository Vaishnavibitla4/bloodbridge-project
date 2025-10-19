
import Compatability from './Compatibility';

const WhyDonate = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Divider Line */}
        <hr className="border-gray-300 mb-12" />

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-6">
          Why Donate Blood?
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto mb-6">
          Donating blood is one of the simplest and most powerful ways to make a 
          difference in someone’s life. Every few seconds, someone in the world 
          requires blood for survival—whether due to accidents, surgeries, 
          complications during childbirth, or illnesses like cancer and anemia.  
          By donating just one pint of blood, you can save up to 
          <span className="font-bold text-red-600"> three lives</span>.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto mb-12">
          Beyond saving lives, blood donation also contributes to community health 
          by ensuring that hospitals and blood banks are always prepared for emergencies. 
          Regular donors play a vital role in maintaining a safe and sufficient blood supply.  
          Blood cannot be manufactured—it can only come from generous donors like you.  
          By giving blood, you’re not only helping patients but also becoming a part 
          of a compassionate and life-saving network.
        </p>

        {/* Blood Compatibility Chart Image */}
        
        <Compatability />

        {/* Universal Donor/Recipient Info */}
        <div className="max-w-3xl mx-auto text-left text-gray-700">
          <h3 className="text-xl font-bold text-red-600 mb-2">💉 Universal Donor</h3>
          <p className="mb-6">
            People with <span className="font-bold text-red-600">O- blood</span> are 
            considered universal donors. Their blood can be safely transfused to 
            patients of any blood type, making it extremely valuable in emergencies 
            when the patient’s blood type is unknown.
          </p>

          <h3 className="text-xl font-bold text-red-600 mb-2">🩸 Universal Recipient</h3>
          <p>
            People with <span className="font-bold text-red-600">AB+ blood</span> are 
            considered universal recipients. They can receive blood from any blood 
            type, which makes their treatment more flexible in medical emergencies.
          </p>
        </div>
      </div>
      <hr className="border-gray-300 mb-12 mt-[30px]" />
    </section>
  );
};

export default WhyDonate;
