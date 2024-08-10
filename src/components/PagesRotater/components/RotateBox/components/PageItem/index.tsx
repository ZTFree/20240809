import { Page } from "react-pdf";
import styles from "./index.module.css";
import { SyncOutlined } from "@ant-design/icons";
import { memo, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addCanvas, setPagesDeg } from "@/redux/features/rotater-slice";

function PageItem({
  pageNumber,
  scale,
  roateDeg,
}: {
  pageNumber: number;
  scale: number;
  roateDeg: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const pageRef = useRef<HTMLDivElement>(null);

  const hanldleRenderSuccess = () => {
    const canvas = pageRef.current?.querySelector("canvas");

    // 获取canvas dataUrl
    dispatch(
      addCanvas({
        index: pageNumber - 1,
        url: canvas?.toDataURL("image/jpeg"),
      }),
    );
  };

  return (
    <div className={styles.pageWrap}>
      <button
        className={styles.rotateButton}
        onClick={() =>
          dispatch(setPagesDeg({ index: pageNumber - 1, deg: roateDeg + 90 }))
        }
      >
        <SyncOutlined />
      </button>
      <div
        className={styles.page}
        style={{
          width: `${220 * scale}px`,
          height: `${340 * scale}px`,
          rotate: `${roateDeg}deg`,
        }}
      >
        <Page
          renderTextLayer={false}
          renderAnnotationLayer={false}
          pageNumber={pageNumber}
          loading={<SyncOutlined spin />}
          inputRef={pageRef}
          onRenderSuccess={hanldleRenderSuccess}
        />
      </div>
      <div className={styles.pageFooter}>{pageNumber}</div>
    </div>
  );
}

const PageItemMemo = memo(PageItem);

export default PageItemMemo;
