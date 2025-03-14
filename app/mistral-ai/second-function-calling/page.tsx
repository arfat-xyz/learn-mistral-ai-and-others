import InputSubmitComponent from "@/components/input-submit-component";

const SecondFunctionCallingPage = () => {
  return (
    <InputSubmitComponent
      buttonValue="Get response"
      defaultInput="what is T1001 transaction payment date?"
      endPoints="/api/mistral/second-function-calling"
      heading="second-function-calling"
    />
  );
};

export default SecondFunctionCallingPage;
