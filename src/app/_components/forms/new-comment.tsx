"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { FaSpinner, FaPaperPlane } from "react-icons/fa";

interface NewCommentProps {
  postId: number;
}

export function NewComment({ postId }: NewCommentProps) {
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
      void utils.post.getPostBySlug.invalidate();
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
    <div className="space-y-4 rounded-lg bg-gray-50 p-4">
      <h3 className="text-lg font-semibold">Add a Comment</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <textarea
            placeholder="Write your comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={createComment.isPending || !body.trim()}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {createComment.isPending ? (
            <>
              <FaSpinner className="h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <FaPaperPlane className="h-4 w-4" />
              Post Comment
            </>
          )}
        </button>
      </form>
    </div>
  );
}