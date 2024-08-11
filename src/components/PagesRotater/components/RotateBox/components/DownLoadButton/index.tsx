import ReactPDF, {
  Document,
  Page,
  PDFDownloadLink,
  View,
  Image,
} from "@react-pdf/renderer";
import {
  memo,
  ReactElement,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "@/redux/store";
import { Popover, Space, Spin } from "antd";
import styles from "../ButtonGroup/index.module.css";
import { LoadingOutlined } from "@ant-design/icons";

//通过下面的函数将dataURL转为Blob文件
function dataURLtoBlob(dataurl: string) {
  const arr = dataurl.split(",");
  const res = arr[0].match(/:(.*?);/);
  const mime = res ? res[1] : "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function DownLoadButton() {
  const pagesDeg = useAppSelector((state) => state.rotaterReducer.pagesDeg),
    canvasObjs = useAppSelector((state) => state.rotaterReducer.canvasObjs);

  const [pdfDoc, setPdfDoc] = useState<ReactElement | null>(null);

  // 更新pdfDoc状态
  const buildDoc = useCallback(() => {
    // 异步添加的CanvasObj进行按索引排序
    [...canvasObjs].sort((a, b) => a.index - b.index);

    // 构筑Document结构
    startTransition(async () => {
      setPdfDoc(
        <Document>
          {canvasObjs.map((obj) => {
            return (
              <Page key={obj.index}>
                <View fixed={true}>
                  <Image
                    style={{ transform: `rotate(${pagesDeg[obj.index]}deg)` }}
                    src={obj.url}
                  ></Image>
                </View>
              </Page>
            );
          })}
        </Document>,
      );
    });
  }, [canvasObjs, pagesDeg]);

  const dowloadBtnRef = useRef<HTMLButtonElement>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  const handleDownLoad = () => {
    if (isBuilding) return;
    setIsBuilding(true);
    buildDoc();
  };

  useEffect(() => {
    if (pdfDoc && dowloadBtnRef.current) {
      const link = dowloadBtnRef.current.querySelector("a");

      const preHref = link?.href;
      const timer = setInterval(() => {
        clearInterval(timer);
        setIsBuilding(false);
        link?.click();
      }, 100);
    }
  }, [pdfDoc]);

  return (
    <>
      <Popover content="Split and download PDF">
        <button className={styles.orangeButton} onClick={handleDownLoad}>
          <Space align={"center"}>
            download
            {isBuilding && (
              <Spin
                indicator={
                  <LoadingOutlined
                    spin
                    style={{ color: "#fff", fontSize: "20px" }}
                  />
                }
                size={"small"}
              />
            )}
          </Space>
        </button>
      </Popover>
      <button style={{ display: "none" }} ref={dowloadBtnRef}>
        <PDFDownloadLink document={pdfDoc as ReactElement} />
      </button>
    </>
  );
}

const DL = memo(DownLoadButton);

export default DL;
