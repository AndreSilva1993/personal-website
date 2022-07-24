const contentSecurityPolicies = [
  { 'default-src': ["'self'"] },
  { 'img-src': ["'self'", 'data:', 'tiles.stadiamaps.com'] },
  { 'font-src': ["'self'", 'fonts.gstatic.com'] },
  { 'script-src': ["'self'", "'unsafe-eval'"] },
  { 'connect-src': ["'self'", 'vitals.vercel-insights.com'] },
  { 'style-src': ["'self'", 'fonts.googleapis.com', "'unsafe-inline'"] },
];

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfiguration = {
  swcMinify: true,
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
