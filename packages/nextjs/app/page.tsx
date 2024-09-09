"use client";

import type { NextPage } from "next";
import Hero from "~~/components/Hero";
import HealthcareFeatures from "~~/components/homepage/HealthcareFeatures";
import BlockchainFeatures from "~~/components/homepage/BlockchainFeatures";
import Footer from "~~/components/homepage/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <HealthcareFeatures />
      <div className="w-full h-32 bg-blue-500"></div>
      <BlockchainFeatures />
      <Footer />
    </>
  );
};

export default Home;
