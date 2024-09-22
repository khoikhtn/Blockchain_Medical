"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import AppointmentsList from "~~/components/AppointmentsList";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Appointments = () => {
  const { address: doctorAddress } = useAccount();

  const [requested, setRequested] = useState<
    {
      patientaddr: string;
      doctoraddr: string;
      date: bigint;
      time: bigint;
      description: string;
    }[]
  >([]);

  const [appointments, setAppointments] = useState<
    {
      patientaddr: string;
      doctoraddr: string;
      date: bigint;
      time: bigint;
      description: string;
    }[]
  >([]);

  // Smart contract interaction

  // Retrieve requested appointments
  const { data: requestedAppointments } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getRequestedAppointments",
    args: [doctorAddress],
  });

  useEffect(() => {
    if (requestedAppointments) {
      setRequested(requestedAppointments as typeof requested);
    }
  }, [requestedAppointments]);

  // Accept requested appointments
  const { writeContractAsync: acceptRequested } = useScaffoldWriteContract("HealthcareSystem");

  const handleAcceptingRequested = async (e: FormEvent, patientAddress: string) => {
    e.preventDefault();

    try {
      await acceptRequested({
        functionName: "acceptAppointment",
        args: [patientAddress],
      });
    } catch (error) {
      console.error("Error accepting requested appointments", error);
    }
  };

  // Retrieve confirmed appointments
  const { data: confirmedAppointments } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getAppointments",
    args: [doctorAddress],
  });

  useEffect(() => {
    if (confirmedAppointments) {
      setAppointments(confirmedAppointments as typeof appointments);
    }
  }, [confirmedAppointments]);

  return (
    <div>
      <AppointmentsList appointments={requested} isRequested={true} onAccept={handleAcceptingRequested} />

      <hr className="border-gray-300 my-10" />

      <AppointmentsList appointments={appointments} isRequested={false} />
    </div>
  );
};

export default Appointments;
