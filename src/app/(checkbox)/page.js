import { DisplayCheckbox } from "@/components/displayCheckbox/DisplayCheckbox";

const getData = async () => {
  const res = await fetch("../../api/uploadVideoGS.js");

  if (!res.ok) {
    throw new Error("Fail to fetch from uploadVideGS");
  }
};

export async function Checkbox() {
  const aiResponse = await getData();
  return (
    <div className="flex flex-col items-center ">
      <DisplayCheckbox aiResponse={aiResponse} onAddItem={""} />
    </div>
  );
}
