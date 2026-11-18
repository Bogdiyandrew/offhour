// Date de contact folosite in tot site-ul. Le schimbi doar aici.
export const WHATSAPP = "407XXXX2XXX"; // TODO: format international, fara + si spatii
export const INSTAGRAM = ""; // TODO: dupa ce faci contul, ex. "https://instagram.com/offhour"

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
