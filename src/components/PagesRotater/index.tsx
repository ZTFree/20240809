import styles from "./index.module.css";
import UploadBox from "@/components/PagesRotater/components/UploadBox";
import TitleBox from "@/components/PagesRotater/components/TitleBox";
import { useState } from "react";
import dynamic from "next/dynamic";

const RotateBox = dynamic(() => import("./components/RotateBox/index"), {
  ssr: false,
});

function PagesRotater() {
  const [pdf, setPdf] = useState<File | null>(null);

  return (
    <div className={styles.wrapBox}>
      <TitleBox />

      {!pdf ? (
        <UploadBox setPdf={setPdf} />
      ) : (
        <RotateBox pdf={pdf} setPdf={setPdf} />
      )}
    </div>
  );
}

export default PagesRotater;
