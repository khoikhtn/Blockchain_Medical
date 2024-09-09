'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

import { User, NotepadText } from 'lucide-react';

const PatientsList = () => {

  const { address: connectedAddress } = useAccount();
  const [patients, setPatients] = useState<string[]>([]);
  const router = useRouter();

  const handleViewRecord = (patientAddress: string) => {
    router.push(`/doctor/patientsRecord/${patientAddress}`);
  }

  // Smart contract interaction

  const { data } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getPatientsList",
    args: [connectedAddress],
  });

  useEffect(() => {
    if (data) {
      setPatients([...data])
    }
  }, [data]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-3xl font-semibold text-blue-600 mb-10 flex items-center">
        <User className="mr-3"/>
        Patients list:
      </h3>
      <ul className="space-y-4">
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-700">{patient}</span>
              </div>
              <button
                onClick={() => handleViewRecord(patient)}
                className="btn btn-error text-lg font-semibold px-6 py-2"
              >
                <NotepadText size={18} />
                View record
              </button>
            </li>
          ))
        ) : (
            <li className="text-gray-500 text-xl font-bold">No patients here</li>
        )}
      </ul>
    </div>
  )
}

export default PatientsList