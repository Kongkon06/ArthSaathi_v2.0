import { Dot, EllipsisVertical, ListTodo, Pencil, Tag } from "lucide-react";
import { BsShieldLock } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const VaultsCard = ({ title, goalsCount, tasksCount, tagsCount }:any) => {
  return (
    <div className="flex flex-row bg-white rounded-md justify-between border border-gray-300 shadow-md">
      <div className="flex flex-row m-3 gap-1 items-center justify-between ml-4">
        <BsShieldLock className="w-[18px] h-[20px]" />
        <p className="text-[18px]">{title}</p>
        <button className="ml-1"><Pencil className="w-[14px] h-[14px]" /></button>
      </div>

      <div className="items-center flex flex-row text-end">
        <div className="flex flex-row items-center gap-2">
          <GoGoal className="w-[15px] h-[15px]" />
          <p>{goalsCount}</p>
          <Dot />
        </div>

        <div className="flex flex-row items-center gap-2">
          <ListTodo className="w-[15px] h-[15px]" />
          <p>{tasksCount}</p>
          <Dot />
        </div>

        <div className="flex flex-row items-center gap-2">
          <Tag className="w-[15px] h-[15px]" />
          <p>{tagsCount}</p>
        </div>

        <div className="mr-4 ml-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="items-center flex">
                <EllipsisVertical className="w-[24px] h-[24px] text-black" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>Add New Task</DropdownMenuItem>
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>Move To Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default VaultsCard;