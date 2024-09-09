'use client'

import { FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { CircleCheckBig } from 'lucide-react' 

import DoctorInfo from "~~/components/DoctorInfo";

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
      setRequestedDoctors([...data])
    }
  }, [data]);

  // Handle grant access to doctors

  const { writeContractAsync: grantAccess } = useScaffoldWriteContract("HealthcareSystem");

  const handleGrantAccess = async (e: FormEvent, doctorAddress: string) => {

    e.preventDefault();

    try {
      await grantAccess(
        {
          functionName: "grantAccess",
          args: [doctorAddress],
        }
      );
    } catch (error) {
      console.error("Error granting access", error);
    }
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <DoctorInfo
        doctors={requestedDoctors}
        isRequested={true}
        onAccept={handleGrantAccess}
      />
    </div>
  );
}

export default CheckRequests