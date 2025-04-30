import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="  min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-10 rounded-2xl shadow-[0_0_30px_rgba(253,224,71,0.15)] border border-yellow-600/30 w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4"
          >
            Contact DishDash
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg"
          >
            We'd love to hear from you! Reach out through any of these channels.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all"
            >
              <div className="p-2 bg-yellow-600/10 rounded-full border border-yellow-600/30">
                <Phone className="text-yellow-400" size={24} />
              </div>
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Phone</h3>
                <p className="text-yellow-400 text-lg font-medium hover:text-yellow-300 transition-colors">
                  +91 8467119022
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all"
            >
              <div className="p-2 bg-yellow-600/10 rounded-full border border-yellow-600/30">
                <Mail className="text-yellow-400" size={24} />
              </div>
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Email</h3>
                <p className="text-yellow-400 text-lg font-medium hover:text-yellow-300 transition-colors">
                  contact@dishdash.com
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all"
            >
              <div className="p-2 bg-yellow-600/10 rounded-full border border-yellow-600/30">
                <MapPin className="text-yellow-400" size={24} />
              </div>
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Address</h3>
                <p className="text-yellow-400 text-lg font-medium hover:text-yellow-300 transition-colors">
                  Bennett University, Noida
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all"
            >
              <div className="p-2 bg-yellow-600/10 rounded-full border border-yellow-600/30">
                <Clock className="text-yellow-400" size={24} />
              </div>
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Opening Hours</h3>
                <div className="space-y-1">
                  <p className="text-yellow-400 text-md">Mon-Fri: 11AM - 10PM</p>
                  <p className="text-yellow-400 text-md">Sat-Sun: 10AM - 11PM</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Placeholder */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gray-800/30 rounded-xl border border-dashed border-yellow-600/30 text-center"
            >
              <p className="text-gray-400 mb-3">Want to send us a message?</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg font-medium transition-all shadow-md"
              >
                Contact Form
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center space-x-6 mt-12"
        >
          {['Twitter', 'Instagram', 'Facebook'].map((social) => (
            <motion.a
              key={social}
              whileHover={{ y: -3 }}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
              href="#"
            >
              {social}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;