'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import {  User, Calendar } from 'lucide-react';

const DoctorsList = () => {

  const { address: connectedAddress } = useAccount();
  const [doctors, setDoctors] = useState<string[]>([]);
  const router = useRouter();

  const handleScheduleAppointment = (doctorAddress: string) => {
    router.push(`/patient/doctorsProfile/${doctorAddress}`);
  }

  // Smart contract interaction

  const { data } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getDoctorsList",
    args: [connectedAddress],
  });

  useEffect(() => {
    if (data) {
      setDoctors([...data])
    }
  }, [data]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-3xl font-semibold text-blue-600 mb-10 flex items-center">
        <User className="mr-3"/>
        Doctors list:
      </h3>
      <ul className="space-y-4">
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-700">{doctor}</span>
              </div>
              <button 
                onClick={() => handleScheduleAppointment(doctor)}
                className="btn btn-error text-lg font-semibold px-6 py-2"
              >
                <Calendar size={18} />
                Set an appointment
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-xl font-bold">No doctors here</li>
        )}
      </ul>
    </div>
  );
}

export default DoctorsList