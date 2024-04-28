"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Image from "next/image";

interface UploadImageCardProps {
  onClickButton(image: any): void;
}

export function UploadImageCard({ onClickButton }: UploadImageCardProps) {
  const [selectedImage, setSelectedImage] = useState();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  const imageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0].name);
    }
  };

  const clickUpload = () => {
    onClickButton(selectedImage);
  };

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      setSelectedImage(e.dataTransfer.files[0]);
    }
    // console.log(e.dataTransfer.files);
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload a photo</CardTitle>
        <CardDescription>Select a photo from your device</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 p-8 w-full">
        <div className="w-6/12 flex items-center justify-center border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700">
          <Image
            alt="Preview"
            className="rounded-lg w-full"
            height={0}
            src={
              selectedImage != null
                ? URL.createObjectURL(selectedImage)
                : "/placeholder.svg"
            }
            style={{
              aspectRatio: "1/1",
              objectFit: "cover",
            }}
            // sizes="100vw"
            width={0}
          />
        </div>
        <div
          className="flex flex-col gap-2 w-max"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Label
            className={`border-dashed border-2 rounded-lg p-6 flex items-center justify-center border-gray-200 ${
              dragActive ? "dark:border-blue-700" : "dark:border-gray-700"
            } cursor-pointer`}
          >
            <UploadIcon className="w-6 h-6" />
            <span className="ml-2">Drag & Drop or Browse</span>
            <Input
              className="sr-only"
              id="file"
              type="file"
              accept="image/*"
              onChange={imageChange}
            />
          </Label>
          <Button onClick={clickUpload}>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
