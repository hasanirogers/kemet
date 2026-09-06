import { css, unsafeCSS } from 'lit';

const documentHeight = `${document.documentElement.scrollHeight}px`;

export default css`
  /* slide */
  :host([effect='slide']) [part=drawer] {
    visibility: visible;
    transform: translate3d(-100%, 0, 0);
  }

  :host([effect='slide'][opened]) [part=drawer] {
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }

  :host([effect='slide']) [part=drawer]:after {
    display: none;
  }

  :host([effect='slide'][side='right']) [part=drawer] {
    transform: translate3d(100vw, 0, 0);
  }

  :host([effect='slide'][side='right'][opened]) [part=drawer] {
    transform: translate3d(calc(100vw - var(--kemet-drawer-width)), 0, 0);
  }

  :host([effect='slide'][side='top']) [part=drawer] {
    width: 100vw;
    height: var(--kemet-drawer-height, 100vh);
    transform: translate3d(0, calc(var(--kemet-drawer-height) * -1), 0);
  }

  :host([effect='slide'][side='top'][opened]) [part=drawer] {
    transform: translate3d(0, 0, 0);
  }

  :host([effect='slide'][side='bottom']) [part=drawer] {
    width: 100vw;
    height: var(--kemet-drawer-height, 100vh);
    transform: translate3d(0, ${unsafeCSS(documentHeight)}, 0);
  }

  :host([effect='slide'][side='bottom'][opened]) [part=drawer] {
    transform: translate3d(0, calc(100vh - var(--kemet-drawer-height)), 0);
  }

  /* reveal */
  :host([effect='reveal'][opened]) [part=pusher] {
    transform: translate3d(var(--kemet-drawer-width), 0, 0);
  }

  :host([effect='reveal']) [part=drawer] {
    z-index: 1;
  }

  :host([effect='reveal'][opened]) [part=drawer] {
    visibility: visible;
    transition: transform 0.5s;
  }

  :host([effect='reveal']) [part=drawer]::after {
    display: none;
  }

  :host([effect='reveal'][side='right'][opened]) [part=pusher] {
    transform: translate3d(0, 0, 0);
  }

  :host([effect='reveal'][side='right']) [part=drawer] {
    transform: translate3d(100vw, 0, 0);
  }

  :host([effect='reveal'][side='right'][opened]) [part=drawer] {
    transform: translate3d(calc(100vw - var(--kemet-drawer-width)), 0, 0);
  }

  :host([effect='reveal'][side='top']) [part=drawer] {
    width: 100vw;
    height: var(--kemet-drawer-height, 100vh);
    transform: translate3d(0, calc(var(--kemet-drawer-height) * -1), 0);
  }

  :host([effect='reveal'][side='top'][opened]) [part=drawer] {
    transform: translate3d(0, 0, 0);
  }

  :host([effect='reveal'][side='top'][opened]) [part=pusher] {
    transform: translate3d(0, var(--kemet-drawer-height), 0);
  }

  :host([effect='reveal'][side='bottom']) [part=drawer] {
    width: 100vw;
    height: var(--kemet-drawer-height, 100vh);
    transform: translate3d(0, ${unsafeCSS(documentHeight)}, 0);
  }

  :host([effect='reveal'][side='bottom'][opened]) [part=drawer] {
    transform: translate3d(0, calc(100vh - var(--kemet-drawer-height)), 0);
  }

  :host([effect='reveal'][side='bottom'][opened]) [part=pusher] {
    transform: translate3d(0, calc(var(--kemet-drawer-height) * -1), 0);
  }

  /* push */
  :host([effect='push'][opened]) [part=pusher] {
    transform: translate3d(var(--kemet-drawer-width), 0, 0);
  }

  :host([effect='push']) [part=drawer] {
    transform: translate3d(-100%, 0, 0);
  }

  :host([effect='push'][opened]) [part=drawer] {
    visibility: visible;
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
  }

  :host([effect='push']) [part=drawer]::after {
    display: none;
  }

  :host([effect='push'][side='right'][opened]) [part=pusher] {
    transform: translate3d(calc(var(--kemet-drawer-width) * -1), 0, 0);
  }

  :host([effect='push'][side='right']) [part=drawer] {
    transform: translate3d(100vw, 0, 0);
  }

  :host([effect='push'][side='right'][opened]) [part=drawer] {
    transform: translate3d(calc(100vw - var(--kemet-drawer-width)), 0, 0);
  }

  :host([effect='push'][side='top']) [part=drawer] {
    width: 100vw;
    height: var(--kemet-drawer-height, 100vh);
    transform: translate3d(0, calc(var(--kemet-drawer-height) * -1), 0);
  }

  :host([effect='push'][side='top'][opened]) [part=drawer] {
    transform: translate3d(0, 0, 0);
  }

  :host([effect='push'][side='top'][opened]) [part=pusher] {
    transform: translate3d(0, var(--kemet-drawer-height), 0);
  }

  :host([effect='push'][side='bottom']) [part=drawer] {
    width: 100vw;
    height: var(--kemet-drawer-height);
    transform: translate3d(0, ${unsafeCSS(documentHeight)}, 0);
  }

  :host([effect='push'][side='bottom'][opened]) [part=drawer] {
    transform: translate3d(0, calc(100vh - var(--kemet-drawer-height)), 0);
  }

  :host([effect='push'][side='bottom'][opened]) [part=pusher] {
    transform: translate3d(0, calc(var(--kemet-drawer-height) * -1), 0);
  }

  /* scale */
  :host([effect='scale']) [part=pusher] {
    transform-style: preserve-3d;
  }

  :host([effect='scale'][opened]) [part=pusher] {
    transform: translate3d(0, 0, 0) scale(0.75);
  }

  :host([effect='scale']) [part=drawer] {
    opacity: 1;
    transform: translate3d(-100%, 0, 0);
  }

  :host([effect='scale'][opened]) [part=drawer] {
    visibility: visible;
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
  }

  :host([effect='scale']) [part=drawer]::after {
    display: none;
  }

  :host([effect='scale'][side='right']) [part=drawer] {
    transform: translate3d(100vw, 0, 0);
  }

  :host([effect='scale'][side='right'][opened]) [part=drawer] {
    transform: translate3d(calc(100vw - var(--kemet-drawer-width)), 0, 0);
  }

  :host([effect='scale'][side='top']) [part=drawer] {
    width: 100vw;
    height: var(--kemet-drawer-height, 100vh);
    transform: translate3d(0, calc(var(--kemet-drawer-height) * -1), 0);
  }

  :host([effect='scale'][side='top'][opened]) [part=drawer] {
    transform: translate3d(0, 0, 0);
  }

  :host([effect='scale'][side='bottom']) [part=drawer] {
    width: 100vw;
    height: var(--kemet-drawer-height, 100vh);
    transform: translate3d(0, ${unsafeCSS(documentHeight)}, 0);
  }

  :host([effect='scale'][side='bottom'][opened]) [part=drawer] {
    transform: translate3d(0, calc(100vh - var(--kemet-drawer-height)), 0);
  }
`;
