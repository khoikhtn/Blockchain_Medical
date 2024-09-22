"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Icons for doctors and patients

const Statistics = () => {
  const { address: connectedAddress } = useAccount();

  const [doctors, setDoctors] = useState("");
  const [patients, setPatients] = useState("");

  // Smart contract interaction
  const { data: doctorsCount } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getNumberofDoctors",
    args: [connectedAddress],
  });

  const { data: patientsCount } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getNumberofPatients",
    args: [connectedAddress],
  });

  useEffect(() => {
    if (doctorsCount) {
      setDoctors(doctorsCount.toString());
    }

    if (patientsCount) {
      setPatients(patientsCount.toString());
    }
  }, [doctorsCount, patientsCount]);

  return (
    <div className="flex space-x-10 p-10">
      {/* Doctor Card */}
      <div className="bg-blue-100 shadow-md rounded-lg p-8 text-center">
        <User className="text-4xl text-blue-500 mb-4" />
        <h2 className="text-xl font-bold text-blue-700">Number of Doctors</h2>
        <p className="text-3xl font-semibold text-blue-900">{doctorsCount ? doctors : "0"}</p>
      </div>

      {/* Patient Card */}
      <div className="bg-green-100 shadow-md rounded-lg p-8 text-center">
        <User className="text-4xl text-green-500 mb-4" />
        <h2 className="text-xl font-bold text-green-700">Number of Patients</h2>
        <p className="text-3xl font-semibold text-green-900">{patientsCount ? patients : "0"}</p>
      </div>
    </div>
  );
};

export default Statistics;
