import { html } from 'lit';
import { useGlobals, useEffect } from 'storybook/preview-api';

export const globalFormatting = (StoryFn: any, context: { component?: string }) => {
  const blacklistMargins = ['kemet-alert', 'kemet-combo', 'kemet-drawer', 'kemet-tooltip'];

  // add spacing to those not blacklisted
  if (context.component && blacklistMargins.indexOf(context.component) === -1) {
    return html`<div style="margin:2rem;">${StoryFn()}</div>`;
  }

  // component specific
  if (context.component === 'kemet-combo') {
    return html`<div style="min-height:380px; margin:2rem;">${StoryFn()}</div>`;
  }

  // default
  return html`<div>${StoryFn()}</div>`;
};

export const handleThemeSwitching = (StoryFn: any, context: { component?: string; viewMode?: string }) => {
  const [globals, updateGlobals] = useGlobals();

  // console.log(globals.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = globals.theme;

    // if (context.viewMode === 'story') {
    //   if (globals.polarity === 'dark') {
    //     // updateGlobals({ backgrounds: { value: '#202020', name: 'dark' } });
    //     document.body.style.backgroundColor = '#222425';
    //   } else {
    //     // updateGlobals({ backgrounds: { value: '#f8f8f8', name: 'light' } });
    //     document.body.style.backgroundColor = '#f8f8f8';
    //   }
    // }
  }, [globals.theme]);

  return StoryFn();
}
