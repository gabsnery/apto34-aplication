import React, { FC } from "react";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useGenerateSignedFileQuery } from "store/api/default";
import { Button } from "ui-layout";

const CookiesConsent: FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation();
  const language = useSelector((st: RootState) => st.language);

  
  const {data} = useGenerateSignedFileQuery(`terms_of_use_${language || 'pt-BR'}.pdf`)


  return (
    <CookieConsent
    location="bottom"
    buttonText="Ok"
    style={{ background: "#2B373B" }}
    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
    expires={150}
  >
    {t('cookies_consent_text')}
    <Button variant={'primary'} onClick={()=>{
      window.open(data?.url, "_blank", "noreferrer");
    }}> Privacy </Button>
  </CookieConsent>
  );
};

export default CookiesConsent;
