import { useState, useRef, useEffect } from "react";
import Button from "./button";

interface EditorTypes {
  source: string;
  open: boolean;
  handleClose: () => void;
  onChangeImage: (source: string, url: string) => void;
}

const ImageEditor = ({
  source,
  open,
  onChangeImage,
  handleClose
}: EditorTypes) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageInfo, setImageInfo] = useState<any>({ width: 1, height: 1 });

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = source;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      // draw the image on the canvas
      canvas.width = img.width;
      canvas.height = img.height;
      setImageInfo({ width: img.width, height: img.height });
      ctx.drawImage(img, 0, 0);
    };
  }, [source, open]);

  const startDrawing = (e: any) => {
    e.preventDefault();
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: any) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas: any = canvasRef.current;
    const ctx: any = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, 10, 10);
  };

  const onClickSave = () => {
    const canvas: any = canvasRef.current;
    canvas.toBlob((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      onChangeImage(source, url);
      handleClose();
    }, "image/png");
    
  };

  return (
    <>
      <div
        className={`${
          open ? "block" : "hidden"
        } md:h-[calc(100%-150px)] md:w-auto w-[80%] h-auto fixed top-[50%] left-[50%] bottom-auto !-translate-x-[50%] !-translate-y-[50%] -mr-[50%] z-50 border-2 border-lime-800`}
        style={{ aspectRatio: `${imageInfo.width / imageInfo.height}` }}
      >
        <canvas
          className="absolute top-0 left-0 w-full h-full z-1"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
        />
        <Button
          className="bg-[#2b2dbd] text-white text-xl font-bold border border-[#2b2dbd] hover:bg-white hover:text-[#2b2dbd] absolute right-0 -top-0 animate-bounce"
          onClick={onClickSave}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ImageEditor;
