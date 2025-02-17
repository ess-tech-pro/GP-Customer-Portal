import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';
import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import { ReactElement } from 'react';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: ReactElement;
};

export type CustomBreadcrumbsProps = BoxProps &
  BreadcrumbsProps & {
    heading?: string;
    moreLink?: string[];
    activeLast?: boolean;
    action?: ReactNode;
    links: BreadcrumbsLinkProps[];
    slotProps?: {
      action: SxProps<Theme>;
      heading: SxProps<Theme>;
      moreLink: SxProps<Theme>;
      breadcrumbs: SxProps<Theme>;
    };
  };
