import Image from 'next/image';

export default function HeroComic() {
  return (
    <div className="card p-3">
      <Image
        src="/hero-comic.png"
        alt="Fit man and woman joking about SuppPlanner"
        width={1200}
        height={800}
        className="rounded-xl w-full h-auto"
        priority
      />
    </div>
  );
}
