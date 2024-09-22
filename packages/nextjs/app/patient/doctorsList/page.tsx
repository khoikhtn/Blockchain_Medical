'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { User, Calendar } from 'lucide-react';

import DoctorInfo from "~~/components/DoctorInfo";

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
    <div>
      <DoctorInfo
        doctors={doctors}
        isRequested={false}
        onView={handleScheduleAppointment}
      />
    </div>
  );
}

export default DoctorsList