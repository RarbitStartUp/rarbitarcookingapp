"use client";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { uploadVideoGS } from "@/lib/uploadVideoGS";

export function UploadVideo() {
  const { pending } = useFormStatus();
  const ref = useRef(null);
  const router = useRouter(); // Initialize the useRouter hook

  // const [state, action] = useFormState(action, {
  //   message: "",
  //   inputLink: "",
  // });

  return (
    <div className="flex flex-col items-center ">
      <form
        ref={ref}
        // action={action}
        action={async (formData) => {
          const apiResponse = await uploadVideoGS(formData);

          // Log the apiResponse for debugging
          console.log("API response:", apiResponse);

          // Check if the apiResponse is valid
          if (
            apiResponse &&
            apiResponse.role === "model" &&
            apiResponse.parts
          ) {
            // Parse the JSON data from the apiResponse
            const jsonString = apiResponse.parts[0].text;
            const jsonData = JSON.parse(jsonString);

            const newSearchParams = new URLSearchParams();
            newSearchParams.set("checklistData", JSON.stringify(jsonData));

            router.push(`/checkbox?${newSearchParams.toString()}`);

            // Update the form state message to "Upload successfully!"
            action({ message: "Upload successfully!" });

            // Reset the form
            ref.current?.reset();
          } else {
            console.error("Invalid API response");
          }
        }}
        // action={uploadVideoGS}
        className="flex flex-col items-center"
      >
        {/* {state.message && <p>{state.message}</p>} */}

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
