import { TypographyProps } from "@mui/material";

export interface ILinkComponentProps extends TypographyProps {
  children: React.ReactNode;
  href: string;
  color?: string;
}
