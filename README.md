# 🚀 NASA APOD Explorer – Mission Control Dashboard  
A full-stack NASA Astronomy Picture of the Day (APOD) viewer with a futuristic, mission-control style UI.  
Built using **React (Vite)** + **Node.js / Express** + **NASA Open APIs**, with intelligent caching and professional REST architecture.

---

# 🌌 Overview

NASA APOD Explorer allows users to explore space images and videos through:

- **Today’s APOD**
- **Past APODs via date picker**
- **Recent APOD gallery**
- **NASA Image Library (search thousands of space images)**
- **Detailed modal with HD view, explanation, copyright**
- **Live stats widgets**
- **Light/Dark theme toggle**
- **Responsive mission-control UI**

This project was built following **strict REST principles, caching rules, and secure handling of NASA API keys**, as required by the assessment.

---

# 🎯 Features

### ✅ Frontend (React)
- Stunning Mission Control Interface  
- Today’s APOD section  
- Date Explorer with dynamic date picker  
- Responsive recent gallery with hover animations  
- NASA Image Library search  
- Global search (filters gallery in realtime)  
- Theme toggle (light/dark)  
- Glass-panel cards (blur + transparency)  
- Smooth modals & micro-interactions  
- Loading spinners + error boxes  
- ErrorBoundary for crash-safe UI  

### ✅ Backend (Node.js + Express)
- RESTful API endpoints:
  - `/api/apod/today`
  - `/api/apod/by-date?date=YYYY-MM-DD`
  - `/api/apod/recent?days=10`
  - `/api/apod/range?start_date=&end_date=`
  - `/api/library/search?query=&page=1`
- LRU cache with:
  - Max size  
  - TTL expiry  
  - O(1) access  
- NASA API key handled securely through `.env`
- Consistent JSON error responses  
- Input validation for all endpoints  

---

# 📸 Screenshots
<img width="1880" height="979" alt="Screenshot 2025-11-26 141120" src="https://github.com/user-attachments/assets/df893b22-a3e7-4d23-b89e-7a6f35ed4cfe" />
<img width="1904" height="970" alt="Screenshot 2025-11-26 141818" src="https://github.com/user-attachments/assets/17bf1907-30a6-49b6-99fa-c70683ca1f07" />
<img width="1887" height="951" alt="Screenshot 2025-11-26 141849" src="https://github.com/user-attachments/assets/d070d406-3839-432e-9b90-69b23c9368f5" />
<img width="1887" height="946" alt="Screenshot 2025-11-26 142000" src="https://github.com/user-attachments/assets/aa26d2bf-4cab-4c3d-adb5-ee900ac29ab5" />



