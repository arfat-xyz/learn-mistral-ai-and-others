import InputSubmitComponent from "@/components/input-submit-component";

const UnpackingFunctionAndArguments = () => {
  return (
    <InputSubmitComponent
      buttonValue="Get response"
      defaultInput="what is T1001 transaction payment date?"
      endPoints="/api/mistral/unpacking-function-and-arguments"
      heading="unpacking-function-and-arguments"
    />
  );
};

export default UnpackingFunctionAndArguments;
