import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import SidebarSection from "./SidebarSection";
import { UserDropdown } from "./UserDropdown/indix";
import { useSidebarData } from "./data/sidebarData";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarData = useSidebarData();

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm z-50 flex flex-col fixed md:relative top-0 left-0 transition-transform md:transition-all duration-300 ease-in-out ${
        isOpen
          ? "translate-x-0 md:w-[260px]"
          : "-translate-x-full md:translate-x-0 md:w-[80px]"
      }`}
    >
      {/* Toggle Button */}
      <div
        className={`absolute ${
          isOpen ? "hidden md:flex" : "flex"
        } -right-12 top-3 size-10 items-center justify-center bg-gray-300 rounded-full cursor-pointer`}
        onClick={handleToggle}
      >
        <IoGridOutline className="text-gray-700" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gray-100 p-1">
            <img
              src="/public/logo/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://via.placeholder.com/40";
              }}
            />
          </div>
          {isOpen && (
            <h2 className="text-lg font-semibold tracking-wide text-gray-800">
             Astrosevaa
            </h2>
          )}
        </div>

        {isOpen && (
          <div className="md:hidden">
            <IoMdClose
              className="text-2xl cursor-pointer text-gray-500"
              onClick={handleToggle}
            />
          </div>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto px-2 scrollbar-hidden">
        {sidebarData.map((section, index) => (
          <SidebarSection
            key={index}
            isOpen={isOpen}
            title={section.section}
            items={section.items}
          />
        ))}
      </div>

      {/* User Dropdown */}
      <div className="px-2 py-4">
        <UserDropdown isOpen={isOpen} />
      </div>
    </aside>
  );
}
