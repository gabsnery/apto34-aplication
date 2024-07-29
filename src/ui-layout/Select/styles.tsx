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
    line-height: normal;
    padding: 0;
    border: none;
    & fieldset {
      border: 1px solid ${theme.colors.primary};
    }
      
    &:focus {
      border-color: red;
      outline: none;
      box-shadow: 0 0 8px ${theme.colors.secondary};
    }
    .${outlinedInputClasses.input} {
   border: 5px dotted blue;

      min-height: unset;
      padding-top: ${theme.spacing.medium};
      padding-bottom: ${theme.spacing.medium};
      margin-top: 1px;
      margin-bottom: 1px;
    }
  }
  &.${outlinedInputClasses.focused}: {
   border: 5px dotted red;
  }
  &:focus {
    border-color: ${theme.colors.secondary};
    outline: none;
    box-shadow: 0 0 8px ${theme.colors.secondary};
  }
`;
