'use client'

import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const DoctorProfile = () => {
  const { address: doctorAddress } = useParams();
  const { address: patientAddress } = useAccount();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const [info, setInfo] = useState<{
    name: string;
    major: string;
    avatarUrl?: string;
  } | null>(null);

  // Smart contract interaction
  const { data } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getDoctorInfo",
    args: [patientAddress, doctorAddress].filter(Boolean) as [string, string],
  });

  useEffect(() => {
    if (data) {
      const [name, major] = data;
      setInfo({
        name: name as string,
        major: major as string,
        avatarUrl: "/default-avatar.png", // Replace with actual avatar URL if available
      });
    }
  }, [data]);

  const { writeContractAsync: scheduling } = useScaffoldWriteContract("HealthcareSystem");

  const handleScheduling = async (e: FormEvent) => {
    
    e.preventDefault();
    try {

      const dateTimestamp = Math.floor(new Date(date).getTime() / 1000);

      const [hours, minutes] = time.split(':').map(Number);
      const timeSeconds = hours * 3600 + minutes * 60;

      await scheduling({
        functionName: "requestAppointment",
        args: [doctorAddress, BigInt(dateTimestamp), BigInt(timeSeconds), description].filter(Boolean) as [string, bigint, bigint, string],
      });
      // Reset form fields after successful scheduling
      setDate('');
      setTime('');
      setDescription('');
    } catch (error) {
      console.error("Error scheduling", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        {info ? (
          <div>
            <div className="flex items-center mb-8">
              <img
                src="https://via.placeholder.com/150"
                alt={`${info.name}'s Avatar`}
                className="w-24 h-24 rounded-full object-cover mr-6"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Dr. {info.name}</h2>
                <p className="text-gray-600"><span>Major: </span><strong>{info.major}</strong></p>
              </div>
            </div>

            <hr className="my-8" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule an Appointment</h3>
            <form onSubmit={handleScheduling} className="space-y-6">
              <div>
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Briefly describe your reason for the appointment"
                ></textarea>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Confirm Appointment
                </button>
              </div>
          
            </form>
          </div>
        ) : (
          <div className="text-center text-gray-500">Doctor information not available.</div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
