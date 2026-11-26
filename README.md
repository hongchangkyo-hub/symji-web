# Symji 심지 — symji.kr

마음의 땅, 심지(心地). 셀프 마인드케어 키트를 파는 자체 쇼핑몰입니다.

## 정해진 것

| 항목 | 결정 |
| --- | --- |
| 화면 | Next.js (App Router, TypeScript, Tailwind CSS) |
| 데이터 | Firebase (Firestore, Authentication, Storage) — 종량제 |
| 결제 | 토스페이먼츠 (자체 결제) |
| 배포 | Vercel + symji.kr |
| 구매 | **회원만** 구매 가능, 장바구니는 회원별로 서버(Firestore)에 저장 |
| 로그인 | 구글 · 카카오 · 네이버 (애플은 제외) |
| 페이지 | 브랜드 스토리, 상품 목록·상세, 장바구니·결제 + 약관·개인정보·환불 정책 |

### Firestore 컬렉션
`products`(상품) · `orders`(주문) · `users`(회원) · `carts`(장바구니) — 필드는 `src/lib/types.ts`, 보안 규칙은 `firestore.rules`.

### 디자인
- 컬러: 심지 핑크 `#E7DADD`, 심지 브라운 `#994429`, 차콜 블랙 `#231F20` (`src/app/globals.css`)
- 폰트: 민산스(Min Sans, SIL OFL)를 직접 포함. 영문 Mint Grotesk는 웹폰트 라이선스 확인 전까지 민산스로 대체
- 로고: 2024-09-12 최종 로고 시안(B)에서 벡터 추출 → `public/brand/*.svg`, `src/components/brand/`

## 진행 상황

- [x] 1. 환경 세팅 — Next.js 프로젝트, Firebase SDK, GitHub
- [x] 1-1. Firebase 프로젝트(`symji-e378e`) 연결 — 공개 설정값은 `src/lib/firebase/client.ts`에 포함
- [ ] 1-2. Firestore 데이터베이스 생성 + 보안 규칙 게시, Vercel 연결
- [x] 2. 디자인 기반 — 컬러, 폰트, 로고, 헤더·푸터
- [x] 3. 화면 — 홈, 브랜드 스토리, 상품 목록, 상품 상세 (Firebase 연결 전에는 임시 상품 표시)
- [ ] 4. 로그인 — 구글 → 카카오 · 네이버 (서버에서 Firebase 커스텀 토큰 발급)
- [ ] 5. 장바구니와 결제 — 토스페이먼츠 테스트 키
- [ ] 6. 오픈 준비 — 약관·정책 페이지 내용, 푸터 사업자 정보, PG 심사, symji.kr 연결

## 실행

```bash
npm install
# Firebase 설정은 코드에 포함되어 있어 별도 입력 없이 실행됩니다
npm run dev                  # http://localhost:3000
```
