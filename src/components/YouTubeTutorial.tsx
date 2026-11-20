import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeTutorialProps {
  videoId: string;
  title: string;
  className?: string;
}

// Lightweight facade: shows only YouTube's thumbnail (~20 KB) until the visitor clicks.
// The YouTube player (~1 MB of scripts) loads on demand, from the privacy-enhanced domain.
export function YouTubeTutorial({ videoId, title, className = '' }: YouTubeTutorialProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => setPlaying(false), [videoId]);

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-xl bg-slate-900 ${className}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Assistir: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-slate-950/20 transition-colors group-hover:bg-slate-950/10" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-20 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            <Play className="h-7 w-7 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
