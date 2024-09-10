'use client'

import { useParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import PatientInfo from "~~/components/PatientInfo";

const PatientRecord = () => {

  const { address: patientAddress } = useParams();
  const { address: doctorAddress } = useAccount();

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
    records: { id: bigint; description: string; diagnosis: string; treatment: string; imageUrl: string; createdTimestamp: bigint;}[];
    recordCount: bigint;
  }>();

  // Smart contract interaction

  // Retrieve Patient information
  const { data } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getPatientInfo",
    args: [doctorAddress, patientAddress].filter(Boolean) as [string, string],
  });

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
        records: records as { id: bigint; description: string; diagnosis: string; treatment: string; imageUrl: string; createdTimestamp: bigint;}[],
        recordCount: recordCount as bigint
      });
    }
  }, [data]);

  // Add medical record
  const { writeContractAsync: addRecord } = useScaffoldWriteContract("HealthcareSystem");

  const handleAddingRecord = async (e: FormEvent, description: string, diagnosis: string, treatment: string, imageUrl: string, clearInput: () => void) => {

    e.preventDefault();

    try {
      await addRecord(
        {
          functionName: "addRecord",
          args: [patientAddress, description, diagnosis, treatment, imageUrl].filter(Boolean) as [string, string, string, string, string],
        }
      );

      clearInput();
    } catch (error) {
      console.error("Error adding record", error);
    }

  }

  return (
    <div>
      <div>
        {info && <PatientInfo patient={info} fromDoctor={true} onHandlingRecord={handleAddingRecord} />}
      </div>
    </div>
  )
}

export default PatientRecord