import Image from "next/image";

import { LucideIcon } from 'lucide-react';
import React from "react";
import { healthcareFeatures } from "~~/data/healthcareFeatures";

type FeatureBoxProps = {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon: Icon, title, description}) => (
  <div className="flex flex-col items-start">
    <Icon className="w-12 h-12 text-blue-500 mb-2" />
    <h3 className="text-2xl text-blue-700 font-semibold mb-1">{title}</h3>
    <p className="text-lg text-gray-600">{description}</p>
  </div>
)

const HealthcareFeatures: React.FC = () => {
  const features: FeatureBoxProps[] = healthcareFeatures;

  return (
    <div id="about" className="container mx-auto px-4 pt-14">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src='/doctor.png'
            alt="Doctor"
            width={500}
            height={1000}
            className="rounded-lg"
          />
        </div>

        <div className="md:w-1/2 md:pl-12">
          <div className="grid grid-cols-2 gap-14">
            {features.map((feature, index) => (
              <FeatureBox key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthcareFeatures