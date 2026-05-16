import { css } from 'lit';

export default css`
  :host {
    color: rgb(var(--kemet-color-white));
    display: block;
    text-align: center;
    padding: 3rem 2rem 4rem 2rem;
    background-color: rgb(var(--kemet-color-primary));
  }

  :host > div {
    max-width: 960px;
    margin: auto;
    align-items: center;
  }

  a {
    color: rgb(var(--kemet-color-white));
  }

  p {
    line-height: 1.75;
    font-size: 1.2rem;
    margin: 1.5rem 0;
  }

  h2 {
    font-size: 3rem;
    margin: 0;
    text-align: center;
  }

  ul {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  pre {
    display: inline-block;
    font-size: 1rem;
    color: rgb(var(--kemet-color-primary));
    background-color: rgb(var(--kemet-color-white));
    outline-offset: 6px;
    outline: 2px dashed rgb(var(--kemet-color-white));
  }

  pre,
  pre code {
    width: 90%;
  }

  @media only screen and (min-width: 768px) {
    pre,
    pre code {
      width: auto;
    }
  }

  kemet-button {
    --kemet-button-border-width: 2px;
    --kemet-button-color: rgb(var(--kemet-color-white));
    --kemet-button-border-color: rgb(var(--kemet-color-white));
  }




`;
