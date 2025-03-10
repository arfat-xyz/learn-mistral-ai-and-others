import UploadFileMakeChunkClientCompnent from "@/components/mistral-ai/upload-file-make-chunk-client";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage(
  "Upload File and make chunk"
);
const UploadFileMakeChunkPage = () => {
  return <UploadFileMakeChunkClientCompnent />;
};

export default UploadFileMakeChunkPage;
