import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import Hero from '@/components/page_components/home_page/Hero';

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#ff761b] font-orbitron">Chronix Insights</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPostsData.map(({ id, date, title, excerpt, coverImage }) => (
            <article key={id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              {coverImage && (
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <Link href={`/blog/${id}`} className="text-2xl font-semibold hover:underline block mb-2 text-[#003366]">
                  {title}
                </Link>
                <p className="text-gray-600 text-sm mb-3">{date}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>
                <Link
                  href={`/blog/${id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </div>
          </article>
        ))}
        </div>
      </div>
    </>
  );
}