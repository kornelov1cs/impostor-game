/// <reference types="vite/client" />

// Linaria module declarations
declare module '@linaria/core' {
  export { css } from '@emotion/react';
  export { keyframes } from '@emotion/react';
  export type { LinariaConfig } from '@emotion/react';
}

declare module '@linaria/react' {
  export { styled } from '@emotion/styled';
}
