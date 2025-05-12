import { CopyPlus } from "lucide-react";

const CreateVaults = () => {
  return (
    <div className="flex flex-row rounded-md justify-between border border-gray-300 shadow-md">
      <div className="flex flex-row m-3 gap-2 items-center justify-between ml-4">
        <CopyPlus className="text-[20px] text-blue-700"/>
        <p className="text-[18px] text-blue-700">Add new vault</p>
      </div>
    </div>
  );
};

export default CreateVaults;
