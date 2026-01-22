import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  X,
  Upload,
  Lock,
  User,
  Mail,
  Loader2,
  CheckCircle2,
  PenLine,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../../../../../Context/AuthContext";
import { useTheme } from "../../../../../Context/ThemeContext";
import { changePassword, uploadProfilePhoto } from "../../../Api/Auth.api";
import { Moon, Sun, Monitor } from "lucide-react";
import toast from "react-hot-toast";
import ImageCropModal from "../ImageCropModal/ImageCropModal";

const SettingsModal = ({ isOpen, onClose, initialTab = "general" }) => {
  const { user, saveUserData, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // password state
  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // photo state
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await changePassword({
        password: passwords.password,
        newPassword: passwords.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswords({ password: "", newPassword: "", confirmNewPassword: "" });
      onClose();
      logout();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageToCrop(objectUrl);
      setShowCropModal(true);
    }
  };

  const handleCropComplete = async (croppedBlob) => {
    setShowCropModal(false);
    const objectUrl = URL.createObjectURL(croppedBlob);
    setPreviewImage(objectUrl);
    await handlePhotoUpload(croppedBlob);
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    fileInputRef.current.value = null;
  };

  const handlePhotoUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      await uploadProfilePhoto(formData);
      toast.success("Profile photo updated!");
      saveUserData();
    } catch (error) {
      toast.error("Failed to upload photo");
      setPreviewImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
        onClick={handleBackdropClick}
      >
        <div
          className="
            w-full max-w-4xl 
            bg-white dark:bg-[#1e1e24] 
            text-slate-900 dark:text-slate-200 
            rounded-t-[2.5rem] md:rounded-3xl 
            shadow-2xl 
            overflow-hidden 
            flex flex-col md:flex-row 
            h-[85vh] md:h-[600px] 
            max-h-[90vh]
            border-t md:border border-slate-200 dark:border-white/5
            transition-colors duration-300
          "
        >
          {/* sidebar & mobile nav */}
          <div className="w-full md:w-72 bg-slate-50 dark:bg-[#18181b] p-4 md:p-6 flex flex-row md:flex-col gap-2 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 shrink-0 overflow-x-auto no-scrollbar transition-colors">
            <h2 className="hidden md:block text-xl font-bold text-slate-900 dark:text-white mb-6 px-4">
              Settings
            </h2>

            <button
              onClick={() => setActiveTab("general")}
              className={`
                flex items-center gap-3 px-5 md:px-4 py-3 md:py-3.5 rounded-2xl transition-all font-semibold text-sm whitespace-nowrap
                ${
                  activeTab === "general"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <User size={18} strokeWidth={2.5} /> General
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`
                flex items-center gap-3 px-5 md:px-4 py-3 md:py-3.5 rounded-2xl transition-all font-semibold text-sm whitespace-nowrap
                ${
                  activeTab === "security"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <Lock size={18} strokeWidth={2.5} /> Security
            </button>
          </div>

          {/* content */}
          <div className="flex-1 relative flex flex-col bg-white dark:bg-[#1e1e24] overflow-hidden transition-colors">
            {/* close button  */}
            <button
              onClick={onClose}
              className="absolute top-4 md:top-6 right-4 md:right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all cursor-pointer z-50"
            >
              <X size={20} />
            </button>

            <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
              {activeTab === "general" && (
                <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Profile Information
                    </h3>
                    <p className="text-sm md:text-base text-slate-400">
                      Manage your public profile details.
                    </p>
                  </div>

                  {/* appearance section */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold mb-1 flex items-center gap-2">
                        Appearance
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Customize how the app looks on your device.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "light", label: "Light", icon: Sun },
                        { id: "dark", label: "Dark", icon: Moon },
                        { id: "system", label: "System", icon: Monitor },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setTheme(item.id);
                            toast.success(`Theme set to ${item.label}`);
                          }}
                          className={`
                            relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer outline-none
                            ${
                              theme === item.id
                                ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10"
                                : "border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 bg-white dark:bg-white/5"
                            }
                          `}
                        >
                          <div
                            className={`
                              w-8 h-8 rounded-full flex items-center justify-center transition-colors
                              ${
                                theme === item.id
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                              }
                            `}
                          >
                            <item.icon size={16} />
                          </div>
                          <span
                            className={`
                              text-xs font-bold
                              ${
                                theme === item.id
                                  ? "text-indigo-600 dark:text-indigo-400"
                                  : "text-slate-600 dark:text-slate-400"
                              }
                            `}
                          >
                            {item.label}
                          </span>
                          {theme === item.id && (
                            <div className="absolute top-2 right-2 text-indigo-600 dark:text-indigo-400">
                              <div className="w-2 h-2 rounded-full bg-current" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* photo section */}
                  <div className="p-5 md:p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center gap-6 shadow-sm dark:shadow-none transition-colors">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="relative group cursor-pointer shrink-0"
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-slate-100 dark:ring-[#1e1e24] shadow-xl relative z-10">
                        <img
                          src={previewImage || user?.photo}
                          alt="Profile"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload className="text-white w-8 h-8 drop-shadow-md" />
                        </div>
                      </div>

                      <div className="absolute bottom-1 right-1 z-20 bg-indigo-500 text-white p-1.5 rounded-full ring-4 ring-slate-100 dark:ring-[#1e1e24] shadow-sm">
                        <PenLine size={12} strokeWidth={3} />
                      </div>

                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full z-30">
                          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                        </div>
                      )}
                    </div>

                    <div className="text-center sm:text-left">
                      <h4 className="text-slate-900 dark:text-white font-bold mb-1">
                        Profile Photo
                      </h4>
                      <p className="text-xs text-slate-500 mb-4 font-medium">
                        Accepts JPG, PNG (Max 5MB)
                      </p>
                      <div className="flex gap-3 justify-center sm:justify-start">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isLoading}
                          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                        >
                          Upload New
                        </button>
                        <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors">
                          Remove
                        </button>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                      />
                    </div>
                  </div>

                  {/* read only info */}
                  <div className="space-y-5 md:space-y-6">
                    <div className="grid gap-2">
                      <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                        Display Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User size={18} className="text-slate-500" />
                        </div>
                        <input
                          type="text"
                          value={user?.name || "Not set"}
                          readOnly
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-100 dark:bg-[#18181b] border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 dark:text-slate-300 focus:outline-none cursor-not-allowed opacity-70 text-sm md:text-base font-medium"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold bg-slate-200 dark:bg-white/5 px-2 py-1 rounded">
                            READ ONLY
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <label className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail size={18} className="text-slate-500" />
                        </div>
                        <input
                          type="email"
                          value={
                            user?.email ||
                            localStorage.getItem("userEmail") ||
                            "Not set"
                          }
                          readOnly
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-100 dark:bg-[#18181b] border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 dark:text-slate-300 focus:outline-none cursor-not-allowed opacity-70 text-sm md:text-base font-medium"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold bg-slate-200 dark:bg-white/5 px-2 py-1 rounded">
                            READ ONLY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Security
                    </h3>
                    <p className="text-sm md:text-base text-slate-400">
                      Update your password to keep your account safe.
                    </p>
                  </div>

                  <form
                    onSubmit={submitPasswordChange}
                    className="space-y-5 max-w-lg"
                  >
                    {["password", "newPassword", "confirmNewPassword"].map(
                      (name) => (
                        <div key={name} className="grid gap-2">
                          <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                            {name
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords[name] ? "text" : "password"}
                              name={name}
                              value={passwords[name]}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3.5 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm md:text-base pr-12"
                              placeholder={`Enter ${name.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(name)}
                              className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
                            >
                              {showPasswords[name] ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                      ),
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            <CheckCircle2 size={20} />
                            Change Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCropModal && (
        <ImageCropModal
          image={imageToCrop}
          onComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </>,
    document.body,
  );
};

export default SettingsModal;
