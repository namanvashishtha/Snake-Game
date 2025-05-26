
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RotateCcw, Trophy, Zap, Bug, Code } from 'lucide-react';
import { toast } from 'sonner';

interface Position {
  x: number;
  y: number;
}

interface GameEntity {
  position: Position;
  type: 'function' | 'variable' | 'loop' | 'bug' | 'debug' | 'speed';
  id: string;
}

const GRID_SIZE = 20;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

const PythonCodeRunner = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [entities, setEntities] = useState<GameEntity[]>([]);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [debugMode, setDebugMode] = useState(false);

  const generateRandomPosition = (): Position => ({
    x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)),
    y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE))
  });

  const generateEntity = (): GameEntity => {
    const types = ['function', 'variable', 'loop', 'bug', 'debug', 'speed'];
    const weights = [30, 30, 25, 10, 3, 2]; // Weighted probability
    let random = Math.random() * 100;
    let selectedType = 'function';
    
    for (let i = 0; i < types.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedType = types[i];
        break;
      }
    }

    return {
      position: generateRandomPosition(),
      type: selectedType as GameEntity['type'],
      id: Math.random().toString(36).substr(2, 9)
    };
  };

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= CANVAS_WIDTH / GRID_SIZE || 
          head.y < 0 || head.y >= CANVAS_HEIGHT / GRID_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        toast.error("Game Over! Hit the wall!");
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        toast.error("Game Over! Bit yourself!");
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check entity collision
      const collisionEntity = entities.find(entity => 
        entity.position.x === head.x && entity.position.y === head.y
      );

      if (collisionEntity) {
        setEntities(prev => prev.filter(e => e.id !== collisionEntity.id));
        
        switch (collisionEntity.type) {
          case 'function':
            setScore(prev => prev + 50);
            toast.success("Collected function()! +50 points");
            break;
          case 'variable':
            setScore(prev => prev + 30);
            toast.success("Collected variable! +30 points");
            break;
          case 'loop':
            setScore(prev => prev + 40);
            toast.success("Collected loop! +40 points");
            break;
          case 'bug':
            setGameOver(true);
            setGameRunning(false);
            toast.error("Bug encountered! Game Over!");
            return currentSnake;
          case 'debug':
            setDebugMode(true);
            setScore(prev => prev + 100);
            toast.success("Debug Mode activated! +100 points");
            setTimeout(() => setDebugMode(false), 5000);
            break;
          case 'speed':
            setSpeed(prev => Math.max(50, prev - 30));
            setScore(prev => prev + 75);
            toast.success("Speed Boost! +75 points");
            setTimeout(() => setSpeed(200), 3000);
            break;
        }
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [direction, gameRunning, gameOver, entities]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameRunning) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
    }
  }, [direction, gameRunning]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setEntities([generateEntity(), generateEntity(), generateEntity()]);
    setScore(0);
    setGameRunning(true);
    setGameOver(false);
    setSpeed(200);
    setDebugMode(false);
    toast.success("Python Code Runner Started!");
  };

  const resetGame = () => {
    setGameRunning(false);
    setGameOver(false);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setEntities([]);
    setScore(0);
    setSpeed(200);
    setDebugMode(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, speed]);

  useEffect(() => {
    if (gameRunning && entities.length < 8) {
      const entityInterval = setInterval(() => {
        setEntities(prev => [...prev, generateEntity()]);
      }, 2000);
      return () => clearInterval(entityInterval);
    }
  }, [gameRunning, entities.length]);

  const getEntityIcon = (type: GameEntity['type']) => {
    switch (type) {
      case 'function': return <Code className="w-3 h-3" />;
      case 'variable': return 'x';
      case 'loop': return '∞';
      case 'bug': return <Bug className="w-3 h-3" />;
      case 'debug': return <Zap className="w-3 h-3" />;
      case 'speed': return '⚡';
      default: return '?';
    }
  };

  const getEntityColor = (type: GameEntity['type']) => {
    switch (type) {
      case 'function': return 'bg-blue-500';
      case 'variable': return 'bg-green-500';
      case 'loop': return 'bg-purple-500';
      case 'bug': return 'bg-red-500';
      case 'debug': return 'bg-yellow-500';
      case 'speed': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="bg-gray-800 border-green-500 p-6 max-w-4xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-400 mb-2 font-mono">
            🐍 Python Code Runner
          </h1>
          <p className="text-gray-300 mb-4">
            Navigate through the code, collect syntax elements, and avoid bugs!
          </p>
          
          <div className="flex justify-center items-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-green-400">
              <Trophy className="w-5 h-5" />
              <span className="font-mono text-xl">Score: {score}</span>
            </div>
            {debugMode && (
              <div className="bg-yellow-500 text-black px-3 py-1 rounded font-mono font-bold animate-pulse">
                DEBUG MODE
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div 
            className="relative bg-black border-2 border-green-500 rounded-lg overflow-hidden"
            style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
          >
            {/* Grid background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #10b981 1px, transparent 1px),
                  linear-gradient(to bottom, #10b981 1px, transparent 1px)
                `,
                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
              }}
            />

            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className={`absolute ${debugMode ? 'bg-yellow-400 border-yellow-600' : 'bg-green-400 border-green-600'} border-2 rounded-sm transition-colors duration-200`}
                style={{
                  left: segment.x * GRID_SIZE,
                  top: segment.y * GRID_SIZE,
                  width: GRID_SIZE - 2,
                  height: GRID_SIZE - 2,
                  opacity: index === 0 ? 1 : 0.8 - (index * 0.1)
                }}
              >
                {index === 0 && (
                  <div className="w-full h-full flex items-center justify-center text-black font-bold text-xs">
                    🐍
                  </div>
                )}
              </div>
            ))}

            {/* Entities */}
            {entities.map((entity) => (
              <div
                key={entity.id}
                className={`absolute ${getEntityColor(entity.type)} border-2 border-white rounded-sm flex items-center justify-center text-white font-bold text-xs animate-pulse`}
                style={{
                  left: entity.position.x * GRID_SIZE,
                  top: entity.position.y * GRID_SIZE,
                  width: GRID_SIZE - 2,
                  height: GRID_SIZE - 2
                }}
              >
                {getEntityIcon(entity.type)}
              </div>
            ))}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-red-400 mb-2">Game Over!</h2>
                  <p className="text-green-400 font-mono">Final Score: {score}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Button 
            onClick={startGame} 
            disabled={gameRunning}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            {gameRunning ? 'Running...' : 'Start Game'}
          </Button>
          <Button 
            onClick={resetGame}
            variant="outline"
            className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p className="mb-2">Use arrow keys to control the Python snake</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <span><Code className="w-3 h-3 inline mr-1" />Functions: +50</span>
            <span className="text-green-400">Variables: +30</span>
            <span className="text-purple-400">Loops: +40</span>
            <span className="text-red-400"><Bug className="w-3 h-3 inline mr-1" />Bugs: Game Over</span>
            <span className="text-yellow-400"><Zap className="w-3 h-3 inline mr-1" />Debug: +100</span>
            <span className="text-cyan-400">⚡ Speed: +75</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PythonCodeRunner;
