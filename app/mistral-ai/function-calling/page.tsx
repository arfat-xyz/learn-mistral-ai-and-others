import InputSubmitComponent from "@/components/input-submit-component";

const FunctionCallingPage = () => {
  return (
    <InputSubmitComponent
      buttonValue="Get response"
      defaultInput="Is the transaction T1001 paid?"
      endPoints="/api/mistral/function-calling"
      heading="function-calling"
    />
  );
};

export default FunctionCallingPage;
