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
			social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/hasanirogers/kemet' },
        { icon: 'threads', label: 'Threads', href: 'https://www.threads.com/@deificarts' },
        { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/deificarts/' },
        { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@DeificArtsLLC' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/100660568' }
      ],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
          items: [{ autogenerate: { directory: 'getting-started' } }],
					// items: [
					// 	// Each item here is one entry in the navigation menu.
					// 	{ label: 'Getting Started', slug: 'getting-started' },
					// ],
				},
				{
					label: 'Elements',
					items: [{ autogenerate: { directory: 'elements' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			]
		}),
	],
});
