import { Activity, Stethoscope, Pill, Calendar, Image, IdCard } from 'lucide-react';

export const RecordItems = [
  {
    icon: Activity,
    title: 'Description',
    label: 'description',
    rows: 4,
    className: 'w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500',
    placeholder: "Describe the patient's condition here"
  },
  {
    icon: Stethoscope,
    title: 'Diagnosis',
    label: 'diagnosis',
    rows: 2,
    className: 'w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500',
    placeholder: "Enter the diagnosis"
  },
  {
    icon: Pill,
    title: 'Treatment',
    label: 'treatment',
    rows: 2,
    className: 'w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-red-500',
    placeholder: "Describe the treatment plan"
  },
  {
    icon: Calendar,
    title: 'Created',
    label: 'createdTimestamp',
    rows: 0,
    className: '',
    placeholder: ''
  },
  {
    icon: Image,
    title: 'Image',
    label: 'imageUrl',
    rows: 0,
    className: '',
    placeholder: ''
  }
]