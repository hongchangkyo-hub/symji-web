const krw = new Intl.NumberFormat("ko-KR");

/** 29000 → "29,000원" */
export function formatPrice(amount: number): string {
  return `${krw.format(amount)}원`;
}
