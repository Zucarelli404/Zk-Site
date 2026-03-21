import { generateBlogPost } from "@/lib/blog-generator";
import { upsertGeneratedPost } from "@/lib/blog-store";

type Payload = {
  topic?: string;
  primaryKeyword?: string;
  targetAudience?: string;
};

export async function POST(request: Request) {
  const adminToken = process.env.BLOG_AUTOMATION_TOKEN;
  const requestToken = request.headers.get("x-blog-automation-token");

  if (!adminToken || requestToken !== adminToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Payload;

  if (!body.topic || !body.primaryKeyword || !body.targetAudience) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const post = await generateBlogPost({
      topic: body.topic,
      primaryKeyword: body.primaryKeyword,
      targetAudience: body.targetAudience
    });

    await upsertGeneratedPost(post);

    return Response.json({
      ok: true,
      slug: post.slug,
      title: post.title
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to generate post" },
      { status: 500 }
    );
  }
}
