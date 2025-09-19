"use client";

import { useState, useEffect, useCallback } from "react";

// Snake game types
interface SnakeSegment {
  x: number;
  y: number;
}

interface SnakeGameState {
  isActive: boolean;
  snake: SnakeSegment[];
  food: SnakeSegment;
  direction: 'up' | 'down' | 'left' | 'right';
  score: number;
  gameOver: boolean;
}

interface SnakeGameProps {
  onGameUpdate: (gameDisplay: string[]) => void;
}

export const SnakeGame = ({ onGameUpdate }: SnakeGameProps) => {
  const [snakeGame, setSnakeGame] = useState<SnakeGameState>({
    isActive: false,
    snake: [{x: 10, y: 10}],
    food: {x: 15, y: 15},
    direction: 'right',
    score: 0,
    gameOver: false
  });

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * 20) + 1,
      y: Math.floor(Math.random() * 15) + 1
    };
    return newFood;
  }, []);

  // Move snake logic
  const moveSnake = useCallback(() => {
    setSnakeGame(prev => {
      if (!prev.isActive || prev.gameOver) return prev;

      const newSnake = [...prev.snake];
      const head = { x: newSnake[0]?.x ?? 0, y: newSnake[0]?.y ?? 0 };

      // Move head based on direction
      switch (prev.direction) {
        case 'up':
          head.y = (head.y ?? 0) - 1;
          break;
        case 'down':
          head.y = (head.y ?? 0) + 1;
          break;
        case 'left':
          head.x = (head.x ?? 0) - 1;
          break;
        case 'right':
          head.x = (head.x ?? 0) + 1;
          break;
      }

      // Check wall collision
      if ((head.x ?? 0) < 1 || (head.x ?? 0) > 20 || (head.y ?? 0) < 1 || (head.y ?? 0) > 15) {
        return { ...prev, gameOver: true, isActive: false };
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === (head.x ?? 0) && segment.y === (head.y ?? 0))) {
        return { ...prev, gameOver: true, isActive: false };
      }

      newSnake.unshift(head);

      // Check food collision
      if ((head.x ?? 0) === prev.food.x && (head.y ?? 0) === prev.food.y) {
        const newFood = generateFood();
        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          score: prev.score + 10
        };
      } else {
        newSnake.pop();
        return { ...prev, snake: newSnake };
      }
    });
  }, [generateFood]);

  // Handle keyboard input
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!snakeGame.isActive) return;

    e.preventDefault();
    
    switch (e.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        setSnakeGame(prev => ({ ...prev, direction: 'up' }));
        break;
      case 's':
      case 'arrowdown':
        setSnakeGame(prev => ({ ...prev, direction: 'down' }));
        break;
      case 'a':
      case 'arrowleft':
        setSnakeGame(prev => ({ ...prev, direction: 'left' }));
        break;
      case 'd':
      case 'arrowright':
        setSnakeGame(prev => ({ ...prev, direction: 'right' }));
        break;
      case 'escape':
        setSnakeGame(prev => ({ ...prev, isActive: false }));
        break;
      case 'c':
        if (e.ctrlKey || e.metaKey) {
          setSnakeGame(prev => ({ ...prev, isActive: false }));
        }
        break;
    }
  }, [snakeGame.isActive]);

  // Render game board
  const renderSnakeGame = useCallback(() => {
    if (!snakeGame.isActive) return [];

    const board = Array(15).fill(null).map(() => Array(20).fill(' '));
    
    // Place snake
    snakeGame.snake.forEach((segment, index) => {
      if ((segment.x ?? 0) >= 1 && (segment.x ?? 0) <= 20 && (segment.y ?? 0) >= 1 && (segment.y ?? 0) <= 15) {
        const y = (segment.y ?? 0) - 1;
        const x = (segment.x ?? 0) - 1;
        if (board[y] && board[y][x] !== undefined) {
          board[y][x] = index === 0 ? '●' : '○';
        }
      }
    });

    // Place food
    if ((snakeGame.food.x ?? 0) >= 1 && (snakeGame.food.x ?? 0) <= 20 && (snakeGame.food.y ?? 0) >= 1 && (snakeGame.food.y ?? 0) <= 15) {
      const y = (snakeGame.food.y ?? 0) - 1;
      const x = (snakeGame.food.x ?? 0) - 1;
      if (board[y] && board[y][x] !== undefined) {
        board[y][x] = '🍎';
      }
    }

    const gameDisplay = [
      '🐍 Snake Game - Score: ' + snakeGame.score,
      'Use WASD or Arrow Keys to move. ESC to quit.',
      '',
      '┌' + '─'.repeat(20) + '┐',
      ...board.map(row => '│' + row.join('') + '│'),
      '└' + '─'.repeat(20) + '┘',
      '',
      snakeGame.gameOver ? 'Game Over! Press any key to continue.' : 'Game Active - Use WASD to move!'
    ];

    return gameDisplay;
  }, [snakeGame.isActive, snakeGame.snake, snakeGame.food, snakeGame.score, snakeGame.gameOver]);

  // Game loop
  useEffect(() => {
    if (!snakeGame.isActive) return;

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snakeGame.isActive, moveSnake]);

  // Keyboard event listeners
  useEffect(() => {
    if (snakeGame.isActive) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [snakeGame.isActive, handleKeyPress]);

  // Update game display when state changes
  useEffect(() => {
    if (snakeGame.isActive) {
      const gameDisplay = renderSnakeGame();
      if (gameDisplay.length > 0) {
        onGameUpdate(gameDisplay);
      }
    }
  }, [snakeGame.snake, snakeGame.food, snakeGame.score, snakeGame.gameOver, snakeGame.isActive, renderSnakeGame, onGameUpdate]);

  // Public methods
  const startGame = () => {
    setSnakeGame(prev => ({
      ...prev,
      isActive: true,
      gameOver: false,
      snake: [{x: 10, y: 10}],
      food: generateFood(),
      direction: 'right',
      score: 0
    }));
  };

  const stopGame = () => {
    setSnakeGame(prev => ({ ...prev, isActive: false }));
  };

  const isGameActive = () => snakeGame.isActive;

  return {
    startGame,
    stopGame,
    isGameActive,
    gameState: snakeGame
  };
};

export default SnakeGame;
