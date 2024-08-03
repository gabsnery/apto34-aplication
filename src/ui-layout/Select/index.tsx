import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Checkbox,
  FormControl,
  ListSubheader,
  MenuItem,
  SelectProps as MUISelectPropsProps,
  Radio,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import styled, { css, useTheme } from "styled-components";
import { Button } from "../Button";
import { Text } from "../Text";
import { MediumSelect, SmallSelect } from "./styles";
import { StyledComponent as MUIStyledComponent } from "@emotion/styled";

interface OptionProps {
  icon?: JSX.Element;
  group?: string;
  value: string;
  label: string;
}
interface _SelectProps extends MUISelectPropsProps {
  mainIcon?: JSX.Element;
  options?: OptionProps[];
  type?: "multiple" | "radio";
  size?: "small" | "medium";
  footer?: "basic" | "complete";
}
const StyledComponent = styled.div<{ size: "small" | "medium" }>`
  display: flex;
  flex-direction: column;
  text-align: left;
  ${(props) => sizeStyles[props.size]};
`;
const StyledLabel = styled.label<{ size: "small" | "medium" }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSize};
  font-weight: 500;
  text-transform: capitalize;
  color: ${(props) => props.theme.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.small};
  ${(props) => labelSizeStyles[props.size]};
`;

const labelSizeStyles = {
  small: css`
    font-size: 12px;
  `,
  medium: css`
    font-size: ${(props) => props.theme.typography.fontSize};
  `,
};
const sizeStyles = {
  small: css`
    margin-bottom: ${(props) => props.theme.spacing.small};
  `,
  medium: css`
    margin-bottom: ${(props) => props.theme.spacing.medium};
  `,
};

const StyledTypographiesDictionary = {
  small: SmallSelect,
  medium: MediumSelect,
} as unknown as Record<string, MUIStyledComponent<_SelectProps>>;

const getStyledComponent: (props: string) => MUIStyledComponent<any> = (size) =>
  StyledTypographiesDictionary[`${size}`] ?? <></>;

export const Select: FC<_SelectProps> = ({
  children,
  type,
  mainIcon,
  label,
  footer,
  options,
  size = "medium",
  ...SelectProps
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const renderItems = (_options: OptionProps[] | undefined) => {
    let { grouped, options } = sortedOptions(_options);
    if (grouped) {
      let elements: any[] = [];
      for (const [key, value] of Object.entries(options)) {
        elements.push(
          <ListSubheader key={key}>
            {renderItem(
              { value: key, label: key },
              SelectProps["value"] ?? [],
              type,
              true
            )}
          </ListSubheader>
        );
        elements.push(
          (value as OptionProps[]).map((i: any, index) => (
            <MenuItem key={index}>
              {renderItem(i, SelectProps["value"] ?? [], type, false)}
            </MenuItem>
          ))
        );
      }
      elements.push(renderFooter(footer));
      return elements;
    }
    return [
      options.map((y: any, idx: any) => {
        return (
          <MenuItem value={y.value} key={idx}>
            {renderItem(y, SelectProps["value"], type, false)}
          </MenuItem>
        );
      }),
      renderFooter(footer),
    ];
  };

  const renderFooter = (footer: any) => {
    switch (footer) {
      case "basic":
        return (
          <Box
            key={"items_footer"}
            sx={{
              display: "flex",
            }}
          >
            <Button variant="primary" color="primary">
              {t("ok")}
            </Button>
          </Box>
        );
      case "complete":
        return (
          <Box
            key={"items_footer"}
            sx={{
              display: "flex",
            }}
          >
            <Button disabled={false} color="primary" variant="tertiary">
              {t("clear")}
            </Button>
            <Button variant="primary" color="primary">
              {t("ok")}
            </Button>
          </Box>
        );
      default:
        return;
    }
  };
  const StyledSelect = getStyledComponent(size);

  return (
    <FormControl fullWidth sx={{ width: "100%" }} variant="outlined">
      <StyledComponent size={size}>
        <StyledLabel size={size}>{label}</StyledLabel>

        <StyledSelect
          inputProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: theme.paper.default,
                },
              },
            },
          }}
          IconComponent={KeyboardArrowDown}
          fullWidth
          renderValue={(value: any) => renderValue(value, options ?? [], type)}
          {...SelectProps}
        >
          {renderItems(options)}
        </StyledSelect>
      </StyledComponent>
    </FormControl>
  );
};

const renderValue = (
  value: unknown,
  options: OptionProps[],
  type?: "multiple" | "radio"
) => {
  switch (type) {
    case "multiple":
      return (
        <Text>
          {(value as [])
            .map((i) => options.find((j) => j.value === i)?.label)
            .join(", ")}
        </Text>
      );
    case "radio":
      return <>{options.find((j) => j.value === value)?.label}</>;
    default:
      return <Text>{options.find((j) => j.value === value)?.label}</Text>;
  }
};
const renderItem = (
  item: OptionProps,
  selectedValue: unknown | unknown[],
  type?: "multiple" | "radio",
  parent?: boolean
) => {
  if (parent)
    return (
      <>
        <Text
          variant={"body"}
          color={"secondary"}
          sx={{ color: "#DADBAD", marginTop: "16px" }}
        >
          {item.label ?? item.group}
        </Text>
      </>
    );
  switch (type) {
    case "multiple":
      return (
        <>
          {item.icon ?? ""}
          <Text variant="body">{item.label ?? item.group}</Text>
          <Checkbox
            sx={{
              width: "32px",
              "&.Mui-checked": {
                color: "white",
              },
            }}
            checked={(selectedValue as unknown[]).indexOf(item.value) > -1}
          />
        </>
      );
    case "radio":
      return (
        <>
          {item.icon ?? ""}
          <Text variant="body">{item.label ?? item.group}</Text>
          <Radio
            sx={{
              width: "32px",
              "&.Mui-checked": {
                color: "white",
              },
            }}
            checked={item.value === selectedValue}
          />
        </>
      );
    default:
      return (
        <>
          {item.icon ?? ""}
          <Text variant="body">{item.label ?? item.group}</Text>
        </>
      );
  }
};
const sortedOptions = (_options: any[] | undefined) => {
  if (!_options) return { grouped: false, options: [] };

  let containGroup = false;
  for (var i = 0; i < _options.length; i++) {
    if (_options[i].hasOwnProperty("group")) {
      containGroup = true;
      break;
    }
  }
  if (!containGroup) return { grouped: false, options: _options };
  else {
    let result = _options.reduce(function (r: any, a: any) {
      r[a.group ?? ""] = r[a.group ?? ""] || [];
      r[a.group ?? ""].push(a);
      return r;
    }, Object.create(null));
    return { grouped: true, options: result };
  }
};
