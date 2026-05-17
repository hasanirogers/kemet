import KemetDrawer from 'kemet-ui/elements/drawer.js';

const kemetDrawer = document.querySelector('kemet-drawer') as KemetDrawer;
const toggleDrawerButton = document.querySelector('[aria-label="toggle drawer"]');

toggleDrawerButton!.addEventListener('click', () => {
  kemetDrawer.opened = !kemetDrawer.opened;
});
