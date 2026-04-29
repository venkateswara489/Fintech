import org.cloudbus.cloudsim.*;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.provisioners.*;

import java.text.DecimalFormat;
import java.util.*;

public class project {

    private static List<Cloudlet> cloudletList;
    private static List<Vm> vmList;
    private static Random rand = new Random();

    public static void main(String[] args) {

        System.out.println("===== REALISTIC FINTECH SIMULATION =====");

        runSimulation(5);
        runSimulation(10);
    }

    private static void runSimulation(int vmCount) {

        try {
            CloudSim.init(1, Calendar.getInstance(), false);

            Datacenter datacenter = createDatacenter("DC");

            DatacenterBroker broker = new DatacenterBroker("Broker");
            int brokerId = broker.getId();

            vmList = createVM(brokerId, vmCount);
            cloudletList = createCloudlet(brokerId, 100);

            broker.submitVmList(vmList);
            broker.submitCloudletList(cloudletList);

            CloudSim.startSimulation();

            List<Cloudlet> result = broker.getCloudletReceivedList();

            CloudSim.stopSimulation();

            System.out.println("\n===== " + vmCount + " VMs =====");
            calculateAverageTime(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // ---------------- DATACENTER ----------------
    private static Datacenter createDatacenter(String name) {

        List<Host> hostList = new ArrayList<>();
        List<Pe> peList = new ArrayList<>();

        for (int i = 0; i < 16; i++) {
            int mips = 800 + rand.nextInt(400);
            peList.add(new Pe(i, new PeProvisionerSimple(mips)));
        }

        hostList.add(new Host(
                0,
                new RamProvisionerSimple(16384),
                new BwProvisionerSimple(10000),
                1000000,
                peList,
                new VmSchedulerTimeShared(peList)
        ));

        DatacenterCharacteristics characteristics = new DatacenterCharacteristics(
                "x86", "Linux", "Xen", hostList,
                10.0, 3.0, 0.05, 0.1, 0.1
        );

        try {
            return new Datacenter(name, characteristics,
                    new VmAllocationPolicySimple(hostList),
                    new LinkedList<>(), 0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // ---------------- VM ----------------
    private static List<Vm> createVM(int brokerId, int count) {

        List<Vm> list = new ArrayList<>();

        for (int i = 0; i < count; i++) {

            int mips = 800 + rand.nextInt(400);
            int ram = 512 + rand.nextInt(1024);
            int pes = 1 + rand.nextInt(2);

            Vm vm = new Vm(
                    i, brokerId, mips, pes,
                    ram, 1000, 10000, "Xen",
                    (i % 2 == 0)
                            ? new CloudletSchedulerTimeShared()
                            : new CloudletSchedulerSpaceShared()
            );

            list.add(vm);
        }

        return list;
    }

    // ---------------- CLOUDLETS ----------------
    private static List<Cloudlet> createCloudlet(int brokerId, int count) {

        List<Cloudlet> list = new ArrayList<>();

        for (int i = 0; i < count; i++) {

            // ✅ realistic workload + delay combined
            long baseLength = 20000 + rand.nextInt(50000);
            long delay = rand.nextInt(20000);
            long length = baseLength + delay;

            UtilizationModel dynamicUtil = new UtilizationModel() {
                @Override
                public double getUtilization(double time) {
                    return 0.5 + rand.nextDouble() * 0.5;
                }
            };

            Cloudlet cloudlet = new Cloudlet(
                    i,
                    length,
                    1,
                    300,
                    300,
                    dynamicUtil,
                    dynamicUtil,
                    dynamicUtil
            );

            cloudlet.setUserId(brokerId);
            list.add(cloudlet);
        }

        return list;
    }

    // ---------------- KPI ----------------
    private static void calculateAverageTime(List<Cloudlet> list) {

        double total = 0;

        for (Cloudlet cloudlet : list) {
            total += cloudlet.getActualCPUTime();
        }

        double avg = total / list.size();

        System.out.println("Average Execution Time = " +
                new DecimalFormat("###.##").format(avg));
    }
}