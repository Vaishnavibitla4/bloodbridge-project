import { Droplet, HeartPulse, Activity } from "lucide-react";

const TypesOfBloodDonations = () => {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
        Types of Blood Donations
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center leading-relaxed">
        Blood donation is more than just giving blood—it’s about saving lives. 
        There are several types of donations, each serving a unique medical purpose. 
        Explore the different ways you can make a difference.
      </p>

      {/* Donation Types */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Whole Blood Donation */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-red-500">
          <div className="flex items-center space-x-3 mb-3">
            <Droplet className="text-red-500 w-7 h-7" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Whole Blood Donation
            </h2>
          </div>
          <p className="text-gray-600">
            The most common type of donation. About <strong>350–450 ml</strong> 
            of whole blood is collected. It’s later separated into 
            <span className="font-medium"> red cells, plasma, and platelets</span>, 
            helping up to <strong>3 patients</strong>.
          </p>
        </div>

        {/* Platelet Donation */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-yellow-500">
          <div className="flex items-center space-x-3 mb-3">
            <HeartPulse className="text-yellow-500 w-7 h-7" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Platelet Donation (Apheresis)
            </h2>
          </div>
          <p className="text-gray-600">
            In this method, only <strong>platelets</strong> are collected using 
            a special machine, while other components are returned. 
            Platelets are vital for <span className="font-medium">cancer patients</span>, 
            transplant recipients, and those with clotting disorders.
          </p>
        </div>

        {/* Plasma Donation */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-500">
          <div className="flex items-center space-x-3 mb-3">
            <Activity className="text-blue-500 w-7 h-7" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Plasma Donation
            </h2>
          </div>
          <p className="text-gray-600">
            <strong>Plasma</strong> is the liquid part of blood carrying proteins 
            and clotting factors. It’s often given to 
            <span className="font-medium"> burn, trauma, and shock patients</span>. 
            Plasma can also be stored for making medicines.
          </p>
        </div>

        {/* Double Red Cell Donation */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-green-500">
          <div className="flex items-center space-x-3 mb-3">
            <Droplet className="text-green-500 w-7 h-7" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Double Red Cell Donation
            </h2>
          </div>
          <p className="text-gray-600">
            Here, <strong>two units of red blood cells</strong> are collected at once, 
            while plasma and platelets are returned. It’s especially useful for 
            <span className="font-medium"> accident victims, surgeries, and anemia patients</span>.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-red-50 p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          Every Donation Counts ❤
        </h2>
        <p className="text-gray-700 mb-5">
          No matter which type of donation you choose, 
          your contribution saves lives and brings hope to patients in need.
        </p>
        <a
          href="/become-donor"
          className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
        >
          Become a Donor
        </a>
      </div>
    </div>
  );
};

export default TypesOfBloodDonations;