---
title: "Projects"
---

<style>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}
.card img {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
}
.card-content {
  padding: 1rem;
}
.card h3 {
  margin: 0 0 0.5rem;
}
.card .skills {
  margin-top: 0.5rem;
  font-size: 0.85rem;
}
.card a {
  display: inline-block;
  font-size: 0.85rem;
  color: #007acc;
  text-decoration: none;
}
</style>

<div class="card-container">

  <div class="card">
    <img src="/images/Advanced-Color-to-Gray-Conversion.png" alt="Color to Gray" />
    <div class="card-content">
      <h3><a href="/blog/Advanced-Color-to-Gray-Conversion/">Advanced Color to Gray Conversion</a></h3>
      <p>Implemented a SIGGRAPH paper for advanced color-to-grayscale transformation, enhancing visual contrast.</p>
      <div class="skills">Skills: Python, Gray Conversion, Image Processing</div>
      <a target="_blank" href="https://github.com/yanzzzzzzzzz/Advanced-Color-to-Gray-Conversion/blob/master/Report.pdf">Report</a>
      <a target="_blank" href="https://github.com/yanzzzzzzzzz/Advanced-Color-to-Gray-Conversion">GitHub</a>
    </div>
  </div>

  <div class="card">
    <img src="/images/goose-farm.png" alt="Goose Farm" />
    <div class="card-content">
      <h3>Goose Farm Egg Analysis System</h3>
      <p>Developed an egg production analysis system for goose farms using YOLO-based object detection.</p>
      <div class="skills">Skills: C#, Python, YOLO</div>
      <a target="_blank" href="https://ieeexplore.ieee.org/document/8644970">Paper</a>
    </div>
  </div>

  <div class="card">
    <img src="/images/panel-detection.jpg" alt="Panel Defect" />
    <div class="card-content">
      <h3>Panel Defect Detection</h3>
      <p>Built a system for defect classification on display panels using image matching and feature extraction.</p>
      <div class="skills">Skills: MATLAB, Template Matching</div>
    </div>
  </div>

  <div class="card">
    <img src="/images/hand-rehabilitation-game.png" alt="Rehab Game" />
    <div class="card-content">
      <h3>Hand Rehabilitation Game</h3>
      <p>Created an interactive rehabilitation game using Unity and Leap Motion to detect hand gestures in real time.</p>
      <div class="skills">Skills: Unity, C#</div>
      <a target="_blank" href="https://youtu.be/IYXUUOW3wrU?si=VhDoxTl7Gz7xgQmH">Demo</a>
    </div>
  </div>

  <div class="card">
    <img src="/images/indoor-design-project-management-system.png" alt="Indoor Design" />
    <div class="card-content">
      <h3>Indoor Design Project Management</h3>
      <p>Designed a project management system for interior design studios, including task tracking and file management.</p>
      <div class="skills">Skills: Vue, C#, MSSQL</div>
    </div>
  </div>

  <div class="card">
    <img src="/images/Wafer-Inspection.jpg" alt="Wafer Inspection" />
    <div class="card-content">
      <h3>Wafer Inspection System</h3>
      <p>Developed a defect inspection system for semiconductor wafers using motion control and SECS/GEM protocols.</p>
      <div class="skills">Skills: C#, Motion Control, Defect Detection, SECS/GEM</div>
    </div>
  </div>
</div>
