"use client";

import React, { useState } from "react";
import { UploadImageCard } from "@/components/component/upload-image-card";
import ResultDialog from "@/components/component/result-dialog";
import Image from "next/image";
import axios from "axios";
import { BadgeCheck, BadgeInfo } from "lucide-react";

type resultModel = {
  have_cancer: number;
  no_cancer: number;
};

export default function Home() {
  const [isResultRecieve, setResultRecieve] = useState(false);
  const [result, setResult] = useState<resultModel>({
    have_cancer: 0,
    no_cancer: 0,
  });

  const uploadImage = async (image: any) => {
    setResultRecieve(false);
    const formData = new FormData();
    formData.append("image", image);
    openDialog();
    axios.post("http://127.0.0.1:5000/predict", formData).then((e) => {
      setResultRecieve(true);
      setResult(e.data.result);
    });
  };
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex flex-col items-center justify-between px-24 py-10">
      <div className="font-mono text-4xl mb-10">Cancer Detection Using CNN</div>
      <div className="w-full font-mono text-sm lg:flex">
        <UploadImageCard onClickButton={uploadImage} />
      </div>

      <ResultDialog
        title="Scan Result"
        open={isOpen}
        onClose={() => closeDialog()}
        onConfirm={() => {}}
      >
        {isResultRecieve ? (
          result.have_cancer > result.no_cancer ? (
            <div>
              <div className="w-full flex justify-center">
                <BadgeInfo size={"100"} color="red" />
              </div>
              <div className="w-full flex justify-center mt-2 font-mono">
                Cancer if found, with accuracy of {result.have_cancer * 100}%
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full flex justify-center">
                <BadgeCheck size={"100"} color="aqua" />
              </div>
              <div className="w-full flex justify-center mt-2 font-mono">
                No cancer if found, with accuracy of {result.no_cancer * 100}%
              </div>
            </div>
          )
        ) : (
          <div>
            <div className="w-full flex justify-center">
              <Image
                src={"https://i.gifer.com/ZKZg.gif"}
                alt="my gif"
                className=""
                height={60}
                width={60}
                unoptimized={true}
              />
            </div>
            <div className="w-full flex justify-center mt-2 font-mono">
              Waiting for result
            </div>
          </div>
        )}
      </ResultDialog>
    </main>
  );
}
