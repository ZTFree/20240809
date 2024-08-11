import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import { Document, pdfjs } from "react-pdf";
import PageItem from "./components/PageItem";

import styles from "./index.module.css";

import DownLoadButton from "./components/DownLoadButton";
import ButtonGroup from "@/components/PagesRotater/components/RotateBox/components/ButtonGroup";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  clearCanvas,
  initPagesDeg,
  setAllPagesDeg,
  setPagesDeg,
  setScale,
} from "@/redux/features/rotater-slice";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

function RotateBox(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const pagesDeg = useAppSelector((state) => state.rotaterReducer.pagesDeg);
  const canvasObjs = useAppSelector((state) => state.rotaterReducer.canvasObjs);
  const scale = useAppSelector((state) => state.rotaterReducer.scale);
  const { pdf, setPdf } = props,
    pdfRef = useRef<any>(null),
    [pageNumber, setPageNumber] = useState<number>(1);

  const handleRemovePdf = useCallback(() => {
    setPdf(null);
    setPageNumber(0);
    dispatch(clearCanvas());
    dispatch(setScale(1));
  }, []);

  const onDocumentLoadSuccess = useCallback(
    (pdf: { numPages: number }): void => {
      pdfRef.current = pdf;
      setPageNumber(pdf.numPages);
      dispatch(initPagesDeg(new Array(pdf.numPages).fill(0)));
    },
    [],
  );

  const pageRotate = (num: number) => {
    dispatch(
      setPagesDeg({
        index: num - 1,
        deg: pagesDeg[num - 1] + 90,
      }),
    );
  };

  const fileUrl = useMemo(() => {
    return URL.createObjectURL(pdf);
  }, [pdf]);

  // pdf内容列表
  const pageList = useMemo(() => {
    const list = [];

    for (let i = 1; i <= pageNumber; i++) {
      list.push(
        <PageItem
          scale={scale}
          roateDeg={pagesDeg[i - 1]}
          pageNumber={i}
          key={i}
        />,
      );
    }
    return list;
  }, [pageNumber, scale, pagesDeg]);

  // 全旋转
  function handleRotateAllPdf() {
    dispatch(setAllPagesDeg([...pagesDeg].map((v) => v + 90)));
  }

  const pBoxRef = useRef(null);

  const isRederOver = useMemo(() => {
    return pageNumber && pageNumber === canvasObjs.length;
  }, [pageNumber, canvasObjs]);

  return (
    <>
      <Spin
        indicator={
          <LoadingOutlined spin style={{ color: "#000", fontSize: "32px" }} />
        }
        style={{ display: isRederOver ? "none" : "block" }}
      />
      <div
        className={`${styles.rotateBox} ${!isRederOver && styles.docLoading}`}
      >
        <ButtonGroup
          handleRemovePdf={handleRemovePdf}
          handleRotateAllPdf={handleRotateAllPdf}
        />

        <div className={styles.pagesBox} ref={pBoxRef}>
          <Document
            loading={""}
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className={styles.pagesDoc}
          >
            {pageList}
          </Document>
        </div>

        <div className={styles.footer}>
          <DownLoadButton />
        </div>
      </div>
    </>
  );
}

export default RotateBox;
