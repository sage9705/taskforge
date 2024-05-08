import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Increased Productivity',
    description: 'Stay focused on what matters most and accomplish more every day.',
    icon: '⚡',
  },
  {
    title: 'Reduced Stress',
    description: 'Never forget important tasks and feel more in control of your life.',
    icon: '😌',
  },
  {
    title: 'Better Time Management',
    description: 'Prioritize your tasks and make the most of your valuable time.',
    icon: '⏰',
  },
  {
    title: 'Goal Achievement',
    description: 'Break down big goals into manageable tasks and track your progress.',
    icon: '🎯',
  },
];

const Benefits = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-axiforma font-extrabold text-text-light dark:text-text-dark sm:text-4xl">
            Why Choose TaskForge?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-inter">
            Experience the benefits of a well-organized life.
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl">
                      {benefit.icon}
                    </div>
                    <h3 className="ml-4 text-xl font-axiforma font-semibold text-text-light dark:text-text-dark">{benefit.title}</h3>
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 font-inter">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;