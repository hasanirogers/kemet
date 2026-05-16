import { css } from 'lit';

export default css`
  :host {
    position: relative;
    display: block;
    padding: 4rem 2rem;
    background-position: center;
    background-image: url('pyramid.webp');
  }

  :host > div {
    position: relative;
    z-index: 99;
  }

  :host > span {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.80);
  }

  section {
    display: grid;
    gap: 3rem;
  }

  h2 {
    color: rgb(var(--kemet-color-black));
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 1.2;
    text-align: center;
    margin: 2rem 0 4rem 0;
    font-weight: 400;
  }

  @media only screen and (min-width: 768px) {
    section {
      max-width: 1280px;
      margin: auto;
      grid-template-columns: repeat(2,1fr);
    }
  }

  @media only screen and (min-width: 1280px) {
    section {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  figure {
    margin: 0;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: var(--kemet-elevation-layer-3);
    background: rgb(var(--kemet-color-white));
  }

  figure img {
    width: 48px;
    position: relative;
    top: 0.25rem;
  }

  figure > span {
    display: inline-block;
    width: 4rem;
    text-align: center;
    padding: 1rem;
    border-radius: 50%;
    background-color: rgb(var(--kemet-color-primary));
  }
`;
