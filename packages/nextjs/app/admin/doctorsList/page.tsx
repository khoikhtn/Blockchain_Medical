"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import DoctorInfo from "~~/components/DoctorInfo";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const GetDoctors = () => {
  const { address: connectedAddress } = useAccount();

  const [requested, setRequested] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<string[]>([]);

  const router = useRouter();

  const handleViewingProfile = (doctorAddress: string) => {
    router.push(`/admin/doctorsProfile/${doctorAddress}`);
  };

  // Smart contract interaction

  // Retrieve requested Doctors list
  const { data: requestedDoctors } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getRequestedDoctorsList",
    args: [connectedAddress],
  });

  // Retrieve Doctors list
  const { data: confirmedDoctors } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getDoctors",
    args: [connectedAddress],
  });

  useEffect(() => {
    if (confirmedDoctors) {
      setDoctors([...confirmedDoctors]);
    }

    if (requestedDoctors) {
      setRequested([...requestedDoctors]);
    }
  }, [confirmedDoctors, requestedDoctors]);

  // Accept requested Doctors
  const { writeContractAsync: acceptRequested } = useScaffoldWriteContract("HealthcareSystem");

  const handleAcceptingrequested = async (e: FormEvent, doctorAddress: string) => {
    e.preventDefault();

    try {
      await acceptRequested({
        functionName: "confirmRegistration",
        args: [doctorAddress],
      });
    } catch (error) {
      console.log("Error accepting requested doctor", error);
    }
  };

  return (
    <div>
      <DoctorInfo doctors={requested} isRequested={true} onAccept={handleAcceptingrequested} />

      <hr className="border-gray-300 my-10" />

      <DoctorInfo doctors={doctors} isRequested={false} onView={handleViewingProfile} />
    </div>
  );
};

export default GetDoctors;
