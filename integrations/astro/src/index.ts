import type HTMLKemetDrawerElement from 'kemet-ui/drawer'
import 'kemet-ui/styles/tokens.css'
import 'kemet-ui/drawer'
import 'kemet-ui/button'
import 'kemet-ui/icon'

const toggleButton = document.querySelector('button[aria-label="toggle drawer"]') as HTMLButtonElement;

toggleButton.addEventListener('click', () => {
  const drawer = document.querySelector('kemet-drawer') as HTMLKemetDrawerElement;
  drawer.opened = !drawer.opened;
});
