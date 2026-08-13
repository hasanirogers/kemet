// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Kemet UI',
      logo: {
        dark: './src/assets/logo/side-title-dark-bg.png',
        light: './src/assets/logo/side-title-light-bg.png',
        replacesTitle: true
      },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/hasanirogers/kemet' }],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Elements',
					items: [{ autogenerate: { directory: 'elements' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
