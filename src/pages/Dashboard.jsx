import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import StatsCards from "../components/dashboard/StatsCards";
import UploadForm from "../components/dashboard/UploadForm";
import ImageGrid from "../components/dashboard/ImageGrid";
import AdminLayout from "../components/layout/AdminLayout";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editTag, setEditTag] = useState("");

  const [pageLoading, setPageLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState("");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalImages: 0,
    totalLikes: 0,
    mostLiked: null,
  });

  // Fetch Images
  const fetchImages = async (initial = false) => {
    try {
      if (initial) setPageLoading(true);
      else setImagesLoading(true);

      const res = await axiosInstance.get("/admin/images");
      setImages(res.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setPageLoading(false);
      setImagesLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(true);
  }, []);

  // ✅ FIXED UPLOAD FUNCTION
  // ✅ FINAL FIXED handleUpload
const handleUpload = async ({ title, image, tag }) => {
  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("image", image);
    formData.append("tags", tag);
    await axiosInstance.post("/admin/upload-image", formData);
    alert("Image Uploaded Successfully!");

    setTitle("");
    setImage(null);
    setTags([]);

    fetchImages();

  } catch (error) {
    console.error(error);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      setImagesLoading(true);
      await axiosInstance.delete(`/admin/image/${id}`);
      fetchImages();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Update
  const handleUpdate = async (id) => {
  try {
    setImagesLoading(true);

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("tags", editTag);   // ✅ ADD THIS

    if (editImage) {
      formData.append("image", editImage);
    }

    await axiosInstance.put(`/admin/image/${id}`, formData);

    alert("Updated Successfully");

    setEditId(null);
    setEditImage(null);

    fetchImages();
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading...
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">

        <StatsCards stats={stats} />

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Upload */}
          <div className="lg:w-1/3">
            <UploadForm
              title={title}
              setTitle={setTitle}
              image={image}
              setImage={setImage}
              handleUpload={handleUpload}
              tags={tags}
              setTags={setTags}
              uploading={uploading}
            />
          </div>

          {/* Images */}
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-bold mb-4">All Images</h3>

            <ImageGrid
              images={images}
              imagesLoading={imagesLoading}
              handleDelete={handleDelete}
              editId={editId}
              editTitle={editTitle}
              setEditId={setEditId}
              setEditTitle={setEditTitle}
              handleUpdate={handleUpdate}
              setEditImage={setEditImage}
            />
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;