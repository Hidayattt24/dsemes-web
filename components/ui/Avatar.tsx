import Image from "next/image";

interface AvatarProps {
  readonly src?:       string;
  readonly name:       string;
  readonly size?:      number;
  readonly showOnline?: boolean;
  readonly className?:  string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({
  src,
  name,
  size      = 40,
  className  = "",
}: AvatarProps) {

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <div
          className="flex items-center justify-center w-full h-full bg-[#F0F9F8] text-[#00695C] font-bold select-none"
          style={{ fontSize: size * 0.38 }}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}
