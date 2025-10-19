import React from "react";
import { Mail, Phone } from "lucide-react"; // using lucide-react icons

const ContactUs = () => {
  return (
    <section className="py-16 px-6 bg-gray-50" id="contact">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 mb-12">
          Have questions or need assistance? Reach out to us anytime. We’re here
          to help you.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Card */}
            {/* Email Card */}
<div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center items-center text-center h-full hover:shadow-2xl transition-all duration-300">
  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
    <Mail className="text-red-600 w-8 h-8" />
  </div>
  <h3 className="text-xl font-semibold text-gray-800 mb-2">
    Email Us
  </h3>
  <p className="text-gray-600 mb-4">bloodbridge@gmail.com</p>
  <a
    href="mailto:bloodbridge@gmail.com"
    className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300"
  >
    Send Email
  </a>
</div>


          {/* Call Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-red-600 mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your message here..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
