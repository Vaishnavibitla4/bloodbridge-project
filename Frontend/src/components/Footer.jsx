import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">BLOODBRIDGE</h2>
          <p className="text-gray-200 text-sm">
            Saving Lives Digitally<br></br>  
            Every drop counts ❤️
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Contact</h3>
          <p className="mb-2 flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" /> bloodbridge@gmail.com
          </p>
          <div className="flex gap-4 mt-2">
            <a href="" className="hover:text-gray-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="" className="hover:text-gray-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="" className="hover:text-gray-300">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 border-t border-red-400 pt-3 text-center text-xs text-gray-200">
        © {new Date().getFullYear()} <span className="font-bold">BloodBridge</span> · 
        Terms & Conditions · Privacy Policy
      </div>
    </footer>
  );
};

export default Footer;
