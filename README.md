# Snake-Game
Python Code Runner

Overview

Python Code Runner is a React-based web game inspired by the classic Snake game, themed around Python programming concepts. Players control a snake that represents a Python program, navigating a grid to collect programming elements (functions, variables, loops) while avoiding bugs. Special power-ups like debug mode and speed boosts add strategic depth to the gameplay.

Features





Gameplay: Control a snake to collect programming elements (functions, variables, loops) for points, avoid bugs that end the game, and collect power-ups (debug mode, speed boost).



Scoring:





Functions: +50 points



Variables: +30 points



Loops: +40 points



Debug Mode: +100 points (temporary invincibility)



Speed Boost: +75 points (temporary speed increase)



Controls: Use arrow keys to navigate the snake.



Visuals: Grid-based canvas with a retro, code-themed aesthetic using Tailwind CSS for styling.



Feedback: Toast notifications for game events using the sonner library.

Prerequisites





Node.js (v16 or higher)



npm or yarn



A modern web browser

Installation





Clone the Repository:

git clone <repository-url>
cd python-code-runner



Install Dependencies:

npm install

or

yarn install



Start the Development Server:

npm start

or

yarn start



Open your browser and navigate to http://localhost:3000.

Project Structure





src/Index.tsx: Entry point rendering the PythonCodeRunner component.



src/PythonCodeRunner.tsx: Core game logic, including snake movement, entity generation, collision detection, and UI rendering.



src/NotFound.tsx: 404 error page for invalid routes.



src/components/ui/: Reusable UI components (Button, Card) for consistent styling.



public/: Static assets and HTML template.

Dependencies





React: Frontend framework for building the UI.



React Router DOM: Handles routing, including the 404 page.



Tailwind CSS: Utility-first CSS framework for styling.



Sonner: Toast notification library for game feedback.



Lucide React: Icon library for game elements (e.g., Play, Bug, Trophy).

Gameplay Instructions





Start the Game: Click the "Start Game" button to begin.



Navigate the Snake: Use arrow keys to move the snake (up, down, left, right).



Collect Elements:





Functions (blue): +50 points



Variables (green): +30 points



Loops (purple): +40 points



Debug (yellow): +100 points, activates temporary invincibility



Speed (cyan): +75 points, increases snake speed temporarily



Avoid Bugs (red): Colliding with a bug ends the game.



Game Over: Occurs if the snake hits the wall, itself, or a bug. Reset the game to try again.

Technical Details





Canvas: The game uses a 600x400 pixel canvas with a 20x20 pixel grid (30x20 cells).



Game Loop: Implemented using setInterval for snake movement and entity spawning, with speed adjustments via the speed state.



State Management: React hooks (useState, useEffect, useCallback) manage game state, input handling, and rendering.



Entity Spawning: Entities spawn every 2 seconds with weighted probabilities (functions: 30%, variables: 30%, loops: 25%, bugs: 10%, debug: 3%, speed: 2%).



Collision Detection: Checks for wall collisions, self-collisions, and entity interactions.



Responsive Design: Tailwind CSS ensures the UI adapts to different screen sizes.

Known Limitations





The game is not optimized for mobile devices (arrow key controls are keyboard-based).



No persistent high score system.



Limited to a single-player experience.

Future Improvements





Add touch controls for mobile compatibility.



Implement a high score leaderboard.



Add difficulty levels or customizable grid sizes.



Include sound effects for collisions and power-ups.

Contributing

Contributions are welcome! Please:





Fork the repository.



Create a feature branch (git checkout -b feature/new-feature).



Commit your changes (git commit -m 'Add new feature').



Push to the branch (git push origin feature/new-feature).



Open a pull request.
