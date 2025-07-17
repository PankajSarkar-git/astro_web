import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteAstrologerModal({
  astro,
  onConfirm,
  onCancel,
}: {
  astro: any;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={!!astro} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete{" "}
          <strong>{astro?.user?.name}</strong>?
        </p>
        <DialogFooter className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
