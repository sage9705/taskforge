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
    <div className="py-24 bg-gradient-to-b from-white to-background-light dark:from-gray-800 dark:to-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-axiforma font-extrabold text-text-light dark:text-text-dark sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-inter">
            Everything you need to stay organized and boost your productivity.
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
                <div className="relative bg-white dark:bg-gray-700 p-6 rounded-lg shadow-xl">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center text-4xl bg-primary-100 dark:bg-primary-800 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-axiforma font-semibold text-text-light dark:text-text-dark mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-inter">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;