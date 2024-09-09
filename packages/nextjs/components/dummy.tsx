'use client'

import { useEffect, useState } from "react";
import { pinata } from "@/utils/config";

function App() {
  const [selectedFile, setSelectedFile]: any = useState();
  const [receivedFile, setReceivedFile]: any = useState();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.file(selectedFile)
      console.log(upload);

      const signedUrl = await pinata.gateways.createSignedURL({
          cid: upload.cid,
          expires: 3600
      })

      setImageUrl(signedUrl)
      console.log(signedUrl)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label"> Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
      
      {imageUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded file" className="max-w-full h-auto" />
        </div>
      )}
    </>
  );
}

export default App;
