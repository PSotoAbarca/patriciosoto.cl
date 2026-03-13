"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot — hidden from real users
}

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 2000;

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot stays empty for humans
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = "Nombre requerido";
    if (!EMAIL_REGEX.test(form.email.trim())) newErrors.email = "Email inválido";
    if (!form.subject.trim()) newErrors.subject = "Asunto requerido";
    if (!form.message.trim()) newErrors.message = "Mensaje requerido";
    if (form.message.length > MAX_MESSAGE)
      newErrors.message = `Máximo ${MAX_MESSAGE} caracteres`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          website: form.website, // honeypot
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-white border rounded-lg px-4 py-3 text-brand-dark text-sm placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-400 focus:ring-red-200"
        : "border-brand-green/20 focus:ring-brand-green/30 focus:border-brand-green"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

      {/* Honeypot — visually hidden, aria-hidden, not focusable */}
      <div aria-hidden="true" className="hidden" style={{ display: "none" }}>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            maxLength={100}
            className={inputClass("name")}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            maxLength={254}
            className={inputClass("email")}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">
          Asunto
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="¿De qué quieres hablar?"
          maxLength={200}
          className={inputClass("subject")}
        />
        {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
      </div>

      <div>
        <div className="flex justify-between mb-1.5">
          <label className="block text-sm font-medium text-brand-dark/70">
            Mensaje
          </label>
          <span className={`text-xs ${form.message.length > MAX_MESSAGE * 0.9 ? "text-red-400" : "text-brand-dark/30"}`}>
            {form.message.length}/{MAX_MESSAGE}
          </span>
        </div>
        <textarea
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Cuéntame más..."
          maxLength={MAX_MESSAGE}
          className={`${inputClass("message")} resize-none`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-green text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
      >
        {status === "loading" ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Enviando...
          </>
        ) : (
          "Enviar mensaje →"
        )}
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-lg text-brand-green text-sm font-medium"
          >
            ¡Mensaje enviado! Te respondo pronto.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
          >
            Algo salió mal. Intenta de nuevo o escríbeme directamente.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
