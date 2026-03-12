import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axiosInstance from "../utils/axios";

const AdminDashboard = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [uploading, setUploading] = useState(false);


  // Fetch Images
  const fetchImages = async (initial = false) => {

    try {

      if (initial) {
        setPageLoading(true);
      } else {
        setImagesLoading(true);
      }

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



  // Upload Image
  const handleUpload = async (e) => {

    e.preventDefault();

    if (!title || !image) {
      alert("Title and Image required");
      return;
    }

    try {

      setUploading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      await axiosInstance.post("/admin/upload-image", formData);

      alert("Image Uploaded");

      setTitle("");
      setImage(null);

      fetchImages();

    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setUploading(false);
    }
  };



  // Delete Image
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



  // Update Image
  const handleUpdate = async (id) => {

    try {

      setImagesLoading(true);

      const formData = new FormData();

      formData.append("title", editTitle);

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



  // Page Loading
  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-slate-900 text-lg">
          Loading...
        </p>
      </div>
    );
  }



  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Upload Section */}

      <div className="border border-gray-300 rounded-2xl  pt-6 max-w-2xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-8">
          Welcome Admin Dashboard
        </h2>

        <hr className="w-xl mx-auto mb-5" />

        <h3 className="text-3xl font-bold text-center mb-8 text-slate-600">
          Upload Images
        </h3>


        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto mb-10 space-y-4"
        >

          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full cursor-pointer"
          />

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 rounded-xl text-white transition
            ${uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"}
          `}
          >

            {uploading ? "Uploading..." : "Upload Image"}

          </button>

        </form>

      </div>



      {/* Images Section */}

      <h3 className="text-3xl font-bold text-center mb-8 text-slate-600 p-4">
        All Images
      </h3>


      {imagesLoading ? (

        <div className="flex justify-center items-center py-10">
          <p className="text-lg text-gray-600">
            Loading images...
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {images.map((img) => (

            <div
              key={img._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >

              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-3">

                {editId === img._id ? (

                  <>

                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border p-2 rounded-lg"
                    />

                    <input
                      type="file"
                      onChange={(e) => setEditImage(e.target.files[0])}
                    />

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleUpdate(img._id)}
                        className="flex-1 bg-green-600 text-white py-1 rounded-lg"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditId(null)}
                        className="flex-1 bg-gray-400 text-white py-1 rounded-lg"
                      >
                        Cancel
                      </button>

                    </div>

                  </>

                ) : (

                  <>

                    <h3 className="text-lg font-semibold text-gray-800">
                      {img.title}
                    </h3>


                    <div className="flex items-center justify-between">

                      <span className="text-base text-gray-600 flex gap-2">

                        {img.likesCount > 0
                          ? <Heart className="text-red-500 fill-red-500 scale-110" />
                          : <Heart />}

                        {img.likesCount || 0}

                      </span>


                      <div className="flex gap-2">

                        <button
                          onClick={() => {
                            setEditId(img._id);
                            setEditTitle(img.title);
                          }}
                          className="text-gray-200 w-16 hover:bg-gray-600 text-sm bg-gray-400 p-2 rounded-2xl"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(img._id)}
                          className="text-gray-200 w-16 hover:bg-red-600 text-sm bg-red-400 p-2 rounded-2xl"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default AdminDashboard;