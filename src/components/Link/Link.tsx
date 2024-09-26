import NextLink from "next/link";
import { ILinkComponentProps } from "./interfaces";
import { Typography, useTheme } from "@mui/material";

const LinkComponent: React.FC<ILinkComponentProps> = ({
  children,
  href,
  color,
  variant = "h6",
  ...props
}) => {
  const theme = useTheme();

  return (
    <NextLink href={href} passHref legacyBehavior>
      <Typography
        variant={variant}
        component={"a"}
        style={{
          flexGrow: 1,
          cursor: "pointer",
          color: color ? color : theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </Typography>
    </NextLink>
  );
};

export { LinkComponent };
