import type { Product } from "./types";

/**
 * Firebase 연결 전까지 화면 확인용으로 쓰는 임시 상품입니다.
 * 실제 상품명·가격·설명이 정해지면 Firestore products 컬렉션에 넣어주세요.
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "starter-kit",
    name: "마음의 땅 스타터 키트",
    price: 29000,
    summary: "처음 마음을 돌보는 분을 위한 기본 셀프 마인드케어 키트",
    description:
      "하루 10분, 내 마음의 땅을 고르는 시간.\n가이드북과 기록 카드로 오늘의 감정을 살피고 작은 습관을 심어보세요.\n\n※ 임시 상품 정보입니다.",
    imageUrls: [],
    stock: 50,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "journal-cards",
    name: "Plant Positivity 기록 카드",
    price: 15000,
    summary: "하루 한 장, 긍정의 씨앗을 심는 기록 카드 30매",
    description:
      "\"I am precious just as I am.\"\n질문에 답하며 나를 다정하게 바라보는 연습을 합니다.\n\n※ 임시 상품 정보입니다.",
    imageUrls: [],
    stock: 80,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "garden-gift-set",
    name: "Garden of Your Mind 선물 세트",
    price: 45000,
    summary: "소중한 사람의 마음에 건네는 심지 선물 세트",
    description:
      "스타터 키트와 기록 카드, 메시지 카드를 함께 담았습니다.\n크래프트 패키지로 포장해 보내드려요.\n\n※ 임시 상품 정보입니다.",
    imageUrls: [],
    stock: 20,
    isActive: true,
    sortOrder: 3,
  },
];
