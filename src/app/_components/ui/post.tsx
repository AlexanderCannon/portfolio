"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import Button from "~/app/_components/ui/button";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [comment, setComment] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setComment("");
    },
  });

  const createComment = api.comment.create.useMutation(
    {
      onSuccess: async () => {
        await utils.post.invalidate();
      },
    }
  );

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <>
          <p className="truncate">Your most recent post: {latestPost.name}</p>
          <p className="truncate">Created at: {latestPost.createdAt.toDateString()}</p>
          <p>{latestPost.body}</p>
          <p className="truncate">Comments:</p>
          <p>{latestPost.comments.map(c => <div key={c.id} className="flex flex-col gap-2">
            <p>{c.body}</p>
            <p>Posted at: {c.createdAt.toDateString()}</p>
          </div>
          )}</p>
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!latestPost) return;
          createComment.mutate({ body: comment, postId: latestPost?.id });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <Button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
