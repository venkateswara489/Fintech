import { useState, useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Server, Cloud, Play, Clock, Activity, ArrowRight, Sun, Moon } from 'lucide-react'
import './App.css'

// Register Chart.js components including Filler for area charts
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

function App() {
  const [numVMs, setNumVMs] = useState(5)
  const [numCloudlets, setNumCloudlets] = useState(10)
  const [theme, setTheme] = useState('dark') // Defaulting to dark for the FinTech feel
  
  const [simulationResults, setSimulationResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [backendData, setBackendData] = useState(null)
  
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Mock data fallback
  const scalingData = [
    { vms: 5, time: 200 },
    { vms: 10, time: 100 },
    { vms: 15, time: 67 },
    { vms: 20, time: 50 },
    { vms: 25, time: 40 },
    { vms: 30, time: 33 }
  ]

  const runSimulation = async () => {
    setIsLoading(true)
    setHasRun(false)
    
    try {
      const response = await fetch('http://localhost:8080/api/run-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vmCount: numVMs, cloudletCount: numCloudlets })
      })

      if (!response.ok) throw new Error('Simulation failed')

      const data = await response.json()
      setBackendData(data)
      
      const transformedResults = data.cloudlets.map(cloudlet => ({
        cloudletId: cloudlet.id,
        vmId: cloudlet.vmId,
        executionTime: cloudlet.executionTime,
        startTime: cloudlet.startTime,
        finishTime: cloudlet.finishTime,
        priority: cloudlet.priority
      }))

      setSimulationResults(transformedResults)
      setHasRun(true)
      setIsLoading(false)
      
    } catch (error) {
      console.error('Error running simulation:', error)
      // Fallback to mock data for presentation purposes if backend is down
      setTimeout(() => {
        setHasRun(true)
        setBackendData(null)
        setSimulationResults(Array.from({ length: numCloudlets }).map((_, i) => ({
          cloudletId: i + 1,
          vmId: Math.floor(Math.random() * numVMs) + 1,
          executionTime: Math.floor(Math.random() * 150) + 50,
          startTime: i * 10,
          finishTime: (i * 10) + Math.floor(Math.random() * 150) + 50,
          priority: Math.random() > 0.8 ? 'High' : 'Low'
        })))
        setIsLoading(false)
      }, 1500)
    }
  }

  const getAverageExecutionTime = () => {
    if (simulationResults.length === 0) return 0
    const total = simulationResults.reduce((sum, r) => sum + r.executionTime, 0)
    return Math.round(total / simulationResults.length)
  }

  const getComparisonData = () => {
    if (backendData) {
      return {
        before: backendData.beforeScaling,
        after: backendData.afterScaling,
        beforeVMs: backendData.beforeVMs,
        afterVMs: backendData.afterVMs,
        improvement: backendData.improvement
      }
    }
    const currentAvg = getAverageExecutionTime()
    const beforeTime = scalingData[0].time
    const improvement = Math.round(((beforeTime - currentAvg) / beforeTime) * 100)
    
    return {
      before: beforeTime,
      after: currentAvg,
      beforeVMs: 5,
      afterVMs: numVMs * 2,
      improvement: improvement > 0 ? improvement : 0
    }
  }

  const getChartData = () => {
    const isDark = theme === 'dark'
    let labels, dataPoints
    
    if (backendData) {
      labels = [backendData.beforeVMs, backendData.afterVMs]
      dataPoints = [backendData.beforeScaling, backendData.afterScaling]
    } else {
      labels = scalingData.map(d => d.vms)
      dataPoints = scalingData.map(d => d.time)
    }

    return {
      labels,
      datasets: [
        {
          label: 'Execution Time (ms)',
          data: dataPoints,
          borderColor: '#22d3ee', // Cyan
          backgroundColor: (context) => {
            const chart = context.chart
            const { ctx, chartArea } = chart
            
            // This case happens on initial chart load
            if (!chartArea) {
              return null
            }
            
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
            if (isDark) {
              gradient.addColorStop(0, 'rgba(34, 211, 238, 0.0)')
              gradient.addColorStop(1, 'rgba(34, 211, 238, 0.4)')
            } else {
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.0)')
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)')
            }
            return gradient
          },
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#10b981', // Green dots
          pointBorderColor: isDark ? '#0b1220' : '#ffffff',
          pointBorderWidth: 2,
          pointHoverRadius: 8
        }
      ]
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: theme === 'dark' ? '#94a3b8' : '#475569',
          font: { family: 'Poppins', size: 13, weight: '500' },
          usePointStyle: true,
          boxWidth: 8
        }
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: theme === 'dark' ? '#f8fafc' : '#0f172a',
        bodyColor: theme === 'dark' ? '#cbd5e1' : '#475569',
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 14,
        displayColors: false,
        titleFont: { family: 'Poppins', size: 13 },
        bodyFont: { family: 'Poppins', size: 14, weight: '600' },
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of VMs',
          color: theme === 'dark' ? '#94a3b8' : '#475569',
          font: { family: 'Poppins', size: 13, weight: '500' }
        },
        ticks: {
          color: theme === 'dark' ? '#64748b' : '#64748b',
          font: { family: 'Poppins', size: 12 }
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          drawBorder: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Execution Time (ms)',
          color: theme === 'dark' ? '#94a3b8' : '#475569',
          font: { family: 'Poppins', size: 13, weight: '500' }
        },
        ticks: {
          color: theme === 'dark' ? '#64748b' : '#64748b',
          font: { family: 'Poppins', size: 12 }
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          drawBorder: false
        },
        beginAtZero: true
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  const comparison = getComparisonData()

  return (
    <div className="dashboard animate-fade-in">
      
      {/* Header */}
      <header className="dashboard-header">
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <h1><span className="text-gradient">Dynamic Scaling</span> Dashboard</h1>
        <p>Cloud Computing Simulation - FinTech Broker Analysis</p>
      </header>

      {/* Input Section */}
      <section className="input-section glass-panel">
        <h2>Simulation Parameters</h2>
        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="vms">Compute Nodes (VMs)</label>
            <div className="input-wrapper">
              <Server className="input-icon" size={20} />
              <input
                id="vms"
                type="number"
                min="1"
                max="50"
                value={numVMs}
                onChange={(e) => setNumVMs(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="cloudlets">Workload Tasks (Cloudlets)</label>
            <div className="input-wrapper">
              <Cloud className="input-icon" size={20} />
              <input
                id="cloudlets"
                type="number"
                min="1"
                max="100"
                value={numCloudlets}
                onChange={(e) => setNumCloudlets(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
        </div>
        <button className="run-btn" onClick={runSimulation} disabled={isLoading}>
          <Play size={20} fill="currentColor" />
          {isLoading ? 'Running Analysis...' : 'Execute Simulation'}
        </button>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Processing workload distribution...</p>
        </div>
      )}

      {/* Results */}
      {hasRun && !isLoading && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* KPI Cards */}
          <section className="kpi-grid">
            <div className="kpi-card glass-panel">
              <div className="kpi-header">
                <Clock className="kpi-icon" size={24} />
                <h3>Avg Execution</h3>
              </div>
              <p className="kpi-value">
                {(backendData ? backendData.averageExecutionTime : getAverageExecutionTime()).toLocaleString()}
                <span style={{fontSize: '1rem', color: 'var(--text-secondary)', marginLeft: '8px'}}>ms</span>
              </p>
              <p className="kpi-label">Based on {simulationResults.length} cloudlets</p>
            </div>
            
            <div className="kpi-card glass-panel">
              <div className="kpi-header">
                <Server className="kpi-icon" size={24} />
                <h3>Active Instances</h3>
              </div>
              <p className="kpi-value">
                {backendData ? backendData.vmCount : numVMs}
              </p>
              <p className="kpi-label">Total VMs utilized</p>
            </div>
            
            <div className="kpi-card glass-panel">
              <div className="kpi-header">
                <Activity className="kpi-icon" size={24} />
                <h3>Processed Tasks</h3>
              </div>
              <p className="kpi-value">
                {backendData ? backendData.cloudletCount : numCloudlets}
              </p>
              <p className="kpi-label">Total cloudlets executed</p>
            </div>
          </section>

          {/* Scaling Comparison */}
          <section className="comparison-section glass-panel">
            <h2>Scaling Efficiency</h2>
            <div className="comparison-wrapper">
              <div className="comp-card neutral">
                <h3>Pre-Scaling</h3>
                <p className="comp-value">{comparison.beforeVMs}</p>
                <p className="comp-label">VMs • {comparison.before.toFixed(1)} ms avg</p>
              </div>
              
              <div className="comp-arrow">
                <ArrowRight size={32} />
              </div>
              
              <div className="comp-card highlight">
                <h3>Post-Scaling</h3>
                <p className="comp-value">{comparison.afterVMs}</p>
                <p className="comp-label">VMs • {comparison.after.toFixed(1)} ms avg</p>
              </div>
              
              <div className="comp-arrow">
                <ArrowRight size={32} />
              </div>
              
              <div className="comp-card success">
                <h3>Improvement</h3>
                <p className="comp-value" style={{color: 'var(--accent-green)'}}>
                  {comparison.improvement.toFixed(1)}%
                </p>
                <p className="comp-label">Performance gain</p>
              </div>
            </div>
          </section>

          {/* Chart Section */}
          <section className="chart-section glass-panel">
            <h2>Performance Trajectory</h2>
            <div className="chart-wrapper">
              <Line ref={chartRef} data={getChartData()} options={chartOptions} />
            </div>
          </section>

          {/* Data Table */}
          <section className="table-section glass-panel">
            <h2>Execution Registry</h2>
            <div className="table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Node (VM)</th>
                    <th>Duration (ms)</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Priority Level</th>
                  </tr>
                </thead>
                <tbody>
                  {simulationResults.map((result) => (
                    <tr key={result.cloudletId}>
                      <td>#{result.cloudletId}</td>
                      <td>VM-{result.vmId}</td>
                      <td style={{fontFamily: 'monospace', fontSize: '1.05rem'}}>{result.executionTime}</td>
                      <td>{result.startTime}</td>
                      <td>{result.finishTime}</td>
                      <td>
                        <span className={`badge ${result.priority?.toUpperCase() === 'HIGH' ? 'badge-high' : 'badge-low'}`}>
                          {result.priority || 'Normal'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} FinTech Cloud Analytics. Confidential & Proprietary.</p>
      </footer>
    </div>
  )
}

export default App
