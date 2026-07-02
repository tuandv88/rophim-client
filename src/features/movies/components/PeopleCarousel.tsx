import type { MoviePeople } from "../../../types/movie";
import { getTmdbImageUrl } from "../../../utils/image";

interface PeopleCarouselProps {
  peoples: MoviePeople[];
}

export function PeopleCarousel({ peoples }: PeopleCarouselProps) {
  const cast = peoples.filter((person) => person.known_for_department === "Acting").slice(0, 18);

  if (cast.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white md:text-2xl">Diễn viên</h2>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:px-0">
        {cast.map((person) => (
          <article key={person.tmdb_people_id} className="w-36 shrink-0">
            <img
              src={getTmdbImageUrl(person.profile_path, "w185")}
              alt={person.name}
              className="aspect-[2/3] w-full rounded-lg bg-white/10 object-cover"
              loading="lazy"
            />
            <h3 className="mt-3 truncate text-sm font-semibold text-white">{person.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/55">{person.character}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
