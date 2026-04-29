package com.fintech.cloudscaling.dto;

/**
 * DTO for simulation request
 * Contains input parameters for running the simulation
 */
public class SimulationRequest {
    private int vmCount;
    private int cloudletCount;

    public SimulationRequest() {
    }

    public SimulationRequest(int vmCount, int cloudletCount) {
        this.vmCount = vmCount;
        this.cloudletCount = cloudletCount;
    }

    public int getVmCount() {
        return vmCount;
    }

    public void setVmCount(int vmCount) {
        this.vmCount = vmCount;
    }

    public int getCloudletCount() {
        return cloudletCount;
    }

    public void setCloudletCount(int cloudletCount) {
        this.cloudletCount = cloudletCount;
    }
}
