import InputSubmitComponent from "@/components/input-submit-component";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage("Chat Completion");
const ChatCompletionsPage = () => {
  return (
    <InputSubmitComponent
      buttonValue="Get response"
      defaultInput="What is the best French cheese?"
      endPoints="/api/mistral/chat-stream"
      heading="Chat Stream"
    />
  );
};

export default ChatCompletionsPage;
