'use client'

import { FormEvent, useState } from "react"
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const RequestAccess = () => {

  const [address, setAddress] = useState('');

  // Smart contract interaction
  const { writeContractAsync: requestAccess } = useScaffoldWriteContract("HealthcareSystem");

  const handleRequestAccess = async (e: FormEvent) => {

    e.preventDefault();

    try {
      await requestAccess(
        {
          functionName: "requestAccess",
          args: [address]
        }
      );
    } catch (error) {
      console.error("Error handling request access", error);
    }

    setAddress('')
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center pt-20">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Request Access
        </h2>
        <p className="text-center text-lg font-bold text-gray-600 mb-10">
          Enter the patient's address to request access to their medical records.
        </p>
        <form onSubmit={handleRequestAccess} className="space-y-8">
          <input
            type="text"
            className="input input-bordered w-full p-5 text-lg"
            placeholder="Input patient address here"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-error w-full text-xl"
          >
            Request Access
          </button>
        </form>
      </div>
    </div>
  );


}

export default RequestAccess