import InputSubmitComponent from "@/components/input-submit-component";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";
import React from "react";
export const metadata = metaDataGeneratorForNormalPage("Cralwer");
const CralwersPage = () => {
  return (
    <InputSubmitComponent
      buttonValue="crawl url"
      defaultInput="https://todvob.com/"
      endPoints="/api/crawlers"
      heading="Crawl a website"
    />
  );
};

export default CralwersPage;
