const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
      <Icon className="h-5 w-5 text-blue-500 mr-6" />
      <div>
        <span className="text-lg font-medium text-gray-500">
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
);

export default InfoItem