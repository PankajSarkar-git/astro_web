
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  icon: any;
  label: string;
  badge?: string;
  isOpen?: boolean;
  isActive?: boolean;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
};

export default function SidebarItem({
  icon,
  label,
  badge,
  isOpen = false,
  isActive = false,
  color = "#3B82F6",
  bgColor = "#EFF6FF",
  onClick,
}: Props) {
  return (
    <div
      className={`
        group relative flex w-full items-center transition-all duration-300 ease-in-out
        ${isOpen ? "justify-between px-4" : "justify-center px-3"} 
        py-3 mx-2 rounded-xl cursor-pointer
        ${
          isActive
            ? "shadow-lg transform scale-[1.02]"
            : "hover:shadow-md hover:transform hover:scale-[1.01]"
        }
        ${isActive ? "" : "hover:bg-lite-gray"}
      `}
      style={{
        backgroundColor: isActive ? bgColor : undefined,
      }}
      onClick={onClick}
    >
      {/* Active indicator */}
      {isActive && (
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300"
          style={{ backgroundColor: color }}
        />
      )}

      <div className="flex items-center gap-3 flex-grow">
        {/* Icon Container */}
        <div
          className={`
            flex items-center justify-center transition-all duration-300
            ${isOpen ? "w-8 h-8" : "w-10 h-10"} 
            rounded-lg group-hover:scale-110
            ${isActive ? "shadow-sm" : ""}
          `}
          style={{
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.8)" : undefined,
            color: isActive ? color : "#6B7280",
          }}
        >
          <span
            className={`transition-all duration-300 ${
              isOpen ? "text-xl" : "text-2xl"
            }`}
          >
            {icon}
          </span>
        </div>

        {/* Label with smooth transition */}
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}
          `}
        >
          <span
            className={`
              text-base font-medium whitespace-nowrap transition-colors duration-200
              ${
                isActive
                  ? "font-semibold"
                  : "text-deep-text group-hover:text-deep-text"
              }
            `}
            style={{ color: isActive ? color : undefined }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Right side content */}
      {isOpen && (
        <div className="flex items-center gap-2">
          {/* Badge */}
          {badge && (
            <span
              className={`
                text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200
                ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-gray-100 text-lite-text group-hover:bg-gray-200"
                }
              `}
              style={{
                backgroundColor: isActive ? color : undefined,
              }}
            >
              {badge}
            </span>
          )}

          {/* Arrow indicator */}
          <div
            className={`
              transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "opacity-100 transform rotate-0"
                  : "opacity-60 group-hover:opacity-100 group-hover:transform group-hover:translate-x-1"
              }
            `}
          >
            <IoIosArrowForward
              className="text-sm transition-colors duration-200"
              style={{ color: isActive ? color : "#9CA3AF" }}
            />
          </div>
        </div>
      )}

      {/* Tooltip for collapsed state */}
      {!isOpen && (
        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
          {label}
          {badge && (
            <span className="ml-2 px-1.5 py-0.5 bg-white bg-opacity-20 rounded text-xs">
              {badge}
            </span>
          )}
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900" />
        </div>
      )}

      {/* Ripple effect overlay */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      </div>
    </div>
  );
}
