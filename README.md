# FinTech Cloud Scaling Simulator

A cloud simulation system for FinTech using CloudSim, Spring Boot, and React.

## Project Structure

- `fintech-backend/` - Spring Boot API
- `fintech-dashboard/` - React dashboard
- `Fintech/` - Original CloudSim code

## Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+
- npm

## Installation

**Backend:**
```bash
cd fintech-backend
mvn clean install
```

**Frontend:**
```bash
cd fintech-dashboard
npm install
```

## Running the Application

**Terminal 1 - Backend:**
```bash
cd fintech-backend
mvn spring-boot:run
```
Runs on http://localhost:8080

**Terminal 2 - Frontend:**
```bash
cd fintech-dashboard
npm run dev
```
Runs on http://localhost:5173

Open http://localhost:5173 in your browser.

## API Endpoints

**POST /api/run-simulation**
```json
{ "vmCount": 10, "cloudletCount": 50 }
```
Runs CloudSim and returns performance metrics.

**GET /api/health**
Health check endpoint.

## Features

**Backend**
- REST API for simulations
- CloudSim 3.0.3 integration
- JSON responses
- CORS enabled
- Before/after scaling comparison

**Frontend**
- React dashboard
- Real-time API integration
- Performance metrics
- Cloudlet results table
- Responsive design

## Usage

1. Open http://localhost:5173
2. Enter VM count and cloudlet count
3. Click "Run Simulation"
4. View performance metrics and results

## Troubleshooting

- Backend won't start: Check Java version and if port 8080 is available
- Frontend won't start: Check Node version and port 5173
- API errors: Ensure backend is running on http://localhost:8080

## Technology Stack

- Java 17, Spring Boot 3.2.0
- CloudSim 3.0.3
- React, Vite, Chart.js
