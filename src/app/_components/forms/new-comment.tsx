"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { FaSpinner, FaPaperPlane } from "react-icons/fa";
import Button from "~/app/_components/ui/button";

interface NewCommentProps {
  postId: number;
  slug: string;
}

export function NewComment({ postId, slug }: NewCommentProps) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const utils = api.useUtils();

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      // Reset form
      setName("");
      setBody("");
      setError("");
      // Invalidate queries to refresh the comments list
      void utils.post.getPostBySlug.invalidate({ slug });
      void utils.post.getPostsWithLimit.invalidate();
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!body.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    console.log({ name, body })
    createComment.mutate({
      postId,
      body: body.trim(),
      name: name.trim(),
    });
  };

  return (
    <div className="space-y-4 rounded-lg bg-gray-50 dark:bg-gray-800 p- mt-8 p-8">
      <h3 className="text-lg font-semibold">Add a Comment</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 bg:white dark:bg-gray-900"
          />
        </div>

        <div>
          <textarea
            placeholder="Write your comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 bg-white dark:bg-gray-900"
          />
        </div>

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={createComment.isPending || !body.trim()}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-50"
        >
          {createComment.isPending ? (
            <>
              <FaSpinner className="h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            <span className="flex items-center gap-4">
              <FaPaperPlane className="h-4 w-4" /> Post Comment
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}