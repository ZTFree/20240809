import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  pagesDeg: number[];
  canvasObjs: {
    index: number;
    url: string;
  }[];
  scale: number;
};

const initialState: InitialStateType = {
  pagesDeg: [],
  canvasObjs: [],
  scale: 1,
};

export const rotater = createSlice({
  name: "rotater",
  initialState,
  reducers: {
    initPagesDeg: (state, action) => {
      return { ...state, pagesDeg: action.payload };
    },
    setPagesDeg: (state, action) => {
      const nArr = [...state.pagesDeg];
      const { index, deg } = action.payload;
      nArr[index] = deg;
      return {
        ...state,
        pagesDeg: nArr,
      };
    },
    setAllPagesDeg: (state, action) => {
      return {
        ...state,
        pagesDeg: action.payload,
      };
    },
    clearCanvas: (state) => {
      return { ...state, canvasObjs: [] };
    },
    addCanvas: (state, action) => {
      return { ...state, canvasObjs: [...state.canvasObjs, action.payload] };
    },
    setScale: (state, action) => {
      return { ...state, scale: action.payload };
    },
  },
});

export const {
  initPagesDeg,
  setPagesDeg,
  setAllPagesDeg,
  clearCanvas,
  addCanvas,
  setScale,
} = rotater.actions;

export default rotater.reducer;
