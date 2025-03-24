// Towers of Hanoi game implementation with animations and leaderboard

// Add all CSS styles to document head
function injectStyles() {
  if (document.getElementById('hanoi-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'hanoi-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Press Start 2P", system-ui;
      font-size: 14px;
    }

    .background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(5px);
      transform: scale(1.05);
    }
    
    .background::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.4);
      pointer-events: none;
    }
    
    body {
      background-color: #f5f5f5;
      color: #333;
      line-height: 1.6;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 20px;
      position: relative;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.35);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
      color:rgb(8, 12, 122);
      font-size: 30px;
    }

    .game-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    select, button {
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #ddd;
      background-color: white;
      cursor: pointer;
      font-size: 14px;
    }

    button {
      background-color: #3498db;
      color: white;
      border: none;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #2980b9;
    }

    button:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }

    .stats {
      display: flex;
      gap: 15px;
    }

    .stat-item {
      background-color:rgb(21, 202, 248);
      padding: 8px 12px;
      border-radius: 4px;
      display: flex;
      gap: 5px;
    }

    #reset-btn{
      background-color:rgb(21, 202, 248);
      color: black;
    }

    .game-area {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
      height: 300px;
      position: relative;
    }

    .tower {
      position: relative;
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }

    .rod {
      position: absolute;
      width: 12px;
      height: 250px;
      background-color:rgb(8, 12, 122);
      border-radius: 6px;
      z-index: 1;
    }

    .base {
      position: absolute;
      bottom: 0;
      width: 80%;
      height: 20px;
      background-color: #7f8c8d;
      border-radius: 4px;
      z-index: 2;
    }

    .disks-container {
      position: absolute;
      bottom: 20px;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      width: 100%;
      z-index: 3;
    }

    .disk {
      height: 30px;
      border-radius: 15px;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      transition: transform 0.3s ease;
      cursor: grab;
      will-change: transform;
      transform: translateZ(0);
    }

    .disk.selected {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      transform: translateY(-5px);
    }

    .controls {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .instructions {
      background-color: #ecf0f1;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .instructions h3 {
      margin-bottom: 10px;
      color: #2c3e50;
    }

    .instructions ul {
      padding-left: 20px;
    }

    .leaderboard {
      background-color: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .leaderboard h3 {
      margin-bottom: 10px;
      color: #2c3e50;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
    }

    @keyframes scaleIn {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.7);
      }
      70% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.05);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    @keyframes confetti {
      0% {
        transform: translateY(0) rotate(0);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }

    @keyframes glow {
      0%, 100% {
        text-shadow: 0 0 5px rgba(39, 174, 96, 0.5);
      }
      50% {
        text-shadow: 0 0 20px rgba(39, 174, 96, 0.8), 0 0 30px rgba(39, 174, 96, 0.6);
      }
    }

    #win-message {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      text-align: center;
      z-index: 10;
      backdrop-filter: blur(10px);
    }

    #win-message h2 {
      color: #27ae60;
      margin-bottom: 10px;
    }

    #win-message button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .confetti {
      position: fixed;
      width: 10px;
      height: 10px;
      z-index: 9;
      animation: confetti 3s ease-in-out forwards;
      pointer-events: none;
    }

    .hidden {
      display: none;
    }

    #undo-btn{
      background-color:rgb(21, 202, 248);
      color:black;
    }

    @media (max-width: 768px) {
      .game-controls {
        flex-direction: column;
        align-items: flex-start;
      }

      .stats {
        width: 100%;
        justify-content: space-between;
      }

      .tower {
        width: 33%;
      }

      .disk {
        height: 25px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Load the Spline 3D viewer script for the background
function loadSplineViewer() {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="splinetool/viewer"]')) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.type = 'module';
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.80/build/spline-viewer.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Create the HTML structure for the game
function createGameHTML() {
  try {
    const backgroundDiv = document.createElement('div');
    backgroundDiv.className = 'background';
    document.body.appendChild(backgroundDiv);
    
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
    
    container.innerHTML = `
      <h1>TOWERS OF HANOI</h1>
      
      <div class="game-controls">
        <div class="control-group">
          <label for="disk-count">Number of Disks:</label>
          <select id="disk-count">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <button id="reset-btn">Reset Game</button>
        </div>
        
        <div class="stats">
          <div class="stat-item">
            <span>Moves:</span>
            <span id="move-counter">0</span>
          </div>
          <div class="stat-item">
            <span>Time:</span>
            <span id="timer">00:00</span>
          </div>
          <div class="stat-item">
            <span>Min Moves:</span>
            <span id="min-moves">7</span>
          </div>
        </div>
      </div>
      
      <div id="win-message" class="hidden">
        <h2>Congratulations!</h2>
        <p>You solved the puzzle in <span id="final-moves">0</span> moves and <span id="final-time">00:00</span>!</p>
        <button id="play-again-btn">Play Again</button>
      </div>
      
      <div class="game-area">
        <div class="tower" id="tower-0">
          <div class="rod"></div>
          <div class="base"></div>
          <div class="disks-container"></div>
        </div>
        <div class="tower" id="tower-1">
          <div class="rod"></div>
          <div class="base"></div>
          <div class="disks-container"></div>
        </div>
        <div class="tower" id="tower-2">
          <div class="rod"></div>
          <div class="base"></div>
          <div class="disks-container"></div>
        </div>
      </div>
      
      <div class="controls">
        <button id="undo-btn" disabled>Undo Last Move</button>
      </div>
      
      <div class="instructions">
        <h3>How to Play:</h3>
        <p>Click on a disk to select it, then click on a tower to move it. The goal is to move all disks to the third tower.</p><br>
        <p>Rules:</p>
        <ul>
          <li>Only one disk can be moved at a time</li>
          <li>Only the top disk can be moved</li>
          <li>No larger disk may be placed on top of a smaller disk</li>
        </ul>
      </div>
      
      <div class="leaderboard">
        <h3>Leaderboard</h3>
        <table id="leaderboard-table">
          <thead>
            <tr>
              <th>Disks</th>
              <th>Moves</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="leaderboard-body">
          </tbody>
        </table>
      </div>
    `;
    
    return backgroundDiv;
  } catch (error) {
    console.error('Error creating game HTML:', error);
    return null;
  }
}

// Main initialization function
async function initializeGame() {
  // Game state object
  window.gameState = {
    towers: [[], [], []],       // Array of 3 towers, each containing disk sizes
    selectedDisk: null,         // Currently selected disk
    selectedTower: null,        // Currently selected tower index
    moves: 0,                   // Number of moves made
    startTime: null,            // When the game started
    timerInterval: null,        // Timer interval reference
    gameStarted: false,         // Whether the game has started
    moveHistory: [],            // History of moves for undo functionality
    diskCount: 3,               // Number of disks in the game
  };
  
  injectStyles();
  
  const backgroundDiv = createGameHTML();
  if (!backgroundDiv) {
    console.error('Failed to create game HTML');
    return;
  }
  
  // Load and add 3D background
  try {
    await loadSplineViewer();
    
    requestAnimationFrame(() => {
      try {
        if (!document.querySelector('spline-viewer')) {
          const splineViewer = document.createElement('spline-viewer');
          splineViewer.setAttribute('url', 'https://prod.spline.design/iAufiGfiyFJVJeMy/scene.splinecode');
          backgroundDiv.appendChild(splineViewer);
        }
      } catch (error) {
        console.error('Error adding Spline viewer:', error);
      }
    });
  } catch (error) {
    console.error('Failed to load Spline viewer script:', error);
  }
  
  // Get DOM elements
  const diskCountSelect = document.getElementById("disk-count");
  const resetBtn = document.getElementById("reset-btn");
  const moveCounter = document.getElementById("move-counter");
  const timer = document.getElementById("timer");
  const minMoves = document.getElementById("min-moves");
  const towers = document.querySelectorAll(".tower");
  const undoBtn = document.getElementById("undo-btn");
  const winMessage = document.getElementById("win-message");
  const finalMoves = document.getElementById("final-moves");
  const finalTime = document.getElementById("final-time");
  const playAgainBtn = document.getElementById("play-again-btn");
  const leaderboardBody = document.getElementById("leaderboard-body");

  if (!diskCountSelect || !resetBtn || !moveCounter || !timer || !minMoves || 
      !towers || !undoBtn || !winMessage || !finalMoves || !finalTime || 
      !playAgainBtn || !leaderboardBody) {
    console.error('Some game elements could not be found');
    return;
  }

  initGame();

  // Track event listeners for proper cleanup
  const eventListeners = new Map();
  
  // Helper to add event listeners with tracking
  function addTrackedEventListener(element, event, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
    
    if (!eventListeners.has(element)) {
      eventListeners.set(element, []);
    }
    eventListeners.get(element).push({ event, handler });
  }
  
  // Add event listeners
  addTrackedEventListener(diskCountSelect, "change", function() {
    window.gameState.diskCount = Number.parseInt(this.value);
    resetGame();
  });

  addTrackedEventListener(resetBtn, "click", resetGame);
  
  addTrackedEventListener(playAgainBtn, "click", () => {
    winMessage.classList.add("hidden");
    resetGame();
  });

  addTrackedEventListener(undoBtn, "click", undoMove);

  towers.forEach((tower, index) => {
    addTrackedEventListener(tower, "click", () => handleTowerClick(index));
  });

  // Cleanup function
  window.cleanupHanoiGame = function() {
    if (window.gameState.timerInterval) {
      clearInterval(window.gameState.timerInterval);
    }
    
    eventListeners.forEach((listeners, element) => {
      listeners.forEach(({ event, handler }) => {
        element.removeEventListener(event, handler);
      });
    });
    
    eventListeners.clear();
    window.gameState = null;
  };

  // Initialize the game
  function initGame() {
    window.gameState.diskCount = Number.parseInt(diskCountSelect.value);
    resetGame();
    loadLeaderboard();
  }

  // Reset the game to initial state
  function resetGame() {
    if (window.gameState.timerInterval) {
      clearInterval(window.gameState.timerInterval);
      window.gameState.timerInterval = null;
    }
    
    window.gameState.towers = [[], [], []];
    window.gameState.selectedDisk = null;
    window.gameState.selectedTower = null;
    window.gameState.moves = 0;
    window.gameState.startTime = null;
    window.gameState.gameStarted = false;
    window.gameState.moveHistory = [];

    moveCounter.textContent = "0";
    timer.textContent = "00:00";
    undoBtn.disabled = true;

    // Calculate minimum moves (2^n - 1)
    const minMovesCount = Math.pow(2, window.gameState.diskCount) - 1;
    minMoves.textContent = minMovesCount.toString();

    createDisks();

    towers.forEach((tower) => {
      tower.classList.remove("selected");
    });
  }

  // Create disks based on the selected disk count
  function createDisks() {
    document.querySelectorAll(".disks-container").forEach((container) => {
      container.innerHTML = "";
    });

    const firstTowerContainer = document.querySelector("#tower-0 .disks-container");
    if (!firstTowerContainer) return;

    const fragment = document.createDocumentFragment();

    for (let i = window.gameState.diskCount; i >= 1; i--) {
      const disk = document.createElement("div");
      disk.className = "disk";
      disk.dataset.size = i.toString();

      const width = 40 + i * 20;
      disk.style.width = `${width}px`;
      disk.style.backgroundColor = `hsl(210, 70%, ${40 + i * 5}%)`;
      disk.textContent = i.toString();

      fragment.appendChild(disk);
      window.gameState.towers[0].push(i);
    }
    
    firstTowerContainer.appendChild(fragment);
  }

  // Handle tower click events
  function handleTowerClick(towerIndex) {
    if (!window.gameState.gameStarted) {
      startGame();
    }

    if (window.gameState.selectedTower === null) {
      if (window.gameState.towers[towerIndex].length > 0) {
        window.gameState.selectedTower = towerIndex;
        towers[towerIndex].classList.add("selected");

        const topDisk = document.querySelector(`#tower-${towerIndex} .disk:last-child`);
        if (topDisk) {
          topDisk.classList.add("selected");
        }
      }
    } else {
      if (window.gameState.selectedTower === towerIndex) {
        towers[towerIndex].classList.remove("selected");
        const topDisk = document.querySelector(`#tower-${window.gameState.selectedTower} .disk:last-child`);
        if (topDisk) {
          topDisk.classList.remove("selected");
        }
        window.gameState.selectedTower = null;
        return;
      }

      moveDisk(window.gameState.selectedTower, towerIndex);
    }
  }

  // Move disk between towers with animation
  function moveDisk(fromTower, toTower) {
    if (isValidMove(fromTower, toTower)) {
      saveMove(fromTower, toTower);

      const diskSize = window.gameState.towers[fromTower].pop();
      window.gameState.towers[toTower].push(diskSize);
      window.gameState.moves++;
      moveCounter.textContent = window.gameState.moves.toString();

      const fromContainer = document.querySelector(`#tower-${fromTower} .disks-container`);
      const toContainer = document.querySelector(`#tower-${toTower} .disks-container`);
      
      if (!fromContainer || !toContainer) {
        console.error('Container not found');
        return;
      }
      
      const disk = fromContainer.lastChild;
      if (!disk) {
        console.error('Disk not found');
        return;
      }

      disk.classList.remove("selected");

      // FLIP animation technique
      const fromRect = disk.getBoundingClientRect();
      fromContainer.removeChild(disk);
      toContainer.appendChild(disk);
      const toRect = disk.getBoundingClientRect();

      const deltaX = fromRect.left - toRect.left;
      const deltaY = fromRect.top - toRect.top;

      disk.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      disk.style.transition = "none";
      disk.offsetHeight;

      requestAnimationFrame(() => {
        disk.style.transition = "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)";
        disk.style.transform = "translate(0, 0)";
      });

      undoBtn.disabled = false;
      checkWinCondition();
    }

    towers[fromTower].classList.remove("selected");
    window.gameState.selectedTower = null;
  }

  // Check if a move is valid according to game rules
  function isValidMove(fromTower, toTower) {
    if (window.gameState.towers[fromTower].length === 0) {
      return false;
    }

    if (
      window.gameState.towers[toTower].length === 0 ||
      window.gameState.towers[fromTower][window.gameState.towers[fromTower].length - 1] <
        window.gameState.towers[toTower][window.gameState.towers[toTower].length - 1]
    ) {
      return true;
    }

    return false;
  }

  // Save move to history for undo functionality
  function saveMove(fromTower, toTower) {
    window.gameState.moveHistory.push({
      fromTower,
      toTower,
      diskSize: window.gameState.towers[fromTower][window.gameState.towers[fromTower].length - 1],
    });
  }

  // Undo the last move
  function undoMove() {
    if (window.gameState.moveHistory.length === 0) {
      return;
    }

    const lastMove = window.gameState.moveHistory.pop();
    if (!lastMove) return;

    const diskSize = window.gameState.towers[lastMove.toTower].pop();
    window.gameState.towers[lastMove.fromTower].push(diskSize);

    const fromContainer = document.querySelector(`#tower-${lastMove.toTower} .disks-container`);
    const toContainer = document.querySelector(`#tower-${lastMove.fromTower} .disks-container`);
    
    if (!fromContainer || !toContainer) {
      console.error('Container not found for undo');
      return;
    }
    
    const disk = fromContainer.lastChild;
    if (!disk) {
      console.error('Disk not found for undo');
      return;
    }

    // FLIP animation for undo
    const fromRect = disk.getBoundingClientRect();
    fromContainer.removeChild(disk);
    toContainer.appendChild(disk);
    const toRect = disk.getBoundingClientRect();

    const deltaX = fromRect.left - toRect.left;
    const deltaY = fromRect.top - toRect.top;

    disk.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    disk.style.transition = "none";
    disk.offsetHeight;

    requestAnimationFrame(() => {
      disk.style.transition = "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)";
      disk.style.transform = "translate(0, 0)";
    });

    window.gameState.moves++;
    moveCounter.textContent = window.gameState.moves.toString();

    if (window.gameState.moveHistory.length === 0) {
      undoBtn.disabled = true;
    }
  }

  // Start the game timer
  function startGame() {
    window.gameState.gameStarted = true;
    window.gameState.startTime = new Date();

    if (!window.gameState.timerInterval) {
      window.gameState.timerInterval = setInterval(updateTimer, 1000);
    }
  }

  // Update the timer display
  function updateTimer() {
    if (!timer || !window.gameState.startTime) return;
    
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - window.gameState.startTime) / 1000);

    const minutes = Math.floor(elapsedTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (elapsedTime % 60).toString().padStart(2, "0");

    timer.textContent = `${minutes}:${seconds}`;
  }

  // Check if the game is won
  function checkWinCondition() {
    if (window.gameState.towers[2].length === window.gameState.diskCount) {
      if (window.gameState.timerInterval) {
        clearInterval(window.gameState.timerInterval);
        window.gameState.timerInterval = null;
      }

      finalMoves.textContent = window.gameState.moves.toString();
      finalTime.textContent = timer.textContent;
      winMessage.classList.remove("hidden");

      createConfetti();
      saveToLeaderboard();
    }
  }

  // Create confetti animation for win celebration
  function createConfetti() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = -20 + "px";

        const size = Math.random() * 10 + 5;
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";

        const hue = Math.random() * 360;
        confetti.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        const shapes = ["circle", "square", "triangle"];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        if (shape === "circle") {
          confetti.style.borderRadius = "50%";
        } else if (shape === "triangle") {
          confetti.style.width = "0";
          confetti.style.height = "0";
          confetti.style.backgroundColor = "transparent";
          confetti.style.borderLeft = `${size/2}px solid transparent`;
          confetti.style.borderRight = `${size/2}px solid transparent`;
          confetti.style.borderBottom = `${size}px solid hsl(${hue}, 70%, 50%)`;
        }
        
        const duration = Math.random() * 2 + 2;
        confetti.style.animationDuration = duration + "s";
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, duration * 1000);
      }, i * 20);
    }
  }

  // Save game result to leaderboard
  function saveToLeaderboard() {
    try {
      let leaderboard = [];
      try {
        const storedLeaderboard = localStorage.getItem("hanoi-leaderboard");
        if (storedLeaderboard) {
          leaderboard = JSON.parse(storedLeaderboard);
        }
      } catch (error) {
        console.error("Error loading leaderboard:", error);
        leaderboard = [];
      }

      leaderboard.push({
        disks: window.gameState.diskCount,
        moves: window.gameState.moves,
        time: timer.textContent,
        date: new Date().toLocaleDateString(),
      });

      // Sort by disks (desc), then moves (asc), then time (asc)
      leaderboard.sort((a, b) => {
        if (a.disks !== b.disks) return b.disks - a.disks;
        if (a.moves !== b.moves) return a.moves - b.moves;
        return a.time.localeCompare(b.time);
      });

      leaderboard = leaderboard.slice(0, 10);
      localStorage.setItem("hanoi-leaderboard", JSON.stringify(leaderboard));
      loadLeaderboard();
    } catch (error) {
      console.error("Error saving to leaderboard:", error);
    }
  }

  // Load and display leaderboard from localStorage
  function loadLeaderboard() {
    try {
      let leaderboard = [];
      try {
        const storedLeaderboard = localStorage.getItem("hanoi-leaderboard");
        if (storedLeaderboard) {
          leaderboard = JSON.parse(storedLeaderboard);
        }
      } catch (error) {
        console.error("Error loading leaderboard:", error);
        leaderboard = [];
      }

      leaderboardBody.innerHTML = "";
      const fragment = document.createDocumentFragment();

      leaderboard.forEach((entry) => {
        const row = document.createElement("tr");

        const disksCell = document.createElement("td");
        disksCell.textContent = entry.disks.toString();

        const movesCell = document.createElement("td");
        movesCell.textContent = entry.moves.toString();

        const timeCell = document.createElement("td");
        timeCell.textContent = entry.time;

        const dateCell = document.createElement("td");
        dateCell.textContent = entry.date;

        row.appendChild(disksCell);
        row.appendChild(movesCell);
        row.appendChild(timeCell);
        row.appendChild(dateCell);

        fragment.appendChild(row);
      });

      leaderboardBody.appendChild(fragment);
    } catch (error) {
      console.error("Error updating leaderboard display:", error);
    }
  }
}

// Run the game when the document is loaded
document.addEventListener("DOMContentLoaded", initializeGame);