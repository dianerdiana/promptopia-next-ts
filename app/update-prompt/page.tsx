"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PostForm } from "@data/types/post";

import Form from "@components/Form";

const EditPrompt = () => {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  // State
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PostForm>({
    prompt: "",
    tag: "",
  });

  const updatePrompt = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPrompDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    getPrompDetails();
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
