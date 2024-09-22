"use client";

import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { useAccount } from "wagmi";
import InfoItem from "~~/components/patientInfo/InfoItem";
import { DoctorItems } from "~~/data/doctorItem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type DoctorItem = {
  icon: LucideIcon;
  label: string;
};

type DoctorInfo = {
  name: string;
  major: string;
};

const Profile = () => {
  const { address: connectedAddress } = useAccount();

  const doctorItems: DoctorItem[] = DoctorItems;

  const [info, setInfo] = useState<{
    name: string;
    major: string;
  }>();

  // Smart contract interaction

  // Retrieve Doctor information
  const { data } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getDoctorInfo",
    args: [connectedAddress, connectedAddress],
  });

  useEffect(() => {
    if (data) {
      const [name, major] = data;

      setInfo({
        name: name as string,
        major: major as string,
      });
    }
  }, [data]);

  return (
    info && (
      <div className="md: w-full p-8 bg-gradient-to-b from-white to-blue-50 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-2 border-b-2 border-blue-200">Doctor Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {doctorItems.map((doctorItem, index) => (
            <InfoItem
              key={index}
              icon={doctorItem.icon}
              label={doctorItem.label}
              value={info[doctorItem.label as keyof DoctorInfo]}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Profile;
