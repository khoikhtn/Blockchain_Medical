'use client'

import { FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { CircleCheckBig } from 'lucide-react' 

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
      <h3 className="text-3xl font-semibold text-blue-600 mb-10">Requested Doctors</h3>
      <ul className="space-y-4">
        {requestedDoctors.length > 0 ? (
          requestedDoctors.map((doctor, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-700">{doctor}</span>
              </div>
              <form onSubmit={(e) => handleGrantAccess(e, doctor)}>
                <button className="btn btn-success text-lg font-semibold px-6 py-2" type="submit">
                  <CircleCheckBig size={18} />
                  <span>Grant Access</span>
                </button>
              </form>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-xl font-bold">No doctors have requested access</li>
        )}
      </ul>
    </div>
  );



}

export default CheckRequests