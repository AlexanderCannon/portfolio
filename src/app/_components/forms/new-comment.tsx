"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { FaSpinner, FaPaperPlane } from "react-icons/fa";
import Button from "~/app/_components/ui/button";

interface NewCommentProps {
  postId: number;
  slug: string;
}

const fieldClass =
  "w-full border-0 border-b border-line bg-transparent px-0 py-2.5 font-mono text-sm text-ink outline-none focus:border-accent";

export function NewComment({ postId, slug }: NewCommentProps) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const utils = api.useUtils();

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      setName("");
      setBody("");
      setError("");
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
    createComment.mutate({
      postId,
      body: body.trim(),
      name: name.trim(),
    });
  };

  return (
    <div className="mt-10 border-t border-dashed border-line pt-8">
      <h3 className="font-display text-xl tracking-tight text-ink">
        Add a comment
      </h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`max-w-md ${fieldClass}`}
        />

        <textarea
          placeholder="Write your comment…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          required
          className={fieldClass}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          disabled={createComment.isPending || !body.trim()}
        >
          {createComment.isPending ? (
            <>
              <FaSpinner className="h-4 w-4 animate-spin" />
              Posting…
            </>
          ) : (
            <>
              <FaPaperPlane className="h-4 w-4" />
              Post comment
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
