package com.fintech.cloudscaling.dto;

import java.util.List;

/**
 * DTO for simulation response
 * Contains all results from the cloud simulation
 */
public class SimulationResponse {
    private int vmCount;
    private int cloudletCount;
    private int beforeVMs;
    private int afterVMs;
    private double averageExecutionTime;
    private double beforeScaling;
    private double afterScaling;
    private double improvement;
    private List<CloudletResult> cloudlets;

    public SimulationResponse() {
    }

    public SimulationResponse(int vmCount, int cloudletCount, int beforeVMs, int afterVMs, double averageExecutionTime, double beforeScaling, double afterScaling, double improvement, List<CloudletResult> cloudlets) {
        this.vmCount = vmCount;
        this.cloudletCount = cloudletCount;
        this.beforeVMs = beforeVMs;
        this.afterVMs = afterVMs;
        this.averageExecutionTime = averageExecutionTime;
        this.beforeScaling = beforeScaling;
        this.afterScaling = afterScaling;
        this.improvement = improvement;
        this.cloudlets = cloudlets;
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

    public int getBeforeVMs() {
        return beforeVMs;
    }

    public void setBeforeVMs(int beforeVMs) {
        this.beforeVMs = beforeVMs;
    }

    public int getAfterVMs() {
        return afterVMs;
    }

    public void setAfterVMs(int afterVMs) {
        this.afterVMs = afterVMs;
    }

    public double getAverageExecutionTime() {
        return averageExecutionTime;
    }

    public void setAverageExecutionTime(double averageExecutionTime) {
        this.averageExecutionTime = averageExecutionTime;
    }

    public double getBeforeScaling() {
        return beforeScaling;
    }

    public void setBeforeScaling(double beforeScaling) {
        this.beforeScaling = beforeScaling;
    }

    public double getAfterScaling() {
        return afterScaling;
    }

    public void setAfterScaling(double afterScaling) {
        this.afterScaling = afterScaling;
    }

    public double getImprovement() {
        return improvement;
    }

    public void setImprovement(double improvement) {
        this.improvement = improvement;
    }

    public List<CloudletResult> getCloudlets() {
        return cloudlets;
    }

    public void setCloudlets(List<CloudletResult> cloudlets) {
        this.cloudlets = cloudlets;
    }
}
