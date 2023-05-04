const contentSecurityPolicies = [
  { 'default-src': ["'self'"] },
  { 'connect-src': ["'self'"] },
  { 'img-src': ["'self'", 'data:', 'tiles.stadiamaps.com'] },
  { 'font-src': ["'self'", 'fonts.gstatic.com'] },
  { 'script-src': ["'self'", 'va.vercel-scripts.com', "'unsafe-eval'", "'unsafe-inline'"] },
  { 'style-src': ["'self'", 'fonts.googleapis.com', "'unsafe-inline'"] },
];

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfiguration = {
  experimental: { appDir: true },
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    formats: ['image/avif', 'image/webp'],
    domains: [
      'i.scdn.co', // Spotify images.
      'lastfm.freetls.fastly.net', // LastFM images.
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicies
              .map((policy) => {
                const [[policyName, policyRules]] = Object.entries(policy);

                return `${policyName} ${policyRules.join(' ')}`;
              })
              .join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfiguration);
