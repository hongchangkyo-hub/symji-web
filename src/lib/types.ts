/**
 * Firestore 데이터 구조 (합의된 4개 컬렉션)
 *
 *  products/{productId}   상품
 *  orders/{orderId}       주문
 *  users/{uid}            회원
 *  carts/{uid}            회원별 장바구니 (회원 구매만 허용 → 서버 저장)
 */

export type Product = {
  id: string;
  name: string;
  /** 판매가 (원) */
  price: number;
  /** 목록에 보이는 한 줄 소개 */
  summary: string;
  /** 상세 설명 (줄바꿈 포함 텍스트) */
  description: string;
  /** Firebase Storage 등 이미지 주소. 비어 있으면 브랜드 플레이스홀더 표시 */
  imageUrls: string[];
  /** 재고 수량 */
  stock: number;
  /** 판매 여부 (false면 목록에서 숨김) */
  isActive: boolean;
  /** 정렬 순서 (작을수록 앞) */
  sortOrder: number;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  updatedAt: Date;
};

export type ShippingAddress = {
  recipient: string;
  phone: string;
  zipCode: string;
  address1: string;
  address2: string;
  memo?: string;
};

export type UserProfile = {
  uid: string;
  email: string | null;
  name: string;
  phone: string | null;
  provider: "google" | "kakao" | "naver";
  defaultAddress: ShippingAddress | null;
  createdAt: Date;
};

export type OrderStatus =
  | "pending" // 결제 대기
  | "paid" // 결제 완료
  | "preparing" // 배송 준비
  | "shipped" // 배송 중
  | "delivered" // 배송 완료
  | "cancelled" // 취소
  | "refunded"; // 환불

export type OrderLine = {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  /** 토스페이먼츠 orderId로도 사용 */
  id: string;
  uid: string;
  buyer: { name: string; email: string | null; phone: string | null };
  items: OrderLine[];
  itemsTotal: number;
  shippingFee: number;
  totalAmount: number;
  shipping: ShippingAddress;
  status: OrderStatus;
  /** 토스페이먼츠 결제 키 (결제 승인 후 저장) */
  paymentKey: string | null;
  createdAt: Date;
  paidAt: Date | null;
};
