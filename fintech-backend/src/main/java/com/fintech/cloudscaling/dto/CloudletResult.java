package com.fintech.cloudscaling.dto;

/**
 * DTO for individual cloudlet result
 * Represents execution data for a single cloudlet
 */
public class CloudletResult {
    private int id;
    private int vmId;
    private double executionTime;
    private double startTime;
    private double finishTime;
    private String priority;

    public CloudletResult() {
    }

    public CloudletResult(int id, int vmId, double executionTime, double startTime, double finishTime, String priority) {
        this.id = id;
        this.vmId = vmId;
        this.executionTime = executionTime;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.priority = priority;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getVmId() {
        return vmId;
    }

    public void setVmId(int vmId) {
        this.vmId = vmId;
    }

    public double getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }

    public double getStartTime() {
        return startTime;
    }

    public void setStartTime(double startTime) {
        this.startTime = startTime;
    }

    public double getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(double finishTime) {
        this.finishTime = finishTime;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
