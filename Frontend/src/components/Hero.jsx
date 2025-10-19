import React from "react";

const Hero = () => {
  return (
    <section
      className="text-black py-32 px-6 text-center"
      style={{ backgroundColor: "#fcfcfc" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading with Blood Drop */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 flex justify-center items-center gap-4">
          Welcome to <span className="text-red-600">BloodBridge</span>
          <img
            src="/blood-drop.svg"
            alt="Blood Drop"
            className="w-20 h-20 object-contain animate-bounce"
          />
        </h2>

        {/* Banner Image */}
        <div className="mb-8 overflow-hidden">
          <img
            src="/hero1.webp"
            alt="BloodBridge banner"
            className="w-full max-w-none h-auto object-cover rounded-lg shadow-lg transform transition-transform duration-1000 hover:scale-105"
          />
        </div>

        {/* Subheading */}
        <p className="text-lg md:text-xl leading-relaxed mb-8 tracking-wide">
          <span className="font-semibold">BloodBridge</span>, a platform
          dedicated to saving lives through the power of connection. Our mission
          is simple: to bridge the gap between blood donors and patients in
          need, ensuring timely support when it matters most.
          <br />
          <br />
          At BloodBridge, we believe that every drop counts. Whether you’re a
          donor willing to give life or a patient searching for a match, our
          platform makes the process easy, secure, and efficient. By connecting
          compassionate individuals with those in urgent need, we aim to create
          a community where helping others is just a click away.
          <br />
          <br />
          Join us in building a world where life-saving blood is always within
          reach—because together, we can make a difference. Our mission is to
          make blood donation simple, accessible, and efficient through digital
          innovation.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center gap-4 mb-16">
          <a
            href="#become-donor"
            className="bg-blue-300 text-red-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-white transition-all duration-300"
          >
            Become a Donor
          </a>
          <a
            href="#need-blood"
            className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-white hover:text-red-700 transition-all duration-300"
          >
            Need Blood
          </a>
        </div>

        {/* New Section: Video + Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Video Section */}
          <div className="rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-105 animate-fadeIn">
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Info Card */}
          <div className="relative p-8 rounded-2xl shadow-xl bg-red-600 text-white 
                          animate-pulseSlow transition-all duration-700 
                          hover:bg-red-100 hover:text-red-700 hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 transition-colors duration-700 hover:text-red-600">
              Why Blood Donation Matters
            </h3>
            <p className="text-lg leading-relaxed transition-colors duration-700">
              Every two seconds, someone in the world needs blood. By donating,
              you’re not just giving blood—you’re giving hope, strength, and
              life to those fighting accidents, surgeries, or life-threatening
              diseases. A single donation can save up to three lives and ensure
              that hospitals never face shortages during emergencies.
              <br />
              <br />
              Be the reason someone smiles again.{" "}
              <span className="text-white hover:text-black">❤️</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
