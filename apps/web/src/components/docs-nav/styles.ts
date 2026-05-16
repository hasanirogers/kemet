import { css } from 'lit';

export default css`
  :host {
    width: var(--app-nav-width);
    min-height: 100vh;
    color: rgb(var(--kemet-color-white));
    background-color: rgb(var(--kemet-color-primary));
  }

  :host([location='content']) {
    display: none;
  }

  @media only screen and (min-width: 960px) {
    :host([location='content']) {
      display: block;
    }
  }

  section {
    width: var(--app-nav-width);
    position: fixed;
    z-index: 1;
  }

  header {
    text-align: center;
    padding-bottom: 2rem;
    border-bottom: 2px dashed rgb(var(--kemet-color-white));
  }

  header a {
    display: block;
  }

  h2 {
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }

  h3 {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  nav {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.5rem;
    border: 1px dashed rgb(var(--kemet-color-white) / 50%);
  }

  svg {
    width: 66%;
    height: auto;
  }

  .logo {
    padding: 1rem;
  }

  .background {
    content: "";
    width: var(--app-nav-width);
    height: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    inset: 0;
    background-color: rgb(var(--kemet-color-primary));
    background-image: url('/drawing.jpg');
    background-blend-mode: multiply;
    background-repeat: repeat;
    opacity: 0.25;
  }
`;
