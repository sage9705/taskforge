import { motion } from 'framer-motion';

const features = [
  {
    title: 'Easy Task Creation',
    description: 'Quickly add new tasks with just a few clicks.',
    icon: '📝',
  },
  {
    title: 'Task Prioritization',
    description: 'Organize your tasks by importance and due dates.',
    icon: '🏆',
  },
  {
    title: 'Collaborative Lists',
    description: 'Share and collaborate on todo lists with your team or family.',
    icon: '👥',
  },
  {
    title: 'Cross-Platform Sync',
    description: 'Access your todos from any device, anytime.',
    icon: '🔄',
  },
];

const Features = () => {
    return (
      <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-axiforma font-extrabold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-inter">
              Everything you need to stay organized and boost your productivity.
            </p>
          </motion.div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
                <div className="relative bg-white dark:bg-gray-700 p-6 rounded-lg shadow-xl">
                <div className="w-16 h-16 mx-auto flex items-center justify-center text-4xl bg-primary-100 dark:bg-primary-800 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-axiforma font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-inter">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;