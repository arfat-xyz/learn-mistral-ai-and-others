import InputSubmitComponent from "@/components/input-submit-component";

const UnpackingFunctionAndArgumentsAndCallItWithLoop = () => {
  return (
    <InputSubmitComponent
      buttonValue="Get response"
      defaultInput="what is T1001 transaction payment date?"
      endPoints="/api/mistral/complete-agent"
      heading="Mistral complete-agent"
    />
  );
};

export default UnpackingFunctionAndArgumentsAndCallItWithLoop;
