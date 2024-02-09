"use client"

import { useFormState, useFormStatus } from "react-dom";
// import { useRef } from "react";
import { upload } from "@/lib/actions";

export function UploadVideo() {
  const { pending } = useFormStatus();
  console.log("Value of pending:", pending);

//   const ref = useRef(null);
 
  // const [state, action] = useFormState(action, {
  //   message: "",
  //   inputLink: "",
  // });

  return (
    <div className="flex flex-col items-center ">
      <form
        // ref={ref}
        action={upload}
        // action={action}
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
