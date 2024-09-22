import Image from "next/image";
import React from "react";

import { blockchainFeatures } from "~~/data/blockchainFeatures";

type FeatureProps = {
  imageSrc: string;
  title: string;
}

const Feature: React.FC<FeatureProps> = ({ imageSrc, title }) => (
  <div className="flex flex-col items-center">
    <div className="w-40 h-40 mb-16 relative">
      <Image
        src={imageSrc}
        alt={title}
        width={500} 
        height={500}
      />
    </div>
    <h3 className="text-3xl font-bold uppercase">{title}</h3>
  </div>
);

const BlockchainFeatures: React.FC = () => {
  const features: FeatureProps[] = blockchainFeatures;

  return (
    <div id="technology" className="container mx-auto px-4 py-16">
      <h2 className="text-5xl font-bold text-center text-blue-600 mb-52 mt-20">
        UTILIZING BLOCKCHAIN TECHNOLOGY
      </h2>
      <div className="grid grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  )
};

export default BlockchainFeatures;