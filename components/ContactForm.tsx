"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white border border-brand-green/20 rounded-lg px-4 py-3 text-brand-dark text-sm placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">
          Asunto
        </label>
        <input
          type="text"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          placeholder="¿De qué quieres hablar?"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark/70 mb-1.5">
          Mensaje
        </label>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Cuéntame más..."
          className={`${inputClass} resize-none`}
        />
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
