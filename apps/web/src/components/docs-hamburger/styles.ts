import { css } from 'lit';

export default css`
  :host {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 999;
  }

  @media only screen and (min-width: 960px) {
    :host {
      display: none;
    }
  }
`;
