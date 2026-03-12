import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function ArticleImage({ src, alt }: Props) {
  return (
    <figure className="my-10 not-prose">
      <div className="rounded-xl overflow-hidden border border-brand-green/10 shadow-md">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-brand-dark/40 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
