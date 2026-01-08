"use client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage src={publicId} width={300} height={200} alt="abcd" />
      )}
      <CldUploadWidget
        uploadPreset="wysign"
        onSuccess={(result, option) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
        options={{
          sources: ["local", "url"],
          multiple: false,
          maxFiles: 5,
          styles: {
            palette: {
              window: "#222222",
              windowBorder: "#CCCCCC",
              tabIcon: "#016AA2",
              menuIcons: "#5A616A",
              textDark: "#FFFFFF",
              textLight: "#c1c1c1",
              link: "#0078FF",
              action: "#FF620C",
              inactiveTabIcon: "#1c4882",
              error: "#cc1e1e",
              inProgress: "#ff620c",
              complete: "#64ce70",
              sourceBg: "#E4EBF1",
            },
            fonts: {
              default: null,
              '"Roboto", sans-serif': {
                url: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
                active: true,
              },
            },
          },
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary m-4" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
