/// <reference types="vite/client" />

// Linaria module declarations
declare module '@linaria/core' {
  export { css } from '@linaria/core';
  export { keyframes } from '@linaria/core';
  export type { LinariaConfig } from '@linaria/core';
}

declare module '@linaria/react' {
  export { styled } from '@linaria/react';
}
