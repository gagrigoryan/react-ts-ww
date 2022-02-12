import React, { useRef } from "react";

function App() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        const image = imageRef.current as HTMLImageElement;
        image.src = reader.result as string;

        image.addEventListener("load", (event) => {
          const imageTarget = event.target as HTMLImageElement;
          const canvas = canvasRef.current as HTMLCanvasElement;
          const context = canvas.getContext("2d") as CanvasRenderingContext2D;
          imageTarget.width = 1024;
          imageTarget.height = 720;

          context.drawImage(imageTarget, 0, 0, 1024, 720);
          const imgData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          for (let i = 0; i < imgData.data.length; i += 4) {
            let count =
              imgData.data[i] * 0.2126 +
              imgData.data[i + 1] * 0.7152 +
              imgData.data[i + 2] * 0.0722;
            imgData.data[i] = count;
            imgData.data[i + 1] = count;
            imgData.data[i + 2] = count;
            imgData.data[i + 3] = 255;
          }
          context.putImageData(imgData, 0, 0);
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <label>
        <input onChange={handleFileChange} type="file" />
      </label>
      <img
        style={{
          display: "none",
          width: 1024,
          height: 720,
          objectFit: "cover",
        }}
        ref={imageRef}
        src=""
        alt=""
      />
      <canvas width={1024} height={720} ref={canvasRef} />
    </div>
  );
}

export default App;
