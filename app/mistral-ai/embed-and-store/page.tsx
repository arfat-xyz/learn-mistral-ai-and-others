import InputFileClientComponent from "@/components/input-file";
import React from "react";

const EmbedAndStorePage = () => {
  return (
    <InputFileClientComponent
      buttonText="Store embed"
      endPoints="/api/mistral/embed-and-store"
      heading="embed-and-store into vector"
      showingFormat="text"
    />
  );
};

export default EmbedAndStorePage;
