"use client";

import { useState } from "react";
import Button from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

const fieldClass =
  "w-full border-0 border-b border-line bg-transparent px-0 py-2.5 font-mono text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-accent";

const LeadCaptureFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const contactMutation = api.contact.create.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="paper-card px-6 py-10">
        <span className="stamp">Received</span>
        <h2 className="mt-5 font-display text-2xl tracking-tight text-ink">
          Thank you
        </h2>
        <p className="mt-2 text-ink-muted">
          I personally read every message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1.5 block font-label text-ink-muted">Name</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-label text-ink-muted">Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-label text-ink-muted">
          Company <span className="normal-case tracking-normal">(optional)</span>
        </span>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-label text-ink-muted">
          Job title{" "}
          <span className="normal-case tracking-normal">(optional)</span>
        </span>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-label text-ink-muted">Message</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={fieldClass}
        />
      </label>

      <Button type="submit" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
};

export default LeadCaptureFormSection;
