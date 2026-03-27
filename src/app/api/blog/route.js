import { getAllPosts, createPost } from '@/lib/firestorePosts';
import { verifyAdminRequest } from '@/lib/serverAuth';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const adminCheck = await verifyAdminRequest(request, { optional: true });
    if (!adminCheck.ok && adminCheck.status !== 200) {
      return new Response(JSON.stringify({ error: adminCheck.error }), {
        status: adminCheck.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const posts = await getAllPosts({ publishedOnly: !adminCheck.ok });
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const adminCheck = await verifyAdminRequest(request);
    if (!adminCheck.ok) {
      return new Response(JSON.stringify({ error: adminCheck.error }), {
        status: adminCheck.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { title, excerpt, content, coverImageUrl, coverImageAlt, author, published, slug } =
      await request.json();

    if (!title || !title.trim()) {
      return new Response(JSON.stringify({ error: 'Title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await createPost({
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      coverImageAlt,
      author,
      published,
    });

    return new Response(JSON.stringify({ message: 'Post created', slug: result.slug }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating post:', error);
    const status = error.message?.includes('already exists') ? 409 : 500;
    return new Response(JSON.stringify({ error: error.message || 'Failed to create post' }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}