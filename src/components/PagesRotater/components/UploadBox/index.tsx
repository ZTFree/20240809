import styles from "./index.module.css";
import { CloudUploadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

function UploadBox(props: any) {
  const { setPdf } = props,
    inpRef = useRef<HTMLInputElement | null>(null),
    tipsRef = useRef<HTMLDivElement | null>(null),
    uploadBoxRef = useRef<HTMLDivElement | null>(null);

  const [isDrag, setIsDrag] = useState(false);

  const handleClick = () => {
    inpRef.current?.click();
  };

  const handleChange = (e: Event) => {
    if (inpRef.current?.files?.length) {
      setPdf(inpRef.current?.files[0]);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDrag(false);
    const items = e.dataTransfer?.items;
    const entry = items[0].webkitGetAsEntry();
    if (entry.isFile) {
      entry.file((file: File) => {
        if (file.type === "application/pdf") {
          setPdf(file);
        }
      });
    }
  };

  const handleDragOver = (e: Event) => {
    e.preventDefault();
    setIsDrag(true);
  };

  useEffect(() => {
    if (inpRef.current && tipsRef.current && uploadBoxRef.current) {
      // 点击选择文件
      tipsRef.current.addEventListener("click", handleClick);
      inpRef.current.addEventListener("change", handleChange);

      // 文件拽入功能
      uploadBoxRef.current.addEventListener("drop", handleDrop, true);
      uploadBoxRef.current.addEventListener("dragover", handleDragOver, true);
    }
    return () => {
      tipsRef.current?.removeEventListener("click", handleClick);
      inpRef.current?.removeEventListener("change", handleChange);
      uploadBoxRef.current?.removeEventListener("drag", handleDrop);
      uploadBoxRef.current?.removeEventListener("dragover", handleDragOver);
    };
  }, [uploadBoxRef, tipsRef, inpRef]);

  return (
    <div
      className={`${styles.uploadBox} ${isDrag && styles.dragOver}`}
      ref={uploadBoxRef}
    >
      <div className={styles.tips} ref={tipsRef}>
        <input
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          ref={inpRef}
        />
        <CloudUploadOutlined style={{ fontSize: "32px" }} />
        <div>Click to upload or drag and drop</div>
      </div>
    </div>
  );
}

export default UploadBox;
