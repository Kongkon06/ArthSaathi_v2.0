// SettingsSidebar.jsx
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { TbHeadset } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const SettingsSidebar = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path:any) => location.pathname === path;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-4 mt-9">
      {/* Settings Title */}
      <div className="flex items-center">
        <IoSettingsOutline className="text-2xl text-black mr-2 w-[32px] h-[32px]" />
        <h2 className="text-xl font-semibold text-black">Settings</h2>
      </div>

      {/* Sidebar Menu */}
      <div className="w-60 mt-10">
        <ul className="space-y-4">
          <li
            className={`p-2 rounded-md cursor-pointer ${isActive("/settings-account") ? "bg-white" : ""}`}
          >
            <Link to="/settings-account" className="flex items-center space-x-3">
              <CiUser className="text-lg" />
              <span className="text-gray-700 font-medium">Profile Settings</span>
            </Link>
          </li>
          <li
            className={`p-2 rounded-md cursor-pointer ${isActive("/settings-notification") ? "bg-white" : ""}`}
          >
            <Link to="/settings-notification" className="flex items-center space-x-3">
              <IoNotificationsOutline className="text-lg text-black" />
              <span className="text-gray-700 font-medium">Notifications</span>
            </Link>
          </li>
          <li
            className={`p-2 rounded-md cursor-pointer ${isActive("/settings-privacy") ? "bg-white" : ""}`}
          >
            <Link to="/settings-privacy" className="flex items-center space-x-3">
              <MdOutlinePrivacyTip className="text-lg text-black" />
              <span className="text-gray-700 font-medium">Privacy and Security</span>
            </Link>
          </li>
          <li
            className={`p-2 rounded-md cursor-pointer ${isActive("/settings-help") ? "bg-white" : ""}`}
          >
            <Link to="/settings-help" className="flex items-center space-x-3">
              <TbHeadset className="text-lg text-black" />
              <span className="text-gray-700 font-medium">Help and Support</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Show modal if isModalOpen is true */}
    </div>
  );
};

export default SettingsSidebar;
