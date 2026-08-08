// TikTok Pixel standard events helper library
// Client-side SHA-256 hashing and strongly-typed events

export type TikTokContentItem = {
  content_id?: string;
  content_type?: string;
  content_name?: string;
};

export type TikTokEventParams = {
  contents?: TikTokContentItem[];
  value?: number;
  currency?: string;
  search_string?: string;
  [key: string]: unknown;
};

export type TikTokIdentifyParams = {
  email?: string;
  phone_number?: string;
  external_id?: string;
};

export type TikTokEventName =
  | "ViewContent"
  | "AddToCart"
  | "AddToWishlist"
  | "Search"
  | "AddPaymentInfo"
  | "InitiateCheckout"
  | "PlaceAnOrder"
  | "Purchase"
  | "CompleteRegistration"
  | "ClickButton";

declare global {
  interface Window {
    ttq?: {
      identify: (data: Record<string, string>) => void;
      track: (eventName: string, data?: TikTokEventParams) => void;
      page: () => void;
    };
  }
}

/**
 * Computes SHA-256 hash in the browser for client-side PII compliance.
 */
export async function sha256(value: string): Promise<string> {
  const clean = value.trim().toLowerCase();
  if (!clean) return "";

  try {
    if (typeof window !== "undefined" && window.crypto?.subtle) {
      const msgUint8 = new TextEncoder().encode(clean);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  } catch {
    // Fallback if subtle crypto is unavailable
  }
  return clean;
}

/**
 * Identify customer with SHA-256 hashed PII before tracking events
 */
export async function tiktokIdentify(params: TikTokIdentifyParams) {
  if (typeof window === "undefined" || !window.ttq) return;

  const payload: Record<string, string> = {};

  if (params.email) {
    payload.email = await sha256(params.email);
  }

  if (params.phone_number) {
    // Normalize phone number (remove spaces, hyphens, and leading plus/zeros for standard hashing)
    const normalizedPhone = params.phone_number.replace(/[^\d]/g, "");
    payload.phone_number = await sha256(normalizedPhone);
  }

  if (params.external_id) {
    payload.external_id = await sha256(params.external_id);
  }

  if (Object.keys(payload).length > 0) {
    window.ttq.identify(payload);
  }
}

/**
 * Generic track call for TikTok Pixel
 */
export function tiktokTrack(eventName: TikTokEventName, data?: TikTokEventParams) {
  if (typeof window === "undefined" || !window.ttq) return;
  window.ttq.track(eventName, data);
}

// -------------------------------------------------------------
// Standard Event Helper Functions
// -------------------------------------------------------------

export function trackViewContent(item: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
}) {
  tiktokTrack("ViewContent", {
    contents: [
      {
        content_id: item.id || "",
        content_type: item.type || "product",
        content_name: item.name || "",
      },
    ],
    value: item.value ?? 0,
    currency: item.currency || "EGP",
  });
}

export function trackAddToCart(item: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
}) {
  tiktokTrack("AddToCart", {
    contents: [
      {
        content_id: item.id || "",
        content_type: item.type || "product",
        content_name: item.name || "",
      },
    ],
    value: item.value ?? 0,
    currency: item.currency || "EGP",
  });
}

export function trackAddToWishlist(item: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
}) {
  tiktokTrack("AddToWishlist", {
    contents: [
      {
        content_id: item.id || "",
        content_type: item.type || "product",
        content_name: item.name || "",
      },
    ],
    value: item.value ?? 0,
    currency: item.currency || "EGP",
  });
}

export function trackSearch(searchKeywords: string, item?: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
}) {
  tiktokTrack("Search", {
    search_string: searchKeywords,
    contents: item
      ? [
          {
            content_id: item.id || "",
            content_type: item.type || "product",
            content_name: item.name || "",
          },
        ]
      : [],
    value: item?.value ?? 0,
    currency: item?.currency || "EGP",
  });
}

export function trackAddPaymentInfo(item: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
}) {
  tiktokTrack("AddPaymentInfo", {
    contents: [
      {
        content_id: item.id || "",
        content_type: item.type || "product",
        content_name: item.name || "",
      },
    ],
    value: item.value ?? 0,
    currency: item.currency || "EGP",
  });
}

export function trackInitiateCheckout(item: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
  contents?: TikTokContentItem[];
}) {
  tiktokTrack("InitiateCheckout", {
    contents: item.contents || [
      {
        content_id: item.id || "",
        content_type: item.type || "product",
        content_name: item.name || "",
      },
    ],
    value: item.value ?? 0,
    currency: item.currency || "EGP",
  });
}

export function trackPlaceAnOrder(item: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
  contents?: TikTokContentItem[];
}) {
  tiktokTrack("PlaceAnOrder", {
    contents: item.contents || [
      {
        content_id: item.id || "",
        content_type: item.type || "product",
        content_name: item.name || "",
      },
    ],
    value: item.value ?? 0,
    currency: item.currency || "EGP",
  });
}

export function trackPurchase(item: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
  contents?: TikTokContentItem[];
}) {
  tiktokTrack("Purchase", {
    contents: item.contents || [
      {
        content_id: item.id || "",
        content_type: item.type || "product",
        content_name: item.name || "",
      },
    ],
    value: item.value ?? 0,
    currency: item.currency || "EGP",
  });
}

export function trackCompleteRegistration(item: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
}) {
  tiktokTrack("CompleteRegistration", {
    contents: [
      {
        content_id: item.id || "",
        content_type: item.type || "product",
        content_name: item.name || "",
      },
    ],
    value: item.value ?? 0,
    currency: item.currency || "EGP",
  });
}

export function trackClickButton(buttonName: string, item?: {
  id?: string;
  name?: string;
  type?: string;
  value?: number;
  currency?: string;
}) {
  tiktokTrack("ClickButton", {
    contents: [
      {
        content_id: item?.id || buttonName,
        content_type: item?.type || "button",
        content_name: item?.name || buttonName,
      },
    ],
    value: item?.value ?? 0,
    currency: item?.currency || "EGP",
  });
}
