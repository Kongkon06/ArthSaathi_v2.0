import { GoGoal, GoPencil } from "react-icons/go";
import { Progress } from "@/components/ui/progress"; // Ensure this path is correct
import { Calendar, CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

type Priority = "high" | "medium" | "low";

interface Goal {
  title?: string;
  progress?: number;
  priority?: Priority;
  tasksCompleted?: number;
  totalTasks?: number;
  type?: string;
  description?: string;
}

const GoalsCard = ({ goal }: { goal: Goal }) => {
  const {
    title = "Learn New Language",
    progress = 20,
    priority = "high",
    tasksCompleted = 0,
    totalTasks = 5,
    type = "Yearly",
    description = "The sun dipped below the horizon, painting the sky in hues of orange and pink.",
  } = goal || {};

  // Priority Badge Colors
  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-400 text-black",
    low: "bg-green-500 text-white",
  };

  return (
    <Link to="/goals-view">
      <div className="bg-white shadow-md rounded-lg p-6 border text-gray-700 flex flex-col hover:shadow-lg hover:border-gray-800 transition-shadow duration-200">
        <div className="m-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GoGoal className="text-gray-600 text-3xl" />
              <h1 className="text-[16px] font-semibold">{title}</h1>
            </div>
            <div className="flex flex-row gap-2">
            <div className="flex items-center bg-blue-200 rounded-md h-[25px] w-[60px] text-sm font-medium border text-gray-700 gap-2 p-1">
              <CircleCheck className="w-4 h-4 text-blue-600" />
              <p className="text-blue-600">
                {tasksCompleted}/{totalTasks}
              </p>
            </div>
            <HiOutlineBell className="w-[20px] h-[20px]" />
            </div>
          </div>

          {/* Task Status */}
          <div className="flex flex-row gap-2 mt-4 justify-between">
            <span className="bg-blue-600 text-white px-3 py-1 ml-8 rounded-sm text-sm">
              {type}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-md text-xs capitalize ${
                  priorityColors[priority] || "bg-gray-300 text-black"
                }`}
              >
                {priority}
              </span>
              <GoPencil className="text-black hover:text-blue-500 cursor-pointer text-lg" />
              <RiDeleteBin6Line className="text-black hover:text-red-500 cursor-pointer text-lg" />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 text-gray-600 text-sm line-clamp-3">
            {description}
          </div>

          {/* Progress */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-medium">Progress Status</p>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-3xl font-bold ${progress > 0 ? "text-green-500" : "text-gray-800"}`}>
                {progress}%
              </span>
            </div>
            <Progress
              value={progress}
              className={`mt-2 h-3 rounded-md ${
                progress > 0 ? "bg-green-200" : "bg-gray-300"
              }`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GoalsCard;