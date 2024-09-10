import React, { useState, FormEvent, useRef } from 'react';
import { Image, LucideIcon } from 'lucide-react';
import { InfoItems } from '~~/data/infoItem';
import { RecordItems } from '~~/data/recordItem';

import InfoItem from './patientInfo/InfoItem';
import RecordDisplay from './patientInfo/RecordDisplay';
import RecordInput from './RecordInput';

import { pinata } from '~~/utils/pinata_config';

interface PatientInfoProps {
  patient: Patient;
  fromDoctor: boolean;
  onHandlingRecord?: (e: React.FormEvent, description: string, diagnosis: string, treatment: string, imageUrl: string, clearInput: () => void) => void;
}

interface MedicalRecord {
  id: bigint;
  description: string;
  diagnosis: string;
  treatment: string;
  imageUrl: string;
  createdTimestamp: bigint;
}

interface Patient {
  name: string;
  phone: string;
  dob: string;
  gender: string;
  bloodType: string;
  height: string;
  weight: string;
  houseAddr: string;
  allergies: string;
  records: MedicalRecord[];
  recordCount: bigint;
}

interface InfoItem {
  icon: LucideIcon;
  label: string;
}

interface RecordItem {
  icon: LucideIcon;
  title: string;
  label: string;
  rows: number;
  className: string;
  placeholder: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient, fromDoctor, onHandlingRecord }) => {

  const [info, setInfo] = useState({
    description: '',
    diagnosis: '',
    treatment: ''
  });

  const [selectedFile, setSelectedFile]: any = useState('No file chosen');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const infoItems: InfoItem[] = InfoItems;
  
  const recordItems: RecordItem[] = RecordItems;
  const recordInputs: RecordItem[] = RecordItems.slice(0, 3)

  const handleChangeInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  }

  const clearInput = () => {
    
    setInfo({
      description: '',
      diagnosis: '',
      treatment: ''
    });

    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadIPFS = async (e: FormEvent) => {

    e.preventDefault();

    let signedUrl = '0';

    if (selectedFile) {
      try {
        const upload = await pinata.upload.file(selectedFile)
        console.log(upload);

        const signedUrlResult = await pinata.gateways.createSignedURL({
          cid: upload.cid,
          expires: 3600
        });

        signedUrl = signedUrlResult || '0';

      } catch (error) {
        console.log(error);
      }
    }

    if (onHandlingRecord && signedUrl) {
        onHandlingRecord(e, info.description, info.diagnosis, info.treatment, signedUrl, clearInput)
      }
  }

  type PatientInfoKeys = keyof typeof patient;

  return (
    <div className={`${fromDoctor ? 'flex gap-8 h-screen' : ''}`}>

      {/* Left side: Patient Information and Medical Records */}
      <div className={`${fromDoctor ? 'md:w-1/2' : 'md:w-full'} p-8 bg-gradient-to-b from-white to-blue-50 shadow-lg rounded-lg overflow-y-auto`}>
        <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-2 border-b-2 border-blue-200">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {infoItems.map(infoItem => (
            <InfoItem icon={infoItem.icon} label={ infoItem.label } value={patient[infoItem.label as PatientInfoKeys] as string} />
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200">Medical Records</h3>
        {patient.records.length > 0 ? (
          <ul className="space-y-6">
            {patient.records.map(record => (
              <li key={record.id.toString()} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <span className="text-lg font-bold text-gray-500">Record ID: <span className="text-lg font-semibold text-gray-800 ml-1">{record.id.toString()}</span></span>
                  </div>

                  {recordItems.map(item => (
                    <RecordDisplay
                      icon={item.icon}
                      title={item.title}
                      label={item.label}
                      record={record} 
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-xl font-bold text-gray-600 p-4 bg-white rounded-lg shadow-md">No records available</div>
        )}
      </div>

      {/* Right side: Add New Record Form */}
      {fromDoctor && onHandlingRecord && (
        <div className="w-full md:w-1/2 p-8 bg-white shadow-lg rounded-lg h-5/6">
          <h3 className="text-2xl font-semibold text-blue-600 mb-6">Add New Record</h3>
          <form onSubmit={(e) => handleUploadIPFS(e)} className="">
          
            {recordInputs.map(recordInput => (
              <RecordInput
                icon={recordInput.icon}
                title={recordInput.title}
                label={recordInput.label}
                rows={recordInput.rows}
                className={recordInput.className}
                placeholder={recordInput.placeholder}
                info={info}
                handleChangeInfo={handleChangeInfo}
              />
            ))}

            <div className="form-control w-full max-w-xs">
              <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                <Image className='mr-2 h-5 w-5'/>
                Image
              </label>
              <input
                type="file"
                onChange={(e: any) => setSelectedFile(e.target.files[0])}
                ref={fileInputRef}
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </div>

            <div className="flex justify-center mt-20">
              <button
                type="submit"
                className="w-96 bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Record
              </button>
            </div>
          </form>        
        </div>
      )}
    </div>
  );
}

export default PatientInfo;