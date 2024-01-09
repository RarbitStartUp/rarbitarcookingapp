import { uploadVideoGS } from "@/lib/uploadVideoGS";

const uploadVideo = () => {
  return (
    <div>
      <form action={uploadVideoGS}>
        <input
          type="text"
          placeholder="Youtube Video link"
          name="inputLink"
        ></input>
        <button>Upload</button>
      </form>
    </div>
  );
};

export default uploadVideo;
