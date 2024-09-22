"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import DoctorInfo from "~~/components/DoctorInfo";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CheckRequests = () => {
  const { address: connectedAddress } = useAccount();

  const [requestedDoctors, setRequestedDoctors] = useState<string[]>([]);

  // Smart contract interaction

  // Retrieve requested doctors addresses

  const { data } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getRequestedDoctors",
    args: [connectedAddress],
  });

  useEffect(() => {
    if (data) {
      setRequestedDoctors([...data]);
    }
  }, [data]);

  // Handle grant access to doctors

  const { writeContractAsync: grantAccess } = useScaffoldWriteContract("HealthcareSystem");

  const handleGrantAccess = async (e: FormEvent, doctorAddress: string) => {
    e.preventDefault();

    try {
      await grantAccess({
        functionName: "grantAccess",
        args: [doctorAddress],
      });
    } catch (error) {
      console.error("Error granting access", error);
    }
  };

  return (
    <div>
      <DoctorInfo doctors={requestedDoctors} isRequested={true} onAccept={handleGrantAccess} />
    </div>
  );
};

export default CheckRequests;
