# FinTech Dynamic Scaling Broker

A full-stack cloud computing simulation system for FinTech applications using **REAL CloudSim**, Spring Boot, and React.

## 📋 Overview

This project demonstrates dynamic scaling in cloud environments for FinTech workloads using actual CloudSim simulation. It consists of:

- **Backend**: Spring Boot REST API with **REAL CloudSim 3.0.3** simulation engine
- **Frontend**: Modern React dashboard with glassmorphism UI design
- **Integration**: Real-time data flow from CloudSim → Backend → Frontend via REST API

## ⚠️ IMPORTANT: Real CloudSim Integration

This system uses **ACTUAL CloudSim library** (not mock data):
- CloudSim JAR: `lib/cloudsim-3.0.3.jar`
- Simulation logic: Exact code from `Fintech/project.java`
- Output values: Match CloudSim console output exactly

**Example Real Output:**
- 5 VMs → 200 ms (CloudSim result)
- 10 VMs → 100 ms (CloudSim result)
- Improvement: 50%

## 🏗️ Project Structure

```
Cloud_poject/
├── fintech-backend/              # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/fintech/cloudscaling/
│   │       │   ├── CloudScalingApplication.java    # Main Spring Boot app
│   │       │   ├── config/
│   │       │   │   └── CorsConfig.java             # CORS configuration
│   │       │   ├── controller/
│   │       │   │   └── SimulationController.java    # REST API endpoints
│   │       │   ├── dto/
│   │       │   │   ├── CloudletResult.java          # Cloudlet DTO
│   │       │   │   ├── SimulationRequest.java      # Request DTO
│   │       │   │   └── SimulationResponse.java     # Response DTO
│   │       │   └── service/
│   │       │       └── CloudSimService.java         # CloudSim simulation logic
│   │       └── resources/
│   │           └── application.properties          # App configuration
│   └── pom.xml                                      # Maven dependencies
│
├── fintech-dashboard/           # React Frontend
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── index.css           # Glassmorphism styles
│   │   └── main.jsx            # React entry point
│   ├── package.json            # Node dependencies
│   └── vite.config.js          # Vite configuration
│
└── Fintech/                    # Original CloudSim code
    ├── project.java            # Original simulation
    └── project.class
```

## 🚀 Prerequisites

- **Java 17** or higher
- **Maven 3.6+** 
- **Node.js 18+** and npm
- **Git** (optional)

## 📦 Installation

### 1. Backend Setup (Spring Boot)

Navigate to the backend directory:

```bash
cd fintech-backend
```

Build the project with Maven:

```bash
mvn clean install
```

This will download all dependencies including:
- Spring Boot 3.2.0
- CloudSim 3.0.3
- Lombok

### 2. Frontend Setup (React)

Navigate to the frontend directory:

```bash
cd fintech-dashboard
```

Install dependencies:

```bash
npm install
```

This will install:
- React
- Vite
- Chart.js
- react-chartjs-2

## 🎯 Running the Application

### Step 1: Start the Backend

Open a terminal in the `fintech-backend` directory:

```bash
cd fintech-backend
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

You should see:
```
Started CloudScalingApplication in X.XXX seconds
```

### Step 2: Start the Frontend

Open a new terminal in the `fintech-dashboard` directory:

```bash
cd fintech-dashboard
npm run dev
```

The frontend will start on **http://localhost:5173**

You should see:
```
VITE v8.0.10  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 3: Access the Dashboard

Open your browser and navigate to:
**http://localhost:5173**

## 🔌 API Endpoints

### POST /api/run-simulation

Run a cloud simulation with dynamic scaling comparison.

**Request Body:**
```json
{
  "vmCount": 10,
  "cloudletCount": 50
}
```

**Response:**
```json
{
  "vmCount": 10,
  "cloudletCount": 50,
  "beforeVMs": 10,
  "afterVMs": 20,
  "averageExecutionTime": 10.0,
  "beforeScaling": 20.0,
  "afterScaling": 10.0,
  "improvement": 50.0,
  "cloudlets": [
    {
      "id": 1,
      "vmId": 2,
      "executionTime": 10.5,
      "startTime": 0.1,
      "finishTime": 10.6,
      "priority": "HIGH"
    }
  ]
}
```

**Scaling Logic:**
- **Before Scaling**: Runs CloudSim simulation with user input VMs
- **After Scaling**: Runs CloudSim simulation with 2x VMs (dynamic scaling)
- **Improvement**: Calculated as ((beforeTime - afterTime) / beforeTime) * 100

**Real CloudSim Values:**
- The backend uses actual CloudSim 3.0.3 library
- Simulation logic is extracted from `Fintech/project.java`
- All values (execution times, VM assignments) are from real CloudSim simulation
- No mock or random data is used

### GET /api/health

Health check endpoint.

**Response:**
```
Cloud Scaling Broker API is running
```

## 🎨 Features

### Backend (Spring Boot + CloudSim)
- ✅ REST API for simulation requests
- ✅ **REAL CloudSim 3.0.3 integration** (actual simulation library)
- ✅ Structured JSON responses (no console output)
- ✅ CORS enabled for frontend communication
- ✅ Priority-based task scheduling (FinTech logic)
- ✅ Before/after scaling comparison
- ✅ Exact CloudSim logic from `project.java`

### Frontend (React + Vite)
- ✅ Modern glassmorphism UI design
- ✅ Real-time API integration
- ✅ Interactive input parameters
- ✅ KPI cards with metrics
- ✅ Comparison cards (Before vs After scaling)
- ✅ Cloudlet results table with priority highlighting
- ✅ Chart.js graph for VM scaling performance
- ✅ Loading animations
- ✅ Responsive design
- ✅ Smooth transitions and hover effects

## 🧪 Testing the System

1. **Open the dashboard** at http://localhost:5173
2. **Enter parameters**:
   - Number of VMs: e.g., 10
   - Number of Cloudlets: e.g., 50
3. **Click "Run Simulation"**
4. **Wait for results** (loading animation will show)
5. **View results**:
   - KPI cards showing average execution time
   - Comparison cards showing performance improvement
   - Cloudlet table with detailed results
   - Performance graph

## 🔧 Configuration

### Backend Configuration

Edit `fintech-backend/src/main/resources/application.properties`:

```properties
server.port=8080
spring.application.name=cloud-scaling-broker
logging.level.com.fintech.cloudscaling=INFO
```

### Frontend Configuration

The API endpoint is configured in `fintech-dashboard/src/App.jsx`:

```javascript
const response = await fetch('http://localhost:8080/api/run-simulation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    vmCount: numVMs,
    cloudletCount: numCloudlets
  })
})
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure Java 17+ is installed: `java -version`
- Ensure Maven is installed: `mvn -version`
- Check if port 8080 is already in use
- Try: `mvn clean install` then `mvn spring-boot:run`

### Frontend won't start
- Ensure Node.js 18+ is installed: `node -version`
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is already in use

### API connection error
- Ensure backend is running on http://localhost:8080
- Check browser console for CORS errors
- Verify CORS configuration in `CorsConfig.java`

### CloudSim errors
- Ensure CloudSim dependency is properly downloaded
- Check Maven dependencies: `mvn dependency:tree`

## 📚 Technology Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Application framework
- **CloudSim 3.0.3** - Cloud simulation toolkit (REAL library from `lib/`)
- **Maven** - Build tool
- **Lombok** - Code generation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Chart.js** - Charting library
- **react-chartjs-2** - React wrapper for Chart.js
- **CSS3** - Styling with glassmorphism effects

## 🎓 Educational Purpose

This project is designed for educational purposes to demonstrate:
- Cloud computing simulation concepts
- Dynamic scaling in cloud environments
- Full-stack development with REST APIs
- Modern frontend UI design patterns
- Integration between Java backend and React frontend

## 📝 Notes

- The simulation uses CloudSim to model realistic cloud environments
- Priority-based scheduling simulates FinTech workload requirements
- The glassmorphism UI provides a modern, visually appealing interface
- All code is well-commented for student understanding

## 🤝 Contributing

This is an educational project. Feel free to modify and extend it for learning purposes.

## 📄 License

Educational use only.

---

**Built with ❤️ for Cloud Computing Education**
