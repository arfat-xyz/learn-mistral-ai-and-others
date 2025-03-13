import InputSubmitStreamComponent from "@/components/input-submit-stream-component";
import React from "react";

const QNAWithRagPage = () => {
  return (
    <InputSubmitStreamComponent
      buttonValue="Get response"
      defaultInput="December 25th is on a Sunday, do I get any extra time off to account for that?"
      endPoints="/api/mistral/qna-with-rag"
      heading="qna-with-rag"
    />
  );
};

export default QNAWithRagPage;
