/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Block clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Legacy XSS filter (browsers that support it)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Control referrer information sent to external sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser feature access
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Force HTTPS for 2 years (only active in production with valid cert)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Content Security Policy
          // - 'unsafe-inline' and 'unsafe-eval' required by Next.js/Framer Motion
          // - Tighten progressively as the site matures
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self' https://api.resend.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
