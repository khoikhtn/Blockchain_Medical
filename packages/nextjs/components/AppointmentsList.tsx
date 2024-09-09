import React from "react";
import { CalendarDays, Clock, FileText, User, Calendar } from "lucide-react";

interface Appointment {
  patientaddr: string;
  doctoraddr: string;
  date: bigint;
  time: bigint;
  description: string;
}

interface AppointmentsProps {
  appointments: Appointment[];
  isRequested: boolean;
  onAccept?: (e: React.FormEvent, patientAddr: string) => void;
}

const AppointmentsList: React.FC<AppointmentsProps> = ({ appointments, isRequested, onAccept }) => {

  const formatDate = (dateInSeconds: bigint): string => {
    const date = new Date(Number(dateInSeconds) * 1000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeInSeconds: bigint): string => {
    const totalSeconds = Number(timeInSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const renderAppointment = (appointment: Appointment, index: number) => (
    <div key={index} className="bg-white shadow-lg rounded-xl mb-8 overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <h3 className="text-2xl font-bold text-white">Appointment #{index + 1}</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50">
            <User className="h-6 w-6 mr-3 text-blue-600" />
            <div>
              <span className="text-lg font-semibold text-gray-700">Patient:</span>
              <span className="ml-2 font-medium text-gray-900 truncate">{appointment.patientaddr}</span>
            </div>
          </div>
          <div className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50">
            <User className="h-6 w-6 mr-3 text-green-600" />
            <div>
              <span className="text-lg font-semibold text-gray-700">Doctor:</span>
              <span className="ml-2 font-medium text-gray-900 truncate">{appointment.doctoraddr}</span>
            </div>
          </div>
          <div className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50">
            <CalendarDays className="h-6 w-6 mr-3 text-red-600" />
            <div>
              <span className="text-lg font-semibold text-gray-700">Date:</span>
              <span className="ml-2 font-medium text-gray-900">{formatDate(appointment.date)}</span>
            </div>
          </div>
          <div className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50">
            <Clock className="h-6 w-6 mr-3 text-yellow-600" />
            <div>
              <span className="text-lg font-semibold text-gray-700">Time:</span>
              <span className="ml-2 font-medium text-gray-900">{formatTime(appointment.time)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
          <div className="flex items-start space-x-4">
            <FileText className="h-6 w-6 text-gray-900" />
            <div>
              <span className="text-lg font-semibold text-gray-900">Description:</span>
              <p className="mt-2 text-gray-800 text-lg bg-white p-3 rounded-md shadow-inner">
                {appointment.description}
              </p>
            </div>
          </div>
        </div>

        {isRequested && onAccept && (
          <form onSubmit={(e) => onAccept(e, appointment.patientaddr)} className="mt-6 flex justify-center">
            <button 
              type="submit" 
              className="w-72 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              Accept Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-8 p-6 bg-gray-100 rounded-2xl">
      {appointments.length > 0 ? (
        <div>
          <h3 className="text-3xl font-semibold text-blue-600 mb-10 flex items-center bg-white p-4 rounded-lg shadow">
            <Calendar className="mr-3"/>
            {isRequested ? "Requested Appointments:" : "Appointments:"}
          </h3>
          {appointments.map(renderAppointment)}
        </div>
      ) : (
        <p className="font-bold text-2xl text-center text-gray-500 py-8 bg-white rounded-lg shadow">
          {isRequested ? "No requested appointments available" : "No appointments available"}
        </p>
      )}
    </div>
  );
};

export default AppointmentsList;