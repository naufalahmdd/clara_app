import Image from "next/image";
import Link from "next/link";

export default function ClaraWordmark({
  href = "/",
  width = 50,
  height = 50,
  fontSize = "text-2xl",
}: {
  href?: string;
  width?: number;
  height?: number;
  fontSize?: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <Image
        src="/clara-logo.png"
        alt="Clara application logo"
        width={width}
        height={height}
      />
      <span className={`font-semibold ${fontSize}`}>Clara</span>
    </Link>
  );
}
