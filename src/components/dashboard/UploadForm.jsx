import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const UploadForm = ({
  title,
  setTitle,
  image,
  setImage,
  handleUpload,
  uploading,
}) => {
  // ✅ single tag state
  const [tag, setTag] = useState("");

  // ✅ submit
  const onSubmit = (e) => {
    e.preventDefault();

    console.log("TITLE:", title);
    console.log("IMAGE:", image);
    console.log("TAG:", tag);

    if (!title?.trim() || !image) {
      alert("Title and Image are required");
      return;
    }

    handleUpload({
      title,
      image,
      tag, // ✅ single string
    });

    // reset
    setTag("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-xl mx-auto mb-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        Upload Image
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">

        {/* Title */}
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter image title"
        />

        {/* ✅ Single Tag Input */}
        <div>
          <label className="text-sm font-medium">Tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter tag"
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* File */}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            console.log("FILE SELECTED:", file);
            if (file) setImage(file);
          }}
          className="w-full"
        />

        {/* Submit */}
        <Button type="submit" disabled={uploading} className="w-full">
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>

      </form>
    </div>
  );
};

export default UploadForm;