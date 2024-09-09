import { expect } from "chai";
import { ethers } from "hardhat";
import { HealthcareSystem } from "../typechain-types";

describe("HealthcareSystem", function () {
  // We define a fixture to reuse the same setup in every test.

  let HealthcareSystem: HealthcareSystem;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const HealthcareSystemFactory = await ethers.getContractFactory("HealthcareSystem");
    HealthcareSystem = (await HealthcareSystemFactory.deploy(owner.address)) as HealthcareSystem;
    await HealthcareSystem.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await HealthcareSystem.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await HealthcareSystem.setGreeting(newGreeting);
      expect(await HealthcareSystem.greeting()).to.equal(newGreeting);
    });
  });
});
