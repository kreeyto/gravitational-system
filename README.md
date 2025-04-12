# 🌌 Gravitational System Simulator

This is an interactive 2D gravity simulation written in [p5.js](https://p5js.org/). Launch celestial bodies around a central massive object and watch as they orbit, escape, or get swallowed by gravity. Visual trails let you see each path unfold.

## 🧠 Features

- Real-time physics-based motion under Newtonian gravity
- Click and drag to launch new bodies into orbit
- Trails visualize the past trajectory of each object
- Stars in the background for visual depth
- Statistics display total and swallowed bodies

## 🚀 How to Use

1. Click and drag anywhere on the canvas.
2. Release the mouse to launch a new body with velocity based on the drag direction and length.
3. Bodies will be influenced by the central mass and each other.
4. If they collide with the central object, they disappear.

## 🧲 Physics Model

- Gravitational acceleration:\
  $\displaystyle a = G \cdot \frac{M}{r^2}$
- Each body is affected by:
  - The central mass
  - All other existing bodies (mutual attraction)
- Collision detection is based on radial distance

## 📁 Project Structure

- `index.html` — p5.js boilerplate
- `sketch.js` — main logic and rendering
- `GravitationalObject` — class handling body behavior

## ⚙️ Requirements

This project runs entirely in the browser. Just open `index.html` with a modern web browser.

## 📜 License

**No license has been applied to this project.**  
All rights are reserved unless explicitly stated otherwise by the author.

---

> Made with 🪐 and JavaScript
