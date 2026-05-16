import { css } from 'lit';

export default css`
  :host {
    text-align: center;
    display: block;
    padding: 0 2rem;
    margin-top: 6rem;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.5;
    margin: 4rem auto;
    max-width: 640px;
    opacity: 0.5;
  }

  h2 {
    font-size: 3rem;
    color: var(--docs-intro-subtitle-color);
  }

  svg {
    width: 80px;
    height: 80px;
  }

  ul {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }

  figure {
    margin: 0;
    padding: 0;
    transition: transform 0.3s ease;
  }

  figure:hover {
    transform: scale(1.2);
  }

  a {
    color: rgb(var(--kemet-color-primary));
    text-decoration: none;
  }
`
