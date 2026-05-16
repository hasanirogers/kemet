import { css } from 'lit';

export default css`
  :host {
    font-size: 0.9rem;
    display: block;
    max-width: 1280px;
    margin: 4rem auto 0 auto;
    padding: 1rem 0;
    border-top: 1px solid rgb(var(--kemet-color-black) / 50%);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  nav {
    display: flex;
    gap: 1rem;
  }

  footer {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr auto;
    padding: 0 2rem;
  }
`;
