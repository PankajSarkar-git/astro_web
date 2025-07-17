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

interface Props {
  astrologers: any[];
  onView: (astro: any) => void;
  onDelete: (astro: any) => void;
}

export default function AstrologerTable({ astrologers, onView, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
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
        {astrologers.map((astro,index) => (
          <TableRow key={astro.id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>
              <img
                src={astro?.user?.imgUri}
                alt={astro.user?.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            </TableCell>
            <TableCell>{astro.user?.name}</TableCell>
            <TableCell>{astro.expertise}</TableCell>
            <TableCell>{astro.experienceYears} yrs</TableCell>
            <TableCell>
              ₹{astro.pricePerMinuteChat}/Chat, ₹{astro.pricePerMinuteVoice}/Voice
            </TableCell>
            <TableCell>
              <div className="flex justify-center items-center space-x-4 text-lg text-muted-foreground">
                <FaEye
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => onView(astro)}
                  title="View"
                />
                <FaRegEdit
                  className="cursor-pointer hover:text-green-500"
                  onClick={() => navigate(`/astrologers-edit/${astro.id}`)}
                  title="Edit"
                />
                <FaTrashAlt
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => onDelete(astro)}
                  title="Delete"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
