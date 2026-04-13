import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { type NutrientData, type RecommendationResult } from "../types";
import CameraSection from "../components/CameraSection";
import NutrientForm from "../components/NutrientForm";
import AnalysisResults from "../components/AnalysisResults";
const API_URL = import.meta.env.VITE_API_SERVER;

export default function Scanner() {
  const webcamRef = useRef<Webcam | null>(null);

  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [imageFile, setImageFile] = useState<null | File | Blob>(null);
  const [text, setText] = useState<string | NutrientData>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<null | RecommendationResult>(null);

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    
    setPreview(imageSrc);
    setText("");

    const fetchResponse = await fetch(imageSrc);
    const file = await fetchResponse.blob();
    setImageFile(file);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setText("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setText("");
    };
    reader.readAsDataURL(file);
  };

  const extractText = async () => {
    if (!imageFile) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(`${API_URL}/ocr`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data)
      setText(data.nutrients);
    } catch (err) {
      console.error(err);
      setText("Error extracting text");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchParams = new URLSearchParams(formData as any);

    try {
      const res = await fetch(`${API_URL}/recommendations?${searchParams.toString()}`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      });
      const data = await res.json();
      console.log(data)
      setResult(data.recommendations);
    } catch (err) {
      console.error("Failed to fetch recommendations", err);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setImageFile(null);
    setText("");
    setResult(null);
  };

  const isTextDetected = typeof text === 'object' && text?.detected;

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl p-6 md:p-8 shadow-xl h-fit border border-gray-100">
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
          <span className="text-emerald-500">🌱</span> Mitti Scan
        </h2>

        <CameraSection
          webcamRef={webcamRef}
          preview={preview}
          loading={loading}
          onCapture={capture}
          onUpload={handleUpload}
          onReset={handleReset}
          onExtract={extractText}
          hideExtractBtn={!!result || isTextDetected}
        />

        {isTextDetected && !result && (
          <NutrientForm 
            initialData={text as NutrientData} 
            onSubmit={handleSubmit} 
          />
        )}

        {result && (
          <AnalysisResults result={result} />
        )}

      </div>
    </div>
  );
}