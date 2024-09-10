interface MedicalRecord {
  id: bigint;
  description: string;
  diagnosis: string;
  treatment: string;
  imageUrl: string;
  createdTimestamp: bigint;
}

const RecordDisplay = ({ icon: Icon, title, label, record }: { icon: any, title: string, label: string, record: MedicalRecord }) => {

  type RecordInfoKeys = keyof typeof record;

  return (
    <div className="space-y-1 bg-gray-50 rounded-lg shadow-sm p-3">
      <span className="text-lg font-medium text-gray-500 flex items-center gap-1">
        <Icon className="h-4 w-4 text-gray-400" />
        {title}:
      </span>
      {label === 'createdTimestamp' ? (
        <p className="text-lg text-gray-800">
          {new Date(Number(record.createdTimestamp) * 1000).toLocaleString()}
        </p>
      ) : label === 'imageUrl' ? (
          record.imageUrl && record.imageUrl !== '0' ? (
            <div className="col-span-2 mt-4">
              <img
                src={record.imageUrl}
                alt="Record image"
                className="w-full h-auto rounded-lg shadow-md object-contain"
                style={{ maxHeight: '300px' }}
              />
            </div>
          ) : (
              <span className="text-gray-500 italic">No image available</span>
          )
          
      ) : (
        <p className="text-lg text-gray-800">
          {record[label as RecordInfoKeys] as string}
        </p>
      )}
      
    </div>
  )
}
  
export default RecordDisplay