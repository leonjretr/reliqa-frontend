import Script from "next/script";

type Props = {
  url?: string;
  websiteId?: string;
  recorder?: boolean;
};

export const UmamiProvider = ({ url, websiteId, recorder = true }: Props) => {
  if (!url || !websiteId) {
    return null;
  }

  return (
    <>
      <Script src={`${url}/script.js`} data-website-id={websiteId} strategy="afterInteractive" />
      {recorder && (
        <Script
          src={`${url}/recorder.js`}
          data-website-id={websiteId}
          strategy="afterInteractive"
        />
      )}
    </>
  );
};
