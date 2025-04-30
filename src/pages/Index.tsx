
import React from 'react';
import TaskDurationCalculator from '../components/TaskDurationCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Task Duration Display</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate how much time you spend on recurring tasks over time
          </p>
        </header>
        
        <TaskDurationCalculator />
        
        <footer className="mt-10 text-center text-gray-500 text-sm">
          <p>© 2035 Task Duration Display. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
