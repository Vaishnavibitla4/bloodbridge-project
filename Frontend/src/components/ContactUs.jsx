import React from "react";
import { Mail, Phone } from "lucide-react";

const ContactUs = () => {
  // Function to open Gmail with pre-filled recipient and subject
  const handleSendEmail = () => {
    const mailtoLink = `mailto:bloodbridge4u@gmail.com?subject=${encodeURIComponent(
      "Contact Us - BloodBridge"
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className="py-16 px-6 bg-gray-50" id="contact">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 mb-12 text-sm sm:text-base md:text-lg">
          Have questions or need assistance? Reach out to us anytime. We’re here to help you.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center items-center text-center h-full hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
              <Mail className="text-red-600 w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Email Us Directly
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">bloodbridge4u@gmail.com</p>
            <button
              onClick={handleSendEmail}
              className="px-6 py-2 sm:px-8 sm:py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300 w-full sm:w-auto"
            >
              Send Email
            </button>
          </div>

          {/* Call Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center items-center text-center h-full hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
              <Phone className="text-red-600 w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Contact via Phone / WhatsApp
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">+91 xxxxxxxxxx</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              {/* Click-to-call button */}
              <a
                className="px-6 py-2 sm:px-8 sm:py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Call Now
              </a>

              {/* WhatsApp button */}
              <a
                className="px-6 py-2 sm:px-8 sm:py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
