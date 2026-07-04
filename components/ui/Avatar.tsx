import Image from "next/image";

interface AvatarProps {
  readonly src?:       string;
  readonly name:       string;
  readonly size?:      number;
  readonly showOnline?: boolean;
  readonly className?:  string;
}

/** Returns initials from a full name (up to 2 chars). */
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
  showOnline = false,
  className  = "",
}: AvatarProps) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="rounded-full object-cover border-2 border-white shadow-sm"
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-full border-2 border-white shadow-sm bg-[#F0F9F8] text-[#00695C] font-bold select-none"
          style={{ width: size, height: size, fontSize: size * 0.35 }}
        >
          {getInitials(name)}
        </div>
      )}
      {showOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
}
