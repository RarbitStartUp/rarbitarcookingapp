"use client";

import { useEffect, useState } from "react";

export function Simplify() {
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate some asynchronous data fetching
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Simulate receiving data
        const simulatedData = { result: "Simulated AI result" };
        setAiResult(simulatedData.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>AI Result: {aiResult}</div>
    </div>
  );
}
