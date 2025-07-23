import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Astrologer } from "@/lib/types";

interface Props {
  astrologers: Astrologer[];
  onView: (astro: Astrologer) => void;
  onDelete: (astro: Astrologer) => void;
}

export default function AstrologerTable({ astrologers, onView, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 rounded-xl overflow-hidden border shadow-sm bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 text-sm text-muted-foreground">
            <TableHead>SL No</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Expertise</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Price/Min</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {astrologers.map((astro, index) => (
            <TableRow
              key={astro.id}
              className="hover:bg-muted transition-all duration-200"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={astro?.user?.imgUri || "/default-avatar.png"}
                    alt={astro.user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-semibold">{astro.user?.name}</TableCell>
              <TableCell>{astro.expertise}</TableCell>
              <TableCell>{astro.experienceYears} yrs</TableCell>
              <TableCell>
                <span className="block">
                  ₹{astro.pricePerMinuteChat}/<span className="text-xs">Chat</span>
                </span>
                <span className="block">
                  ₹{astro.pricePerMinuteVoice}/<span className="text-xs">Voice</span>
                </span>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center space-x-4 text-lg text-muted-foreground">
                  <button
                    onClick={() => onView(astro)}
                    className="hover:text-blue-500 transition-colors"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => navigate(`/astrologers-edit/${astro.id}`)}
                    className="hover:text-green-500 transition-colors"
                    title="Edit"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => onDelete(astro)}
                    className="hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
