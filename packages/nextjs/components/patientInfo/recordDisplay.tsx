interface MedicalRecord {
  id: bigint;
  description: string;
  diagnosis: string;
  treatment: string;
  createdTimestamp: bigint;
}

const RecordDisplay = ({ icon: Icon, title, label, record }: { icon: any, title: string, label: string, record: MedicalRecord }) => {

  const { id, createdTimestamp, ...recordInfo } = record;

  type RecordInfoKeys = keyof typeof recordInfo;

  return (
    <div className="space-y-1 bg-gray-50 rounded-lg shadow-sm p-3">
      <span className="text-lg font-medium text-gray-500 flex items-center gap-1">
        <Icon className="h-4 w-4 text-gray-400" />
        {title}:
      </span>
      <p className="text-lg text-gray-800">{record[label as RecordInfoKeys] as string}</p>
    </div>
  )
}
  
export default RecordDisplay