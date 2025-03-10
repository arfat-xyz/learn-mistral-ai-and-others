import InputFileClientComponent from "@/components/input-file";
import React from "react";

const EmbedUsingMistralPackage = () => {
  return (
    <InputFileClientComponent
      buttonText="Get Embed"
      endPoints="/api/mistral/embed-using-mistral-package"
      heading="Embed using mistral package"
    />
  );
};

export default EmbedUsingMistralPackage;
