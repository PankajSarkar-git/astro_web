import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ViewAstrologerModal({
  astro,
  onClose,
}: {
  astro: any;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!astro} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Astrologer Details</DialogTitle>
        </DialogHeader>
        {astro && (
          <div className="space-y-2 text-sm">
            <img
              src={astro?.user?.imgUri}
              alt="astro"
              className="h-20 w-20 rounded-full object-cover mx-auto mb-3"
            />
            <p>
              <strong>Name:</strong> {astro.user?.name}
            </p>
            <p>
              <strong>Mobile:</strong> {astro.user?.mobile}
            </p>
            <p>
              <strong>Expertise:</strong> {astro.expertise}
            </p>
            <p>
              <strong>Experience:</strong> {astro.experienceYears} years
            </p>
            {/* <p>
              <strong>Languages:</strong> {astro.languages}
            </p> */}
            <p>
              <strong>Chat Price:</strong> ₹{astro.pricePerMinuteChat}/min
            </p>
            <p>
              <strong>Voice Price:</strong> ₹{astro.pricePerMinuteVoice}/min
            </p>
            <p>
              <strong>Video Price:</strong> ₹{astro.pricePerMinuteVideo}/min
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
