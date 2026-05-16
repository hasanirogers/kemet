import { css } from 'lit';

export default css`
  :host {
    color: rgb(var(--kemet-color-white));
    display: block;
  }

  p {
    line-height: 1.75;
    font-size: 1.2rem;
  }

  h2 {
    margin-bottom: 4rem;
    font-size: 3rem;
    text-align: center;
  }

  section {
    position: relative;
    overflow: hidden;
    text-align: center;
    margin: 8rem 0;
    padding: 4rem 2rem 8rem 2rem;
    background-color: rgb(var(--kemet-color-primary));
  }

  section::before {
    content: "";
    width: 100%;
    height: 100vh;
    position: absolute;
    inset: 0;
    background-color: rgb(var(--kemet-color-primary));
    background-image: url('drawing.jpg');
    background-blend-mode: multiply;
    opacity: 0.33; /* Adjust image opacity */
  }

  section > div {
    position: relative;
    z-index: 2;
  }

  @media only screen and (min-width: 768px) {
    section {
      text-align: left;
    }
  }

  section .grid {
    max-width: 960px;
    margin: auto;
    align-items: center;
  }

  @media only screen and (min-width: 768px) {
    section .grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: auto 1fr;
    }
  }

  section .grid > :first-child {
    display: inline-block;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 3px solid var(--kemet-color-white);
  }

  svg {
    width: 196px;
    height: 196px;
  }

  .designless1 {
    fill: rgb(var(--kemet-color-white));
  }
`;
