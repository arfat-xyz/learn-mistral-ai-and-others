import MistralAIClientComponent from "@/components/mistral-ai/mistral-ai-client-component";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage("Mistral AI");
const MistralAIPage = () => {
  return <MistralAIClientComponent />;
};

export default MistralAIPage;
