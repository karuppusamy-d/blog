export const GA_TRACKING_ID = "G-PV60V5EQZJ";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  gtag("config", `${GA_TRACKING_ID}`, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type eventProps = {
  action: Gtag.EventNames | string;
  params: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams;
};

export const event = ({ action, params }: eventProps): void => {
  gtag("event", action, params);
};
