import { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useProfilePhoto } from "../Hooks/UseProfilePhoto";
import { useProfileData } from "../Hooks/UseProfileData";

import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import ProfileContent from "../components/ProfileContent/ProfileContent";

// Modals
import SettingsModal from "../../auth/components/modals/SettingsModal/SettingsModal";
import ImageCropModal from "../../auth/components/modals/ImageCropModal/ImageCropModal";

const ProfilePage = () => {
  const { user } = useAuth();
  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  // Hooks
  const {
    fileInputRef,
    showCropModal,
    imageToCrop,
    handleFileChange,
    handleCropComplete,
    triggerFileInput,
    setShowCropModal,
  } = useProfilePhoto();

  const { posts, mediaPosts } = useProfileData(user);

  // Local UI State
  const [activeTab, setActiveTab] = useState("posts");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] pb-10 transition-colors duration-300">
      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <ProfileHeader
        user={user}
        postsCount={posts.length}
        onEditProfile={() => setIsSettingsOpen(true)}
        onPhotoClick={triggerFileInput}
      />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <ProfileContent
        activeTab={activeTab}
        posts={posts}
        mediaPosts={mediaPosts}
      />

      {/* Modals Layer */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialTab="general"
      />

      {showCropModal && imageToCrop && (
        <ImageCropModal
          image={imageToCrop}
          onCancel={() => setShowCropModal(false)}
          onComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default ProfilePage;
