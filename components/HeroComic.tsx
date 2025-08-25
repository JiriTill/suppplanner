import Image from 'next/image';

export default function HeroComic() {
  return (
    <div className="card p-3">
      <Image
        src="/hero-comic.png"
        alt="Two fit people joking about SuppPlanner in a comic style"
        width={1200}
        height={800}
        className="rounded-xl w-full h-auto"
        priority
        sizes="(max-width: 768px) 100vw, 480px"
      />
    </div>
  );
}
