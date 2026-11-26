import { LOGO_PATHS } from "./logo-paths";

type LogoProps = {
  className?: string;
  title?: string;
};

function Mark({
  name,
  className,
  title,
}: LogoProps & { name: keyof typeof LOGO_PATHS }) {
  const { viewBox, d } = LOGO_PATHS[name];
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="currentColor"
      role="img"
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={d} />
    </svg>
  );
}

/** 'Symji' 로고타입 */
export function Wordmark(props: LogoProps) {
  return <Mark name="wordmark" title="Symji" {...props} />;
}

/** 톱니 꽃 캐릭터 심볼 */
export function Flower(props: LogoProps) {
  return <Mark name="flower" {...props} />;
}

/** '심지' 한글 로고 */
export function HangulMark(props: LogoProps) {
  return <Mark name="hangul" title="심지" {...props} />;
}
