import type { MovieImage } from "../../../types/movie";
import { getTmdbImageUrl } from "../../../utils/image";

interface ImageGalleryProps {
  images: MovieImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const backdrops = images.filter((image) => image.type === "backdrop").slice(0, 8);

  if (backdrops.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white md:text-2xl">Hình ảnh</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {backdrops.map((image) => (
          <img
            key={image.file_path}
            src={getTmdbImageUrl(image.file_path, "w780")}
            alt="Ảnh phim"
            className="aspect-video w-full rounded-lg object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
