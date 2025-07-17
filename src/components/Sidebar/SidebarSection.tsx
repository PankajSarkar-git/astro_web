import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

type Props = {
  title?: string;
  isOpen?: boolean;
  items: {
    icon: any;
    label: string;
    badge?: string;
    path: string;
    hasSubItems?: boolean;
    color?: string;
    bgColor?: string;
  }[];
};

export default function SidebarSection({
  title,
  items,
  isOpen = false,
}: Props) {
  const { pathname } = useLocation();

  return (
    <div className="mb-4 w-full overflow-hidden">
      {/* Optional Section Title */}
      {title && isOpen && (
        <div className="px-4 mb-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h3>
          <div className="mt-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
        </div>
      )}

      {/* Navigation Items */}
      <nav className="space-y-1 ">
        {items.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <Link
              to={item.path}
              key={idx}
              className={`block w-full transition-all duration-200`}
            >
              <SidebarItem
                isOpen={isOpen}
                icon={<item.icon size={20} />}
                label={item.label}
                badge={item.badge}
                bgColor={item.bgColor}
                color={item.color}
                isActive={isActive}
                onClick={() => {}}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
