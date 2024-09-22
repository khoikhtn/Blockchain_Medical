"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const DoctorProfile = () => {
  const { address: doctorAddress } = useParams();
  const router = useRouter();

  const [info, setInfo] = useState<{
    name: string;
    major: string;
    avatarUrl?: string;
  } | null>(null);

  // Smart contract interaction
  const { data } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "getDoctorInfo",
    args: [doctorAddress, doctorAddress].filter(Boolean) as [string, string],
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

  const { writeContractAsync: removingDoctor } = useScaffoldWriteContract("HealthcareSystem");

  const handleRemoving = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await removingDoctor({
        functionName: "removeDoctors",
        args: [doctorAddress].filter(Boolean) as [string],
      });

      // Redirect to the doctors list after removing successfully
      router.push("/admin/doctorsList");
    } catch (error) {
      console.error("Error removing doctor", error);
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
                <p className="text-gray-600">
                  <span>Major: </span>
                  <strong>{info.major}</strong>
                </p>
              </div>
            </div>

            <hr className="my-8" />

            <form onSubmit={handleRemoving}>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Remove this doctor
              </button>
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
