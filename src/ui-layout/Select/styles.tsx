import { outlinedInputClasses, Select, styled } from "@mui/material";
import { lightTheme as theme } from "../theme";

export const BaseSelect = styled(Select)`
  padding: ${theme.spacing.medium};
  border-radius: 8px;
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize};
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: normal;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &.${outlinedInputClasses.root} {
    &.Mui-focused fieldset {
      border-color: ${theme.colors.primary};
      border-width: 1px;
      outline: none;
      box-shadow: 0 0 8px ${theme.colors.primary};
    }
    line-height: normal;
    padding: 0;
    & fieldset {
      border: 1px solid ${theme.colors.gray};
    }

    .${outlinedInputClasses.input} {
      min-height: unset;
      padding-top: ${theme.spacing.medium};
      padding-bottom: ${theme.spacing.medium};
      margin-top: 1px;
      margin-bottom: 1px;
    }
  }
`;
