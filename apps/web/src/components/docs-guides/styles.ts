
import { css } from 'lit';

export default css`
  :host {
    display: block;
    text-align: center;
    margin: 2rem 0;
    padding: 1rem 2rem 2rem;
    background-color: white;;
  }

  :host > div {
    max-width: 960px;
    margin: auto;
    align-items: center;
  }

  p {
    line-height: 1.75;
    font-size: 1.2rem;
    margin: 0 0 1.5rem;
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
`;
