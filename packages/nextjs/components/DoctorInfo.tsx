import React from "react";

import { User, NotepadText, CircleCheckBig } from 'lucide-react';

interface DoctorInfoProps {
  doctors: string[];
  isRequested: boolean;
  onAccept?: (e: React.FormEvent, doctorAddress: string) => void;
  onView?: (doctorAddress: string) => void;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctors, isRequested, onAccept, onView }) => {
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-3xl font-semibold text-blue-600 mb-10 flex items-center">
        <User className="mr-3"/>
        {isRequested ? "Requested doctors list" : "Doctors list"}
      </h3>
      <ul className="space-y-4">
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-700">{doctor}</span>
              </div>
              <button 
                onClick={(e) => {
                  if (isRequested && onAccept) {
                    onAccept(e, doctor);
                  } else if (!isRequested && onView) {
                    onView(doctor);
                  }
                }}
                className={`btn ${isRequested ? "btn-success" : "btn-error"} text-lg font-semibold px-6 py-2`}
              >
                {isRequested ? <CircleCheckBig size={18} /> : <NotepadText size={18} />}
                <span>{isRequested ? "Accept" : "View profile"}</span>
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-xl font-bold">
            {isRequested ? "No requested doctors here" : "No doctors here"}
          </li>
        )}
      </ul>
    </div>
  );

}

export default DoctorInfo