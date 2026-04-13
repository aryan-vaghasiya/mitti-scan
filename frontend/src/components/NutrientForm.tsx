import React from "react";
import { type NutrientData } from "../types";

interface NutrientFormProps {
  initialData: NutrientData;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function NutrientForm({ initialData, onSubmit }: NutrientFormProps) {
  const InputField = ({ label, name, defaultValue }: { label: string; name: string; defaultValue: number }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type="number"
        step="0.01"
        defaultValue={defaultValue}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
      />
    </div>
  );

  return (
    <div className="mt-6 p-5 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Detected Values</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputField label="Nitrogen" name="nitrogen" defaultValue={initialData.N} />
        <InputField label="Phosphorus" name="phosphorus" defaultValue={initialData.P} />
        <InputField label="Potassium" name="potassium" defaultValue={initialData.K} />
        <InputField label="pH" name="ph" defaultValue={initialData.pH} />

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Farm Size (in hectares)</label>
          <input
            name="size"
            type="number"
            step="0.01"
            defaultValue={1}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Crop Type</label>
          <select 
            name="crop" 
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none bg-white transition-all"
          >
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="cotton">Cotton</option>
            <option value="maize">Maize</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
        >
          Get Recommendations
        </button>
      </form>
    </div>
  );
}