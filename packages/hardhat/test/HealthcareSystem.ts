import { expect } from "chai";
import { ethers } from "hardhat";
import { HealthcareSystem } from "../typechain-types";

describe("HealthcareSystem", function () {
  // We define a fixture to reuse the same setup in every test.

  let healthcareSystem: HealthcareSystem;
  let doctor: any;
  let patient: any;
  let admin: any;

  before(async () => {

    // Get signers
    [doctor, patient] = await ethers.getSigners();

    // Deploy HealthcareSystem contract
    const HealthcareSystemFactory = await ethers.getContractFactory("HealthcareSystem");
    healthcareSystem = (await HealthcareSystemFactory.deploy()) as HealthcareSystem;
    await healthcareSystem.waitForDeployment();

    // Import admin wallet using private key
    const adminPrivateKey = "86cfc34194a2f43f83670d0fd238ae60f9a7d97f38478cb59530f27431e9ce11";
    admin = new ethers.Wallet(adminPrivateKey, ethers.provider);

    // Fund admin wallet from doctor account
    const tx = await doctor.sendTransaction({
      to: admin.address,
      value: ethers.parseEther("1.0"),
    });

    await tx.wait();
  });

  describe("setDoctorProfile", function () {
    it("Should allow a new user to set their profile", async function () {

      await healthcareSystem.connect(doctor).setDoctorProfile("Henry Jekyll", "Cardiology");

      const requestedDoctors = await healthcareSystem.requestedDoctorList(0);
      expect(requestedDoctors).to.equal(doctor.address);

      const doctorProfile = await healthcareSystem.doctors(doctor.address);
      expect(doctorProfile.name).to.equal("Henry Jekyll");
      expect(doctorProfile.major).to.equal("Cardiology");
    });

    it("Should revert if the doctor profile already exists", async function () {

      await expect(
        healthcareSystem.connect(doctor).setDoctorProfile("Smith", "General")
      ).to.be.revertedWith("You already requested to be a doctor");
    });

    it("Check admin", async function () {
      const adminAddress = "0x49745EF0F5E06f3e0d3F6CcB590F100726202011";
      const isAdmin = await healthcareSystem.isAdmin(adminAddress);
      expect(isAdmin).to.be.true;
    })

    it("Admin confirm registration", async function () {

      await healthcareSystem.connect(admin).confirmRegistration(doctor.address);

      const doctorList = await healthcareSystem.doctorList(0);
      expect(doctorList).to.equal(doctor.address);
    })


    it("Register as doctor twice", async function () {

      await expect(
        healthcareSystem.connect(doctor).setDoctorProfile("Smith", "General")
      ).to.be.revertedWith("Doctor profile already exists!");
    })
  });
});
