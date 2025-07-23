import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { getAllBanners, uploadBanner, deleteBannerById } from "@/store/banner";
import { showToast } from "@/components/toast";

const Banner = () => {
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [banners, setBanners] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await dispatch(getAllBanners()).unwrap();
      setBanners(res.bannars);
    } catch (err) {
      console.error(err);
      showToast.error("Failed to fetch banners.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showToast.error("Please select a banner image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setIsUploading(true);
    try {
      await dispatch(uploadBanner(formData)).unwrap();
      showToast.success("Banner uploaded successfully.");
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchBanners();
    } catch (err) {
      console.error(err);
      showToast.error("Failed to upload banner.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteBannerById(id)).unwrap();
      setBanners((prev) => prev.filter((b) => b.id !== id));
      showToast.success("Banner deleted.");
    } catch (err) {
      showToast.error("Failed to delete banner.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upload New Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <Button
              disabled={isUploading || !selectedFile}
              onClick={handleUpload}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="border rounded-md p-2 w-full max-w-sm">
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                Preview:
              </p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full object-cover rounded-md"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Banners */}
      {banners.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Uploaded Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="relative group border rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={banner.imgUrl}
                    alt="Banner"
                    className="w-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(banner.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Banner;
