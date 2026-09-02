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
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Installation', slug: 'docs/installation' },
            { label: 'Usage', slug: 'docs/usage' },
            { label: 'Design Tokens', slug: 'docs/design-tokens' },
            { label: 'Customization', slug: 'docs/customization'},
            { label: 'Typography', slug: 'docs/typography' },
            { label: 'Iconography', slug: 'docs/iconography' },
            { label: 'Forms', slug: 'docs/forms' },
            { label: 'Frameworks', slug: 'docs/frameworks' },
					],
				},
				{
					label: 'Elements',
          collapsed: true,
					items: [{ autogenerate: { directory: 'elements' } }],
				},
        {
          label: 'Styles API',
          collapsed: true,
          items: [{ autogenerate: { directory: 'styles' } }],
        }
			],
      components: {
        // Override the SiteTitle component
        SiteTitle: './src/components/CustomSiteTitle.astro',
      },
		}),
	],
});
