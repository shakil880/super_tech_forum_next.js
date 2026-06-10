type ForumMarkProps = {
  className?: string;
};

export function ForumMark({ className }: ForumMarkProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="forumMarkBg" x1="14" y1="10" x2="82" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id="forumMarkBubble" x1="26" y1="24" x2="68" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D1FAE5" />
        </linearGradient>
      </defs>

      <rect x="6" y="6" width="84" height="84" rx="24" fill="url(#forumMarkBg)" />
      <path
        d="M28 31C28 27.6863 30.6863 25 34 25H62C65.3137 25 68 27.6863 68 31V50C68 53.3137 65.3137 56 62 56H48.5L38 66.5V56H34C30.6863 56 28 53.3137 28 50V31Z"
        fill="url(#forumMarkBubble)"
      />
      <circle cx="40" cy="39" r="3.5" fill="#0F172A" />
      <circle cx="48" cy="39" r="3.5" fill="#0F172A" />
      <circle cx="56" cy="39" r="3.5" fill="#0F172A" />
      <path
        d="M20 67C20 63.6863 22.6863 61 26 61H40V70.5L48 61H70C73.3137 61 76 63.6863 76 67V79C76 82.3137 73.3137 85 70 85H26C22.6863 85 20 82.3137 20 79V67Z"
        fill="#ECFDF5"
      />
      <path d="M30 69H58" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 75H46" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}