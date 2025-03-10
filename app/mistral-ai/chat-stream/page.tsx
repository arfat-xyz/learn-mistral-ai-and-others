import InputSubmitStreamComponent from "@/components/input-submit-stream-component";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";

export const metadata = metaDataGeneratorForNormalPage("Chat Completion");
const ChatCompletionsPage = () => {
  return (
    <InputSubmitStreamComponent
      buttonValue="Get response"
      defaultInput="how to make best French cheese?"
      endPoints="/api/mistral/chat-stream"
      heading="Chat Stream"
    />
  );
};

export default ChatCompletionsPage;
