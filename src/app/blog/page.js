import Link from 'next/link';
import Hero from '@/components/page_components/home_page/Hero';
import { getAllPosts } from '@/lib/firestorePosts';
import { resolvePostCoverAlt, resolvePostCoverImage } from '@/lib/media';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Chronix Insights | Tech Blog',
  description:
    'Read the latest articles on IT infrastructure, cybersecurity, cloud solutions, and enterprise technology from the Chronix Technology team in Lagos, Nigeria.',
  openGraph: {
    title: 'Chronix Insights | Tech Blog',
    description:
      'IT infrastructure, cybersecurity, and enterprise tech articles from Chronix Technology Limited.',
    url: 'https://chronixtechnology.com/blog',
    siteName: 'Chronix Technology',
    images: [
      {
        url: '/images/home_page/chronix-logo.png',
        width: 1200,
        height: 630,
        alt: 'Chronix Insights Blog',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronix Insights | Tech Blog',
    description:
      'IT infrastructure, cybersecurity, and enterprise tech articles from Chronix Technology Limited.',
    images: ['/images/home_page/chronix-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Blog() {
  let posts = [];
  let hasLoadError = false;

  try {
    posts = await getAllPosts({ publishedOnly: true });
  } catch (error) {
    hasLoadError = true;
    console.error('Failed to load blog posts:', error);
  }

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#ff761b] font-orbitron">Chronix Insights</h1>
        </div>
        {hasLoadError ? (
          <div className="text-center text-red-700 bg-red-50 border border-red-200 rounded-lg p-6">
            We are unable to load blog posts right now. Please try again shortly.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const coverImage = resolvePostCoverImage(post, { useDefault: false });
              const coverAlt = resolvePostCoverAlt(post);

              return (
                <article key={post.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {coverImage && (
                    <img
                      src={coverImage}
                      alt={coverAlt}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <Link href={`/blog/${post.id}`} className="text-2xl font-semibold hover:underline block mb-2 text-[#003366]">
                      {post.title}
                    </Link>
                    <p className="text-gray-600 text-sm mb-3">{new Date(post.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}