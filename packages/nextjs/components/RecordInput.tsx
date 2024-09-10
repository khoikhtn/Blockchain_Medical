import { Icon } from "lucide-react";
import React from "react";

interface RecordInputProps {
  icon: any;
  title: string;
  label: string;
  rows: number;
  className: string;
  placeholder: string;
  info: Record<string, string>;
  handleChangeInfo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RecordInput: React.FC<RecordInputProps> = ({
  icon: Icon,
  title,
  label,
  rows,
  className,
  placeholder,
  info,
  handleChangeInfo
}) => {
  return (
    <div className="space-y-2 mb-4">
      <label htmlFor={label} className="flex items-center text-lg font-medium text-gray-700">
        <Icon className="mr-2 h-5 w-5 text-gray-500" />
        {title}
      </label>

      <textarea
        name={label}
        className={className}
        rows={rows}
        placeholder={placeholder}
        value={info[label as string]}
        onChange={handleChangeInfo}
        required
      />
    </div>
  )
}

export default RecordInput