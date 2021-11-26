const contentSecurityPolicies = [
  { 'default-src': ["'self'"] },
  { 'img-src': ["'self'", 'data:'] },
  { 'font-src': ['fonts.gstatic.com'] },
  { 'script-src': ["'self'", "'unsafe-eval'"] },
  { 'style-src': ['fonts.googleapis.com', "'unsafe-inline'"] },
];

module.exports = {
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    formats: ['image/avif', 'image/webp'],
    domains: ['tokyo.ibthemespro.com', 'via.placeholder.com', 'lastfm.freetls.fastly.net'],
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
