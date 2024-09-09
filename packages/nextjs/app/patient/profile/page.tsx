'use client'

import { useState, useEffect } from "react";
import { useAccount } from "wagmi"
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth"
import PatientInfo from "~~/components/PatientInfo";

const Profile = () => {

  const { address: connectedAddress } = useAccount();

  const [info, setInfo] = useState<{
    name: string;
    phone: string;
    dob: string;
    gender: string;
    bloodType: string;
    height: string;
    weight: string;
    houseAddr: string;
    allergies: string;
    records: { id: bigint; description: string; diagnosis: string; treatment: string; imageUrl: string;  createdTimestamp: bigint; }[];
    recordCount: bigint;
  }>();

  // Smart contract interaction

  // Retrieve Patient information
  const { data } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getPatientInfo",
    args: [connectedAddress, connectedAddress]
  })

  useEffect(() => {
    if (data) {
      
      const [name, phone, dob, gender, bloodType, height, weight, houseAddr, allergies, records, recordCount] = data;

      setInfo({
        name: name as string,
        phone: phone as string,
        dob: dob as string,
        gender: gender as string,
        bloodType: bloodType as string,
        height: height as string,
        weight: weight as string,
        houseAddr: houseAddr as string,
        allergies: allergies as string,
        records: records as { id: bigint; description: string; diagnosis: string; treatment: string; imageUrl: string; createdTimestamp: bigint; }[],
        recordCount: recordCount as bigint
      });
    }
  }, [data]);

  return (
    <div>
      {info && <PatientInfo patient={info} fromDoctor={false} />}
    </div>
    
  )
}

export default Profile