import InputSubmitComponent from "@/components/input-submit-component";

const UnpackingFunctionAndArgumentsAndCallIt = () => {
  return (
    <InputSubmitComponent
      buttonValue="Get response"
      defaultInput="what is T1001 transaction payment date?"
      endPoints="/api/mistral/unpack-function-and-arguments-and-call-it"
      heading="unpack-function-and-arguments-and-call-it"
    />
  );
};

export default UnpackingFunctionAndArgumentsAndCallIt;
