"use client";
import { removeDashFromString } from "@/lib/utils-function";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import RainbowHeading from "../rainbow-heading";
import { IoCloseOutline } from "react-icons/io5";
import { CgSpinnerTwo } from "react-icons/cg";
import InputFileClientComponent from "../input-file";

const UploadFileMakeChunkClientCompnent = () => {
  return (
    <InputFileClientComponent
      endPoints={`/api/mistral/upload-file-make-chunk`}
      heading={`Upload file and make chunk`}
      buttonText="Upload file and get chunks"
      showingFormat="text"
    />
  );
};

export default UploadFileMakeChunkClientCompnent;
