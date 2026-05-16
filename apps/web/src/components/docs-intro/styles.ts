import { css } from 'lit';

export default css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    min-height: 100vh;
    position: relative;
    background-size: 200%;
    background-position: center;
    background-image: url('/background.webp');
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  section {
    position: relative;
    z-index: 2;
    max-width: 90vw;
  }

  h1 {
    font-size: 4rem;
    line-height: 1.2;
    margin: 0;
  }

  h2 {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 1.2;
    margin: 0;
    font-weight: 400;
  }

  h2 span {
    color: rgb(var(--kemet-color-neutral-400));
  }

  pre {
    display: inline-block;
    padding: 1rem;
    font-size: 1rem;
    color: rgb(var(--kemet-color-primary));
    background-color: rgb(var(--kemet-color-white));
    outline-offset: 6px;
    outline: 2px dashed rgb(var(--kemet-color-white));
  }

  ul {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    list-style: none;
    padding: 0;
    margin: 2rem 0 0 0;
  }

  svg {
    width: 100%;
    height: auto;
  }

  kemet-button {
    min-width: 250px;
  }

  .logo {
    display: block;
    width: 80vw;
    max-width: 512px;
    margin: auto;
    color: rgb(var(--kemet-color-primary));
  }

  .overlay {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.85;
    z-index: 1;
    background: rgb(243 244 246);
  }
`;
