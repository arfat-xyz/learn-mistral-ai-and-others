import InputSubmitStreamComponent from "@/components/input-submit-stream-component";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage("Stream");
const StreamPage = () => {
  return (
    <InputSubmitStreamComponent
      buttonValue="Stream"
      defaultInput="What is the name of out galaxy"
      endPoints={`/api/mistral/chat-stream`}
      heading="Stream"
    />
  );
};

export default StreamPage;
