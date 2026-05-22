import type { Book } from "@/lib/data";
import { bookCoverPath } from "@/lib/data";

interface BookCardProps {
  book: Book;
  featured?: boolean;
}

export default function BookCard({ book, featured }: BookCardProps) {
  return (
    <div
      className={`group flex flex-col rounded-2xl border border-[#C8B89A] bg-[#FDFAF3] overflow-hidden transition-shadow hover:shadow-lg ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div
        className={`relative bg-[#EDE5CE] flex items-center justify-center overflow-hidden ${
          featured ? "md:w-56 md:flex-shrink-0" : "aspect-[3/4]"
        }`}
        style={{ minHeight: featured ? 200 : undefined }}
      >
        <img
          src={bookCoverPath(book.coverFile)}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[#1A3D0E] text-xl mb-2" style={{ fontFamily: '"Cantora One", Georgia, serif' }}>
          {book.title}
        </h3>
        <p className="text-[#7A6652] text-sm leading-relaxed flex-1 mb-4">
          {book.description}
        </p>
        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#5DB84A] hover:bg-[#3D8C2A] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors text-center"
        >
          Get the Book
        </a>
      </div>
    </div>
  );
}
