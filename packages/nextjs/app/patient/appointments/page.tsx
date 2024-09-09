'use client'

import { useEffect, useState } from "react";
import { useAccount } from "wagmi"
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import AppointmentsList from "~~/components/AppointmentsList";

import { Calendar } from "lucide-react";

const Appointments = () => {

  const { address: patientAddress } = useAccount();

  const [appointments, setAppointments] = useState<{
    patientaddr: string;
    doctoraddr: string;
    date: bigint;
    time: bigint;
    description: string
  }[]>([]);

  // Smart contract interaction

  // Retrieve confirmed appointments
  const { data: confirmedAppointments } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getAppointments",
    args: [patientAddress]
  });

  useEffect(() => {
    if (confirmedAppointments) {
      setAppointments(confirmedAppointments as typeof appointments);
    }
  }, [confirmedAppointments]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="px-6 py-4">
        <AppointmentsList
          appointments={appointments}
          isRequested={false}
        />
        </div>
    </div>

    
  )
}

export default Appointments