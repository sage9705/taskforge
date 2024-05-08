import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-axiforma font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Organize Your Life with</span>
            <span className="block text-secondary-300">TaskForge</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-100 font-inter">
            Stay productive and never miss a task. Our intuitive todo app helps you manage your daily activities effortlessly.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link href="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-lato font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Get Started
            </Link>
            <Link href="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-lato font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Log In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;