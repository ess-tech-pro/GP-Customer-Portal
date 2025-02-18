import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameSlices } from '../constants/nameSlices';
import { ReactElement } from "react";

type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: ReactElement;
};

type Breadcrumb = {
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
  action?: ReactNode;
  links: BreadcrumbsLinkProps[];
  sx?: object;
  slotProps?: {
    action: object;
    heading: object;
    moreLink: object;
    breadcrumbs: object;
  };
};

const initialState: Breadcrumb = {
  heading: "Default Heading",
  moreLink: [],
  activeLast: false,
  action: null,
  links: [],
  sx: {},
  slotProps: {
    action: {},
    heading: {},
    moreLink: {},
    breadcrumbs: {},
  },
};

const breadcrumbsSlice = createSlice({
  name: NameSlices.BREADCRUMB,
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<Breadcrumb>) => {
      return action.payload;
    },
  },
});

export const { setBreadcrumbs } = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;
