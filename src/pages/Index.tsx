
import React from 'react';
import TaskDurationCalculator from '../components/TaskDurationCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Duración de una tarea</h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-full sm:max-w-2xl mx-auto px-2">
            Calcula cuánto tiempo dedicas en tareas recurrentes a lo largo del tiempo, y el coste asociado
          </p>
        </header>
        
        <TaskDurationCalculator />
        
        <footer className="mt-8 sm:mt-10 text-center text-gray-500 text-xs sm:text-sm px-2">
          <p>© 2025 by&nbsp;
            <a href="https://www.linkedin.com/in/miguelangelriesgo/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-800 font-semibold hover:underline">               
              Miguel Ángel Riesgo Álvarez
            </a>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
