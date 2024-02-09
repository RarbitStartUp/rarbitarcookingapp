"use client"

import { useFormState, useFormStatus } from "react-dom";
import { useState,useEffect } from "react";
import { upload } from "@/lib/actions";

export function UploadVideo() {
  const [progress, setProgress] = useState(0);
  const { pending } = useFormStatus();
  console.log("Value of pending:", pending);
 
const initialState = {
  message: "",
};

  const [state, action] = useFormState(upload, initialState);
  // const [state, action] = useFormState(upload, {
  //   message: "",
  //   // inputLink: "",
  // });

// Function to fetch progress updates from the server-side endpoint
// const fetchProgress = async () => {
//   try {
//     const response = await fetch('/api/progress'); // Use the API endpoint URL
//     if (!response.ok) {
//       throw new Error('Failed to fetch progress from the server');
//     }
//     const data = await response.json();
//     console.log("data:",data);
//     setProgress(data.progress);
//   } catch (error) {
//     console.error('Error fetching progress:', error);
//   }
// };

// Fetch progress updates on component mount
// useEffect(() => {
//   const interval = setInterval(fetchProgress, 1000); // Fetch progress every second
//   return () => clearInterval(interval); // Clean up interval on component unmount
// }, []);

  return (
    <div className="flex flex-col items-center ">
      <form
        // ref={ref}
        action={upload}
        // action={action}
        className="flex flex-col items-center"
      >
        {state.message && <p>{state.message}</p>}
        <progress className="mb-2 w-full sm:w-auto" value={progress} max="100" />
        <input
          type="text"
          placeholder="Paste Your Youtube Link"
          name="inputLink"
          className="mb-2 p-2 shadow-inner border text-center rounded w-full sm:w-auto sm:p-2 focus:outline-none focus:ring-5 focus:ring-slate-500 "
        ></input>
        <button
          type="submit"
          className="aria-disabled={pending} bg-slate-300 text-slate-700 drop-shadow-md font-semibold px-4 py-2 rounded w-full sm:w-auto sm:px-2 min-h-[2rem]"
        >
          {pending ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
