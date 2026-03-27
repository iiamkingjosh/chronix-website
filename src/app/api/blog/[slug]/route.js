import { getPostBySlug, updatePost, deletePost } from '@/lib/firestorePosts';
import { verifyAdminRequest } from '@/lib/serverAuth';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const adminCheck = await verifyAdminRequest(request, { optional: true });
    if (!adminCheck.ok && adminCheck.status !== 200) {
      return new Response(JSON.stringify({ error: adminCheck.error }), {
        status: adminCheck.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const post = await getPostBySlug(slug);
    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!adminCheck.ok && post.published === false) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  try {
    const adminCheck = await verifyAdminRequest(request);
    if (!adminCheck.ok) {
      return new Response(JSON.stringify({ error: adminCheck.error }), {
        status: adminCheck.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const result = await updatePost(slug, body);
    return new Response(JSON.stringify({ message: 'Post updated successfully', slug: result.slug }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating post:', error);
    const status = error.message?.includes('not found')
      ? 404
      : error.message?.includes('already exists')
      ? 409
      : 500;
    return new Response(JSON.stringify({ error: error.message || 'Failed to update post' }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  try {
    const adminCheck = await verifyAdminRequest(request);
    if (!adminCheck.ok) {
      return new Response(JSON.stringify({ error: adminCheck.error }), {
        status: adminCheck.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await deletePost(slug);
    return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    const status = error.message?.includes('not found') ? 404 : 500;
    return new Response(JSON.stringify({ error: error.message || 'Failed to delete post' }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}