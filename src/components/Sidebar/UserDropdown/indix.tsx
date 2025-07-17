import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { logout } from "@/store/auth";
import { showToast } from "@/components/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface UserDropdownProps {
  isOpen: boolean;
}

export function UserDropdown({ isOpen }: UserDropdownProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    showToast.success("Logged out successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-muted ${
            isOpen ? "w-fit" : "justify-center w-full"
          }`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
            <AvatarFallback>{"U"}</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="text-left">
              <p className="text-sm font-medium leading-none">{user.name || "ADMIN"}</p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name || "ADMIN"}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer hover:bg-gray-300"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
