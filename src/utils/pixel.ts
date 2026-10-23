declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const FB_PIXEL_ID = '2173184286781548';

export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const trackEvent = (
  eventName: string,
  data?: Record<string, any>,
  eventId?: string
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (eventId) {
      window.fbq('track', eventName, data || {}, { eventID: eventId });
    } else {
      window.fbq('track', eventName, data || {});
    }
  }
};
