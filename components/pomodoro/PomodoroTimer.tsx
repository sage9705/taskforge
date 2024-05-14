import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { startTimer, stopTimer, resetTimer } from '../../store/slices/pomodoroSlice';

const PomodoroTimer: React.FC = () => {
  const dispatch = useDispatch();
  const { isRunning, timeLeft, sessionType } = useSelector((state: RootState) => state.pomodoro);
  const [display, setDisplay] = useState('25:00');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(startTimer());
      }, 1000);
    } else if (timeLeft === 0) {
      dispatch(resetTimer());
      alert(`${sessionType === 'work' ? 'Break' : 'Work'} time!`);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, sessionType, dispatch]);

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    setDisplay(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  }, [timeLeft]);

  const handleStartStop = () => {
    if (isRunning) {
      dispatch(stopTimer());
    } else {
      dispatch(startTimer());
    }
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Pomodoro Timer</h2>
      <div className="text-4xl font-bold text-center mb-4">{display}</div>
      <div className="text-center mb-4">{sessionType === 'work' ? 'Work Session' : 'Break Session'}</div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleStartStop}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;