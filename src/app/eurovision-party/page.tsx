"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FlagIcon } from 'react-flag-kit';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-8 py-3 bg-yellow-400 rounded-full text-xl font-semibold shadow-md hover:bg-yellow-300 transition duration-300 ease-in-out"
  >
    {children}
  </button>
);

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-semibold mb-4 text-center">{children}</h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`text-left space-y-2 ${className ?? ''}`}>{children}</div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white text-gray-800 rounded-xl ${className ?? ''}`}>{children}</div>
);

const EurovisonPartyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto p-8 text-center"
      >
        <h1 className="text-5xl font-bold mb-4">🎶 Eurovision.fun 🎉</h1>
        <p className="text-xl mb-8">
          The ultimate Eurovision voting companion! Get your Eurovision Party started and make your viewing experience unforgettable.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <CardHeader>✨ Key Features</CardHeader>
              <ul className="text-left space-y-2">
                <li>✅ Create private voting rooms</li>
                <li>✅ Drag-and-drop intuitive voting</li>
                <li>🏆 Real-time leaderboard updates</li>
                <li>🎖️ Official Eurovision points system</li>
                <li>🚩 Stunning flag animations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <CardHeader>🌟 Perfect For</CardHeader>
              <ul className="text-left">
                <li>🎤 Eurovision viewing parties</li>
                <li>🎧 Fan clubs and communities</li>
                <li>🌍 International music enthusiasts</li>
                <li>👨‍👩‍👧‍👦 Friends & family worldwide</li>
                <li>🎤 Anyone craving Eurovision excitement!</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-10"
        >
          <Button>Download & Get the Party Started!</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-10 flex justify-center space-x-4"
        >
          <FlagIcon code="GB" size={48} />
          <FlagIcon code="SE" size={48} />
          <FlagIcon code="FR" size={48} />
          <FlagIcon code="DE" size={48} />
          <FlagIcon code="ES" size={48} />
        </motion.div>

        <footer className="mt-8 text-gray-200">
          Made with ❤️ by Eurovision fans, for Eurovision fans.
        </footer>
      </motion.div>
    </div>
  );
};

export default EurovisonPartyPage;
