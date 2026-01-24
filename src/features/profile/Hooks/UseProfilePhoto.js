import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { uploadProfilePhoto } from "../../auth/Api/Auth.api";
import { useAuth } from "../../../Context/AuthContext";

export const useProfilePhoto = () => {
  const { saveUserData } = useAuth();
  const fileInputRef = useRef(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageToCrop(reader.result);
      setShowCropModal(true);
    });
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = null;
  };

  const handleCropComplete = async (croppedBlob) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("photo", croppedBlob, "profile.jpg");

    const toastId = toast.loading("Uploading photo...");

    try {
      const { data } = await uploadProfilePhoto(formData);
      if (data.message === "success") {
        toast.success("Profile photo updated", { id: toastId });

        // Update local storage and context
        const newPhoto = data.user.photo;
        localStorage.setItem("userPhoto", newPhoto);
        saveUserData();

        setShowCropModal(false);
        setImageToCrop(null);
      }
    } catch (error) {
      //console.error(error);
      toast.error("Failed to upload photo", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    showCropModal,
    imageToCrop,
    isUploading,
    handleFileChange,
    handleCropComplete,
    triggerFileInput,
    setShowCropModal,
  };
};
