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
          <section className="py-20 md:py-32 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-axiforma font-extrabold text-gray-900 dark:text-white mb-4">
                  Why Choose TaskForge?
                </h2>
                <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-inter">
                  Experience the benefits of a well-organized life.
                </p>
              </motion.div>
      
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl"
                  >
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl">
                          {benefit.icon}
                        </div>
                        <h3 className="ml-4 text-xl font-axiforma font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 font-inter">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      };
      
      export default Benefits;