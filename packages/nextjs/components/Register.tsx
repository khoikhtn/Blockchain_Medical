'use client'

import { patientFormFields, doctorFormFields } from "~~/data/formFields";
import Modal from "./Modal";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/index";

const Register = () => {

  const [info, setInfo] = useState({
    name: '',
    phone: '',
    dob: '',
    gender: '',
    bloodType: '',
    height: '',
    weight: '',
    houseAddr: '',
    allergies: '',
    major: ''
  });

  const router = useRouter();

  const openModal = (dialogId: string) => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    if (dialog) {
      dialog.showModal();
    }
  }

  const closeModal = (dialogId: string) => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    if (dialog) {
      dialog.close();
    }
  }

  const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  }

  // Smart contract interaction
  const { writeContractAsync: registerDoctor } = useScaffoldWriteContract("HealthcareSystem");
  const { writeContractAsync: registerPatient } = useScaffoldWriteContract("HealthcareSystem");

  const handleDoctorRegister = async () => {
    const { name, major } = info;
    try {
      await registerDoctor(
        {
          functionName: "setDoctorProfile",
          args: [name, major],
        }
      );

      // Redirect to the homepage after successful registration
      router.push('/');
    } catch (error) {
      console.error("Error setting doctor profile", error);
    }
  }

  const handlePatientRegister = async () => {
    const { name, phone, dob, gender, bloodType, height, weight, houseAddr, allergies } = info;
    try {
      await registerPatient(
        {
          functionName: "setPatientProfile",
          args: [name, phone, dob, gender, bloodType, height, weight, houseAddr, allergies],
        }
      );

      // Redirect to the homepage after successful registration
      router.push('/');
    } catch (error) {
      console.error("Error setting patient profile", error);
    }
  }

  return (
    <div className="card bg-base-100 w-2/5 shadow-xl mt-20">
      <div className="bg-slate-500 p-4 text-white rounded-xl shadow-md">
        <p className="font-mono font-bold text-3xl text-center">
          We see that you haven't register a role!
        </p>
      </div>
      <div className="card-body">
        <div className="bg-white mb-6">
          <p className="font-mono font-bold text-2xl text-center">
            Please register as a doctor or a patient
          </p>
        </div>

        <div className="flex justify-center">
          <button className="btn btn-success text-xl mr-10" onClick={() => openModal('doctor_btn')}>Doctor</button>
          <Modal
            id="doctor_btn"
            title="Doctor"
            fields={doctorFormFields}
            info={info}
            handleChangeInfo={handleChangeInfo}
            handleSubmit={handleDoctorRegister}
            closeModal={closeModal}
          />

          <button className="btn btn-warning text-xl ml-10" onClick={() => openModal('patient_btn')}>Patient</button>
          <Modal
            id="patient_btn"
            title="Patient"
            fields={patientFormFields}
            info={info}
            handleChangeInfo={handleChangeInfo}
            handleSubmit={handlePatientRegister}
            closeModal={closeModal}
          />
        </div>
        
      </div>
    </div>
  )
}

export default Register