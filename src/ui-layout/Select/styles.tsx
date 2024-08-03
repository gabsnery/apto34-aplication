import { outlinedInputClasses, Select } from "@mui/material";
import { css, useTheme } from "styled-components";

import styled from "styled-components";

export const BaseSelect = styled(Select)`
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: 8px;
  background-color: ${(props) => props.theme.paper.default};,
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.colors.black};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: normal;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &.${outlinedInputClasses.root} {
    &.Mui-focused fieldset {
      border-color: ${(props) => props.theme.colors.primary};
      border-width: 1px;
      outline: none;
      box-shadow: 0 0 8px ${(props) => props.theme.colors.primary};
    }
    line-height: normal;
    padding: 0;
    & fieldset {
      border: 1px solid ${(props) => props.theme.colors.gray};
    };

    .${outlinedInputClasses.input} {
      min-height: unset;
      margin-top: 1px;
      margin-bottom: 1px;
    }
  }
`;

export const SmallSelect = styled(BaseSelect)`
  font-size: 12px;
  &.${outlinedInputClasses.root} {
    .${outlinedInputClasses.input} {
      height: 14px;
      padding-top: ${(props) => props.theme.spacing.small};
      padding-bottom: ${(props) => props.theme.spacing.small};
    }
  }
`;
export const MediumSelect = styled(BaseSelect)`
  font-size: ${(props) => props.theme.typography.fontSize};
  &.${outlinedInputClasses.root} {
    .${outlinedInputClasses.input} {
      height: 18px;
      padding-top: ${(props) => props.theme.spacing.medium};
      padding-bottom: ${(props) => props.theme.spacing.medium};
    }
  }
`;
