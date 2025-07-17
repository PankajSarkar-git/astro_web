import AstrologerFormPage from "@/components/AstrologerFormPage";
import { useParams } from "react-router-dom";

const AstrologerEdit = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>Invalid ID</p>;

  return <AstrologerFormPage mode="edit" astrologerId={id} />;
};

export default AstrologerEdit;
