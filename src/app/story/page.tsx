import type { Metadata } from "next";
import Link from "next/link";
import { Flower, HangulMark, Wordmark } from "@/components/brand/logo";
import { BRAND_STORY } from "@/lib/brand-story";

export const metadata: Metadata = {
  title: "브랜드 스토리",
  description: "마음의 땅, 심지(心地, SYMJI) 브랜드 스토리",
};

export default function StoryPage() {
  return (
    <>
      <section className="bg-charcoal text-pink">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-6 text-3xl font-black leading-snug sm:text-4xl">
            마음의 땅,
            <br />
            심지(心地, SYMJI)
          </h1>
          <div className="mt-10 flex items-center justify-center gap-6 text-pink">
            <Wordmark className="h-8 w-auto" />
            <Flower className="h-10 w-10" />
            <HangulMark className="h-8 w-auto" />
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <div className="space-y-6 text-[17px] leading-[1.7]">
          {BRAND_STORY.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <figure className="mt-16 border-l-4 border-brown pl-6">
          <blockquote className="text-xl font-black leading-snug">
            We plant, you bloom.
          </blockquote>
          <figcaption className="mt-2 text-sm text-muted">
            우리가 씨앗을 심으면, 당신의 마음이 피어납니다.
          </figcaption>
        </figure>

        <Link
          href="/shop"
          className="mt-16 inline-block rounded-full bg-brown px-7 py-3 text-sm font-bold text-pink transition-colors hover:bg-brown-deep"
        >
          심지의 키트 둘러보기
        </Link>
      </article>
    </>
  );
}
