import { CircularProgress, Grid } from "@mui/material";
import Banner from "components/Banner";
import Loading from "components/Loading";
import MiniBanner from "components/MiniBanner";
import ProductsSlider from "components/ProductsSlider";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useGetBannersQuery } from "store/api/Banner";
import { useTheme, styled } from "styled-components";
import { Text, Button } from "ui-layout";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const AboutUs: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t, i18n } = useTranslation("about_us");
  const theme = useTheme();

  const StyledList = styled.ul`
    color: ${(props) => props.theme.colors.primary};
  `;
  const StyledListItem = styled.li`
    margin: ${(props) => props.theme.spacing.medium} 0;
  `;
  return (
    <Suspense fallback={<CircularProgress />}>
      <Grid
        container
        textAlign={"left"}
        direction={"column"}
        rowGap={4}
        padding={`0 ${theme.spacing.extraLarge}`}
        sx={{ whiteSpace: "pre-line" }}
      >
        <Text variant={"h2"}>{t("title")}</Text>
        <Text variant={"body"}>{t("about_us_content")}</Text>

        <Text variant={"h2"}>{t("our_tech")}</Text>
        <StyledList>
          {Array.from(Array(10).keys()).map((i) => {
            return i18n.exists(`about_us:our_tech_${i + 1}`) && (
              <StyledListItem key={i}>
                <Text variant={"body"}>
                  {t(`our_tech_${i + 1}`)}{" "}
                </Text>
              </StyledListItem>
            );
          })}
        </StyledList>

        <Text variant={"h2"}>{t("featuresTitle")}</Text>
        <StyledList>
          {Array.from(Array(10).keys()).map((i) => {
            return i18n.exists(`about_us:features_${i + 1}`) && (
              <StyledListItem key={i}>
                <Text variant={"body"}>
                  {t(`features_${i + 1}`)}{" "}
                </Text>
              </StyledListItem>
            );
          })}
        </StyledList>

        <Text variant={"h2"}>{t("setupTitle")}</Text>
        <StyledList>
          {Array.from(Array(10).keys()).map((i) => {
            return i18n.exists(`about_us:setup_${i + 1}`) && (
              <StyledListItem key={i}>
                <Text variant={"body"}>
                  {t(`setup_${i + 1}`)}{" "}
                </Text>
              </StyledListItem>
            );
          })}
        </StyledList>
        <Text variant={"h2"}>{t("next_steps")}</Text>
        <StyledList>
          {Array.from(Array(10).keys()).map((i) => {
            return i18n.exists(`about_us:next_steps_${i + 1}`) && (
              <StyledListItem key={i}>
                <Text variant={"body"}>
                  {t(`next_steps_${i + 1}`)}{" "}
                </Text>
              </StyledListItem>
            );
          })}
        </StyledList>
        <Text variant={"h2"}>{t("learningTitle")}</Text>
        <Text variant={"body"}>{t("learningDescription")}</Text>

        <Text variant={"h2"}>{t("privacyTitle")}</Text>
        <Text variant={"body"}>{t("privacyDescription")}</Text>
      </Grid>
    </Suspense>
  );
};
export default AboutUs;
