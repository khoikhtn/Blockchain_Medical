'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/index";

const Hero = () => {

  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  const { data: isDoctor } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "isDoctor",
    args: [connectedAddress],
  });

  const { data: isPatient } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "isPatient",
    args: [connectedAddress],
  })

  const { data: isAdmin } = useScaffoldReadContract({
    contractName: "HealthcareSystem",
    functionName: "isAdmin",
    args: [connectedAddress],
  })

  const handleGetStarted = () => {
    if (isDoctor === true) {
      router.push('/doctor/profile')
    } else if (isPatient === true) {
      router.push('/patient/profile');
    } else if (isAdmin === true) {
      router.push('/admin');
    } else {
      router.push('/register');
    }
  }

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('/Hero/background.jpg')"
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-context text-neutral-content text-center">
        <div className="max-w-6xl">
          <h1 className="mb-10 text-7xl font-bold">
            We Believe Everyone Should Have Easy Access To Great Health Care
          </h1>
          <p className="mb-20 text-3xl">
            As a leading industry innovator, we are opening up exciting new opportunities for healthcare professionals, investors, employees & suppliers.
          </p>
          <button onClick={handleGetStarted} className="btn btn-primary rounded-xl w-48 h-20 text-2xl">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Hero