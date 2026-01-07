export const uploadToCloudinary = async (file, setProgress) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "stellix_unsigned");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  return await res.json(); // secure_url, public_id
};
