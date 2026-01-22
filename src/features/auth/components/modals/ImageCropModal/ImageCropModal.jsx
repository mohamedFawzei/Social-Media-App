import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Cropper from "react-easy-crop";
import { X, Check, Loader2 } from "lucide-react";

const ImageCropModal = ({ image, onComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    setIsProcessing(true);
    try {
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
      onComplete(croppedBlob);
    } catch (e) {
      // console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-800 ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between relative z-10">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Adjust Photo
          </h3>
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Crop Section */}
        <div className="relative h-[400px] w-full bg-slate-950/50">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            style={{
              containerStyle: { background: "transparent" },
              cropAreaStyle: { border: "2px solid rgba(99, 102, 241, 0.5)" }, // Indigo border hint
            }}
          />
        </div>

        {/* Controls */}
        <div className="px-8 py-6 space-y-6 bg-slate-900 border-t border-slate-800/50">
          {/* Zoom Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-medium text-slate-400">
              <span>Zoom</span>
              <span>{Math.round((zoom - 1) * 50)}%</span>
            </div>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.05}
              onChange={(e) => setZoom(e.target.value)}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3.5 rounded-2xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 hover:text-white transition-all active:scale-[0.98] text-sm"
            >
              Cancel
            </button>
            <button
              onClick={createCroppedImage}
              disabled={isProcessing}
              className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={18} strokeWidth={3} />
                  Save Photo
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

// function to create cropped image
const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      "image/jpeg",
      0.95,
    );
  });
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export default ImageCropModal;
