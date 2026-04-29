package com.fintech.cloudscaling.controller;

import com.fintech.cloudscaling.dto.SimulationRequest;
import com.fintech.cloudscaling.dto.SimulationResponse;
import com.fintech.cloudscaling.service.CloudSimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for CloudSim simulation endpoints
 * Provides API for running dynamic scaling simulations
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SimulationController {

    @Autowired
    private CloudSimService cloudSimService;

    /**
     * POST endpoint to run simulation
     * Accepts VM count and cloudlet count, returns simulation results
     */
    @PostMapping("/run-simulation")
    public ResponseEntity<SimulationResponse> runSimulation(@RequestBody SimulationRequest request) {
        try {
            // Validate input
            if (request.getVmCount() <= 0 || request.getCloudletCount() <= 0) {
                return ResponseEntity.badRequest().build();
            }

            // Run simulation
            SimulationResponse response = cloudSimService.runSimulation(request);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * GET endpoint for health check
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Cloud Scaling Broker API is running");
    }
}
