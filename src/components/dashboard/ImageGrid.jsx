import React, { useState } from "react";
import { Heart } from "lucide-react";

const ImageGrid = ({
  images,
  imagesLoading,
  handleDelete,

  editId,
  editTitle,
  setEditId,
  setEditTitle,
  handleUpdate,
  setEditImage,
}) => {

  const [previewImage, setPreviewImage] = useState(null);
  const tagColors = [
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-rose-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-amber-500",
    "bg-orange-500",
  ];

  const getTagColor = (tag) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return tagColors[Math.abs(hash) % tagColors.length];
  }

  if (imagesLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading images...
      </div>
    );
  }

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {images.map((img) => (

          <div
            key={img._id}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all"
          >

            {/* IMAGE */}
            <img
              src={img.imageUrl}
              alt={img.title}
              onClick={() => setPreviewImage(img)}
              className="w-full h-44 object-cover cursor-pointer hover:scale-105 transition"
            />

            <div className="p-4 space-y-3">

              {/* ✅ EDIT MODE */}
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
                  {/* TITLE */}
                  <h3 className="font-semibold truncate">
                    {img.title}
                  </h3>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2">
                    {img.tags && (
                      <span
                        className={`text-xs px-3 py-1 rounded-full text-white font-medium shadow-sm ${getTagColor(img.tags)}`}
                      >
                        {img.tags}
                      </span>
                    )}
                  </div>

                  {/* BOTTOM */}
                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-1 text-gray-600">
                      <Heart className="text-red-500 fill-red-500" />
                      {img.likesCount}
                    </span>

                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          setEditId(img._id);
                          setEditTitle(img.title);
                        }}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(img._id)}
                        className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded"
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

      {/* 🔥 IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">

          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>

          <img
            src={previewImage.imageUrl}
            alt={previewImage.title}
            className="max-w-[90%] max-h-[85%] rounded-xl shadow-2xl"
          />

          <p className="absolute bottom-5 text-white text-lg">
            {previewImage.title}
          </p>

        </div>
      )}
    </>
  );
};

export default ImageGrid;