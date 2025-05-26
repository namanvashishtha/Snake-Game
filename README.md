#🐍 Python Code Runner – A Snake-Inspired Programming Game
Python Code Runner is a browser-based game inspired by the classic Snake game, built using React and styled with Tailwind CSS. In this modern twist, you control a snake that represents a Python program, navigating a grid to collect programming elements like functions, variables, and loops—while avoiding bugs and leveraging power-ups like Debug Mode and Speed Boosts.

🎮 Gameplay Features
Objective: Control the snake to collect code elements and earn points, while avoiding bugs that end the game.

Code Elements & Points:

🔷 Functions: +50 points

🟢 Variables: +30 points

🟣 Loops: +40 points

🟡 Debug Mode: +100 points — temporary invincibility

🔵 Speed Boost: +75 points — temporarily increases snake speed

Hazards:

🔴 Bugs: Colliding ends the game.

Controls: Use the arrow keys to move the snake in four directions.

Visual Style: Retro, code-themed aesthetic with responsive design using Tailwind CSS.

Notifications: Real-time feedback via toast messages (powered by sonner).

🧑‍💻 Technical Details
Canvas Size: 600x400 pixels using a 20x20 grid (30x20 cells).

Game Loop: Built using setInterval, with dynamic speed adjustments.

Entity Spawning:

Occurs every 2 seconds

Weighted probabilities:

Functions: 30%

Variables: 30%

Loops: 25%

Bugs: 10%

Debug Mode: 3%

Speed Boost: 2%

State Management: Powered by React Hooks (useState, useEffect, useCallback).

Collision Detection: Wall collisions, self-collisions, and item interactions.

Routing: Includes a custom 404 page (NotFound.tsx) using React Router.

Reusable UI Components: Located under src/components/ui/ for consistency.

📂 Project Structure
plaintext
Copy
Edit
src/
├── Index.tsx                # Entry point
├── PythonCodeRunner.tsx     # Main game logic
├── NotFound.tsx             # 404 error page
├── components/ui/           # Reusable UI elements (Button, Card)

public/                      # Static assets and HTML template
🚀 Getting Started
Prerequisites:
Node.js (v16 or higher)

npm or yarn

Installation:
bash
Copy
Edit
git clone <repository-url>
cd python-code-runner
npm install   # or yarn install
Run the Game:
bash
Copy
Edit
npm start     # or yarn start
Open your browser and visit: http://localhost:3000

📋 Gameplay Instructions
Start the Game: Click “Start Game”.

Control the Snake: Use arrow keys to navigate.

Collect Elements: Gain points from functions, variables, and loops.

Use Power-ups: Debug Mode and Speed Boost offer temporary advantages.

Avoid Hazards: Don't collide with bugs, walls, or yourself.

Game Over: When you crash, reset to try again.

⚠️ Known Limitations
Not optimized for mobile devices (keyboard controls only)

No persistent high score tracking

Single-player only

🌟 Future Improvements
Add touch support for mobile devices

Implement a high score leaderboard

Introduce difficulty levels or custom grid sizes

Add sound effects for collisions and power-ups

🤝 Contributing
We welcome contributions! To contribute:

Fork the repository

Create a feature branch:
git checkout -b feature/your-feature-name

Commit your changes:
git commit -m "Add new feature"

Push to your branch:
git push origin feature/your-feature-name

Open a pull request

