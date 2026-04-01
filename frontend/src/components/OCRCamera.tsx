import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const btnPrimary = {
  background: "#2ecc71",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600
};

const btnSecondary = {
  background: "#3498db",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600
};

const btnDanger = {
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginTop: "5px"
};

const card = {
  marginTop: "20px",
  padding: "15px",
  borderRadius: "10px",
  background: "#f9fbfd",
  border: "1px solid #e1e5ea"
};

const inputField = (label: string, name: string, value: number) => (
  <div>
    <label>{label}</label>
    <input
      name={name}
      type="number"
      step="0.01"
      defaultValue={value}
      style={inputStyle}
    />
  </div>
);

function OCRCamera() {
  const webcamRef = useRef<Webcam | null>(null);

  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [imageFile, setImageFile] = useState<null | File | Blob>(null);
  const [text, setText] = useState<string | { N: number; P: number; K: number; pH: number, detected: boolean }>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<null | { recommendations: { nutrient: string; suggestions: { name: string; estimated_bags: string; estimated_cost: string }[] }[]; analysis: { nutrient: string; status: string; deficiency: string }[] }>(null);

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setPreview(imageSrc);
    setText("");

    const fetchResponse = await fetch(imageSrc);
    const file = await fetchResponse.blob();
    setImageFile(file)
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
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch("http://localhost:3000/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setText(data.nutrients);
    }
    catch (err) {
      console.error(err);
      setText("Error extracting text");
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const values = Object.fromEntries(formData.entries());
    // console.log("Form Values:", values);
    const searchParams = new URLSearchParams(formData);

    const res = await fetch(`http://localhost:3000/recommendations?${searchParams.toString()}`);
    const data = await res.json();
    setResult(data.recommendations);
  }

  const handleReset = () => {
    setPreview(null);
    setImageFile(null);
    setText("");
    setResult(null);
  }

  // return (
  //   <div style={{ textAlign: "center" }}>
  //     <h2>OCR Camera + Upload</h2>

  //     {!preview ? (
  //       <>
  //         <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
  //         <br />

  //         <button onClick={capture}>Capture</button>

  //         <div style={{ marginTop: "10px" }}>
  //           <input type="file" accept="image/*" onChange={handleUpload} />
  //         </div>
  //       </>
  //     ) : (
  //       <>
  //         <img src={preview} alt="preview" width="300" />
  //         <br />

  //         <button onClick={handleReset}>Reset</button>
  //         <button onClick={extractText} disabled={loading}>
  //           {loading ? "Processing..." : "Extract Text"}
  //         </button>
  //       </>
  //     )}

  //     {text?.detected && !result ? (
  //         <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
  //           <h3>Extracted Text:</h3>
  //           <p>N: {text.N}, P: {text.P}, K: {text.K}, pH: {text.pH}</p>
  //         </div>
  //       )
  //       : text?.detected && result ? (
  //         <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
  //           <h3>Input Values:</h3>
  //           <p>N: {result.input.N}, P: {result.input.P}, K: {result.input.K}, pH: {result.input.pH}</p>
  //         </div>
  //       )
  //       :
  //       null
  //     }

  //     {text?.detected && !result && 
  //       <div>
  //         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
  //           <div>
  //             <label htmlFor="nitrogen">Nitrogen Content: </label>
  //             <input name="nitrogen" type="number" step="0.01" placeholder="Enter Nitrogen Content" defaultValue={text.N}/>
  //           </div>

  //           <div>
  //             <label htmlFor="phosphorus">Phosphorus Content: </label>
  //             <input name="phosphorus" type="number" step="0.01" placeholder="Enter Phosphorus Content" defaultValue={text.P}/>
  //           </div>

  //           <div>
  //             <label htmlFor="potassium">Potassium Content: </label>
  //             <input name="potassium" type="number" step="0.01" placeholder="Enter Potassium Content" defaultValue={text.K}/>
  //           </div>

  //           <div>
  //             <label htmlFor="ph">pH Content: </label>
  //             <input name="ph" type="number" step="0.01" placeholder="Enter pH Content" defaultValue={text?.pH}/>
  //           </div>

  //           <div>
  //             <label htmlFor="crop">Crop Type: </label>
  //             <select name="crop">
  //               <option value="wheat">Wheat</option>
  //               <option value="rice">Rice</option>
  //               <option value="cotton">Cotton</option>
  //               <option value="maize">Maize</option>
  //             </select><br /><br />
  //           </div>

  //           <button type="submit">Get Recommendations</button>
  //         </form>
  //       </div>
  //     }

  //     {result && 
  //       <div>
  //         <h2>Analysis</h2>
  //         {result.analysis?.map((item: { nutrient: string; status: string; deficiency: string }, i: number) => (
  //           <p key={i}>
  //             {item.nutrient}: {item.status} {item.deficiency && (`(${item.deficiency})`)}
  //           </p>
  //         ))}

  //         <h2>Recommendations</h2>
  //         {result.recommendations?.map((rec: { nutrient: string; suggestions: { name: string; estimated_bags: string; estimated_cost: string }[] }, i: number) => (
  //           <div key={i}>
  //             <h4>{rec.nutrient}</h4>
  //             {rec.suggestions?.map((s: { name: string; estimated_bags: string; estimated_cost: string }, j: number) => (
  //               <p key={j}>
  //                 {s.name} - {s.estimated_bags || ""} bags - ₹{s.estimated_cost || ""}
  //               </p>
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //     }
  //   </div>
  // );

  return (
  <div style={{
    minHeight: "100vh",
    background: "#f4f7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  }}>
    <div style={{
      width: "100%",
      maxWidth: "800px",
      background: "#ffffff",
      borderRadius: "12px",
      padding: "25px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
        🌱 Mitti Scan
      </h2>

      {!preview ? (
        <>
          <div style={{ borderRadius: "10px", overflow: "hidden", display: "flex", justifyContent: "center" }}>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "15px" }}>
            <button style={btnPrimary} onClick={capture}>Capture</button>

            <label style={btnSecondary}>
              Upload
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>
          </div>
        </>
      ) : (
        <>
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "15px"
            }}
          />

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button style={btnDanger} onClick={handleReset}>Reset</button>

            {!result && !text?.detected &&
              <button style={btnPrimary} onClick={extractText} disabled={loading}>
                {loading ? "Processing..." : "Extract Text"}
              </button>
            }
          </div>
        </>
      )}

      {/* Extracted Values */}
      {text?.detected && !result && (
        <div style={card}>
          <h3>Detected Values</h3>
          <p>N: {text.N} | P: {text.P} | K: {text.K} | pH: {text.pH}</p>
        </div>
      )}

      {text?.detected && result && (
        <div style={card}>
          <h3>Input Values</h3>
          <p>N: {result.input.N} | P: {result.input.P} | K: {result.input.K} | pH: {result.input.pH}</p>
        </div>
      )}

      {/* Form */}
      {text?.detected && !result && (
        <div style={card}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {inputField("Nitrogen", "nitrogen", text.N)}
            {inputField("Phosphorus", "phosphorus", text.P)}
            {inputField("Potassium", "potassium", text.K)}
            {inputField("pH", "ph", text.pH)}

            <div>
              <label>Crop Type</label>
              <select name="crop" style={inputStyle}>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="cotton">Cotton</option>
                <option value="maize">Maize</option>
              </select>
            </div>

            <button type="submit" style={btnPrimary}>
              Get Recommendations
            </button>
          </form>
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={card}>
          <h2>Analysis</h2>
          {result.analysis?.map((item, i) => (
            <p key={i}>
              <strong>{item.nutrient}</strong>: {item.status} {item.deficiency && `(${item.deficiency})`}
            </p>
          ))}

          <h2 style={{ marginTop: "20px" }}>Recommendations</h2>
          {result.recommendations?.map((rec, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <h4>{rec.nutrient}</h4>
              {rec.suggestions?.map((s, j) => (
                <p key={j}>
                  {s.name} — {s.estimated_bags || ""} bags — ₹{s.estimated_cost || ""}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default OCRCamera;