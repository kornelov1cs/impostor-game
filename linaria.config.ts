import type { LinariaConfig } from '@linaria/core';

const config: LinariaConfig = {
  evaluate: true,
  displayName: process.env.NODE_ENV !== 'production',
  classNameSlug: (hash, title) => {
    return process.env.NODE_ENV === 'production'
      ? `${hash}`
      : `${title}_${hash}`;
  },
};

export default config;
