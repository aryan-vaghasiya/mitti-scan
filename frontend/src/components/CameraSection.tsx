import React from "react";
import Webcam from "react-webcam";

interface CameraSectionProps {
  webcamRef: React.RefObject<Webcam>;
  preview: string | null | undefined;
  loading: boolean;
  onCapture: () => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onExtract: () => void;
  hideExtractBtn: boolean;
}

export default function CameraSection({
  webcamRef,
  preview,
  loading,
  onCapture,
  onUpload,
  onReset,
  onExtract,
  hideExtractBtn
}: CameraSectionProps) {
  return (
    <div className="w-full">
      {!preview ? (
        <>
          <div className="rounded-xl overflow-hidden flex justify-center bg-gray-100">
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full" />
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={onCapture}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
            >
              Capture
            </button>
            <label className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer transition-colors">
              Upload
              <input type="file" accept="image/*" onChange={onUpload} hidden />
            </label>
          </div>
        </>
      ) : (
        <>
          <img src={preview} alt="preview" className="w-full rounded-xl mb-4 shadow-sm" />
          <div className="flex justify-center gap-3">
            <button
              onClick={onReset}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
            >
              Reset
            </button>

            {!hideExtractBtn && (
              <button
                onClick={onExtract}
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
              >
                {loading ? "Processing..." : "Extract Text"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}