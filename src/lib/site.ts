import type { Currency } from '@/lib/currency';
import type { Locale } from '@/lib/i18n';

export type NavItem = { href: string; label: string };
export type FeatureItem = { title: string; body: string };
export type PricingPlan = {
	name: string;
	description: string;
	priceEur: number;
	priceCurrency?: import('@/lib/currency').Currency;
	accent?: boolean;
	cta: string;
	features: readonly string[];
};

export type FAQItem = { question: string; answer: string };
export type ComparisonRow = { label: string; shared: string; vps: string };

export const brand = {
	name: 'VIP Super Hosting',
	domain: 'superhosting.vip',
	email: 'hello@superhosting.vip',
	phone: '+40 741 000 777',
	location: 'Bucharest, Romania',
	controlPanelUrl: import.meta.env.CONTROL_PANEL_URL ?? 'https://panel.superhosting.vip',
	webmailUrl: import.meta.env.WEBMAIL_URL ?? 'https://webmail.superhosting.vip',
};

export const sharedBasePlans = [
	{ slug: 'launch', priceEur: 6 },
	{ slug: 'grow', priceEur: 12 },
	{ slug: 'scale', priceEur: 24 },
] as const;

export const vpsBasePlans = [
	{ slug: 'ignite', priceEur: 19 },
	{ slug: 'velocity', priceEur: 39 },
	{ slug: 'summit', priceEur: 79 },
] as const;

export const comparisonRowsByLocale: Record<Locale, ComparisonRow[]> = {
	ro: [
		{ label: 'Ideal pentru', shared: 'Site-uri business, bloguri, landing pages', vps: 'Aplicatii custom, magazine, proiecte cu trafic variabil' },
		{ label: 'Administrare', shared: 'Managed sau unmanaged', vps: 'Managed sau unmanaged' },
		{ label: 'Scalare', shared: 'Planuri presetate si upgrade simplu', vps: 'Resurse configurabile si upgrade rapid' },
		{ label: 'Nivel acces', shared: 'Control orientat pe hosting clasic', vps: 'Control avansat pentru infrastructura dedicata' },
	],
	en: [
		{ label: 'Best for', shared: 'Business sites, blogs, landing pages', vps: 'Custom apps, stores, variable traffic workloads' },
		{ label: 'Management', shared: 'Managed or unmanaged', vps: 'Managed or unmanaged' },
		{ label: 'Scaling', shared: 'Preset tiers with easy upgrades', vps: 'Configurable resources with fast scaling' },
		{ label: 'Access level', shared: 'Control focused on classic hosting', vps: 'Advanced control for dedicated infrastructure' },
	],
	de: [
		{ label: 'Geeignet fur', shared: 'Business-Websites, Blogs, Landingpages', vps: 'Individuelle Apps, Shops, variable Workloads' },
		{ label: 'Verwaltung', shared: 'Managed oder unmanaged', vps: 'Managed oder unmanaged' },
		{ label: 'Skalierung', shared: 'Vordefinierte Pakete mit einfachem Upgrade', vps: 'Konfigurierbare Ressourcen mit schneller Skalierung' },
		{ label: 'Zugriffsebene', shared: 'Kontrolle fur klassisches Hosting', vps: 'Erweiterte Kontrolle fur dedizierte Infrastruktur' },
	],
};

export const pageContent = {
	ro: {
		seoSuffix: 'VIP Super Hosting',
		nav: {
			primary: [
				{ href: '/shared-hosting', label: 'Web Hosting' },
				{ href: '/vps-hosting', label: 'VPS Hosting' },
				{ href: '/server-administration', label: 'Administrare Servere' },
				{ href: '/web-design', label: 'Web Design' },
				{ href: '/about', label: 'Despre' },
				{ href: '/contact', label: 'Contact' },
			],
			account: [
				{ href: '/login', label: 'Login' },
				{ href: '/register', label: 'Inregistrare' },
				{ href: '/account', label: 'Contul meu' },
			],
		},
		home: {
			title: 'Hosting rapid pentru business-uri care cer stabilitate',
			description:
				'Shared hosting, VPS, administrare servere si web design intr-un stack clar, optimizat pentru viteza, siguranta si operare curata.',
			eyebrow: 'Shared hosting, VPS si administrare tehnica',
			primaryCta: 'Vezi planurile',
			secondaryCta: 'Discuta cu noi',
			stats: [
				{ value: '< 2.5s', label: 'Obiectiv LCP pentru paginile cheie' },
				{ value: '24/7', label: 'Suport pentru incidente critice' },
				{ value: 'RO / EN / DE', label: 'Experienta localizata pentru clienti' },
			],
			featureIntro: 'Servicii construite pentru firme mici si medii care vor sa scaleze fara improvizatii.',
			features: [
				{ title: 'Shared hosting clar si scalabil', body: 'Planuri presetate, variante managed si unmanaged si configurare personalizata pentru nevoi specifice.' },
				{ title: 'VPS pregatit pentru proiecte serioase', body: 'Resurse configurabile, hardening, monitorizare si administrare adaptata cerintelor tehnice.' },
				{ title: 'Administrare si web design in acelasi flux', body: 'De la infrastructura la prezentare, mentinem viteza, consistenta si suportul intr-o singura relatie.' },
			],
			faq: [
				{ question: 'Oferiti si planuri custom?', answer: 'Da. Pe langa pachetele presetate, poti trimite o cerere configurata pentru shared hosting sau VPS.' },
				{ question: 'Pot incepe unmanaged si trece ulterior pe managed?', answer: 'Da, pachetul poate evolua pe masura ce proiectul creste.' },
				{ question: 'Ati inclus si design web?', answer: 'Da, oferim si servicii de web design si optimizare UX pentru lansari complete.' },
			],
			servicesEyebrow: 'Servicii',
			comparisonTitle: 'Alege platforma potrivita',
			comparisonDescription: 'Compara cele doua familii de servicii inainte de a solicita o recomandare personalizata.',
			faqTitle: 'Intrebari frecvente',
			faqDescription: 'Raspunsuri scurte pentru cele mai comune intrebari comerciale.',
		},
		managed: {
			title: 'Managed Hosting pentru proiecte care cer stabilitate si administrare inclusa',
			description: 'Pachete hosting si VPS administrate complet, cu backup zilnic, suport prioritar si operare tehnica inclusa.',
		},
		shared: {
			title: 'Shared Hosting pentru site-uri business care cer stabilitate si suport rapid',
			description: 'Pachete presetate sau configurabile, disponibile managed sau unmanaged, cu accent pe performanta si timp de raspuns bun.',
			highlights: [
				'Panou intuitiv pentru administrarea resurselor uzuale',
				'Cache si optimizari gandite pentru website-uri rapide',
				'Optiune de administrare inclusa pentru echipe fara sysadmin intern',
			],
			featureTitle: 'Hosting shared construit pentru operare lina',
			tiersTitle: 'Pachete shared hosting presetate',
			tiersDescription: 'Pornesti dintr-un baseline curat, cu optiunea de a trece la cerinte custom oricand.',
			managedTitle: 'Planuri managed hosting',
			configuratorTitle: 'Ai nevoie de un shared hosting personalizat?',
			configuratorDescription: 'Trimite-ne parametrii de baza si revenim cu o oferta adaptata echipei tale.',
		},
		vps: {
			title: 'VPS Hosting pentru aplicatii, magazine si infrastructura care cere control real',
			description: 'Resurse configurabile, administrare optionala si o experienta orientata pe predictibilitate, securitate si viteza.',
			highlights: [
				'Planuri presetate pentru lansare rapida',
				'Configurator live pentru nevoi custom',
				'Managed si unmanaged in functie de nivelul de control dorit',
			],
			featureTitle: 'Control si flexibilitate fara zgomotul unui provider public',
			tiersTitle: 'Pachete VPS presetate',
			tiersDescription: 'Pornesti dintr-un punct verificat si solicitati o configuratie adaptata workload-ului vostru.',
			managedTitle: 'Planuri Managed VPS',
			configuratorTitle: 'Construieste o cerere VPS personalizata',
			configuratorDescription: 'Ajusteaza parametrii tehnici si trimite rezumatul cererii pentru analiza.',
		},
		admin: {
			title: 'Administrare servere pentru update-uri, hardening si performanta continua',
			description: 'Servicii recurente sau punctuale pentru infrastructura Linux, optimizare, patching si imbunatatiri de securitate.',
		},
		design: {
			title: 'Web design orientat pe incredere, conversie si viteza',
			description: 'Landing pages, site-uri de prezentare si refresh vizual pentru branduri care vor o imagine tehnica, moderna si credibila.',
		},
		about: {
			title: 'Un partener tehnic care trateaza hostingul ca produs, nu doar ca spatiu pe disc',
			description: 'VIP Super Hosting combina infrastructura, administrare si design intr-un serviciu construit pentru business-uri mici si medii.',
		},
		contact: {
			title: 'Contact si cereri comerciale',
			description: 'Trimite-ne contextul proiectului tau si revenim cu recomandare de plan, arhitectura sau oferta personalizata.',
		},
		legal: {
			title: 'Informatii legale si politici',
			description: 'Termeni, confidentialitate si politica de cookies pentru operarea site-ului si a serviciilor VIP Super Hosting.',
		},
		auth: {
			loginTitle: 'Intra in cont',
			registerTitle: 'Creeaza cont',
			forgotTitle: 'Reseteaza parola',
			accountTitle: 'Contul meu',
		},
	},
	en: {
		seoSuffix: 'VIP Super Hosting',
		nav: {
			primary: [
				{ href: '/shared-hosting', label: 'Web Hosting' },
				{ href: '/vps-hosting', label: 'VPS Hosting' },
				{ href: '/server-administration', label: 'Server Administration' },
				{ href: '/web-design', label: 'Web Design' },
				{ href: '/about', label: 'About' },
				{ href: '/contact', label: 'Contact' },
			],
			account: [
				{ href: '/login', label: 'Login' },
				{ href: '/register', label: 'Register' },
				{ href: '/account', label: 'Account' },
			],
		},
		home: {
			title: 'Fast hosting for businesses that need stability',
			description:
				'Shared hosting, VPS, server administration and web design delivered through a stack built for speed, security and clean operations.',
			eyebrow: 'Shared hosting, VPS and technical operations',
			primaryCta: 'See plans',
			secondaryCta: 'Talk to us',
			stats: [
				{ value: '< 2.5s', label: 'Target LCP for key pages' },
				{ value: '24/7', label: 'Support for critical incidents' },
				{ value: 'RO / EN / DE', label: 'Localized client experience' },
			],
			featureIntro: 'Services designed for small and mid-sized businesses that want to scale without improvisation.',
			features: [
				{ title: 'Clear, scalable shared hosting', body: 'Preset plans, managed and unmanaged options, plus custom configuration for specific workloads.' },
				{ title: 'VPS built for serious projects', body: 'Configurable resources, hardening, monitoring and administration aligned to technical requirements.' },
				{ title: 'Infrastructure and web design in one flow', body: 'From backend stability to visual polish, the service is built to stay coherent and fast.' },
			],
			faq: [
				{ question: 'Do you offer custom plans?', answer: 'Yes. Alongside preset packages, we support tailored shared hosting and VPS requests.' },
				{ question: 'Can I start unmanaged and move to managed later?', answer: 'Yes. Packages are structured to evolve with your project.' },
				{ question: 'Do you also handle website design?', answer: 'Yes. We offer web design and UX improvements for end-to-end launches.' },
			],
			servicesEyebrow: 'Services',
			comparisonTitle: 'Choose the right platform',
			comparisonDescription: 'Compare the two service families before requesting a tailored recommendation.',
			faqTitle: 'Frequently asked questions',
			faqDescription: 'Short answers for the most common commercial questions.',
		},
		managed: {
			title: 'Managed Hosting for projects that need stability and full administration',
			description: 'Fully managed hosting and VPS packages with daily backups, priority support and included technical operations.',
		},
		shared: {
			title: 'Shared Hosting for business websites that need stability and responsive support',
			description: 'Preset or configurable packages, available as managed or unmanaged, with an emphasis on performance and clear operations.',
			highlights: [
				'Intuitive control for everyday hosting tasks',
				'Caching and optimizations for fast websites',
				'Managed administration for teams without an in-house sysadmin',
			],
			featureTitle: 'Shared hosting built for calm operations',
			tiersTitle: 'Preset shared hosting tiers',
			tiersDescription: 'Start from a clean baseline, then switch to custom requirements when needed.',
			managedTitle: 'Managed hosting plans',
			configuratorTitle: 'Need a custom shared hosting quote?',
			configuratorDescription: 'Tune the core parameters and send the requirement summary to our team.',
		},
		vps: {
			title: 'VPS Hosting for apps, stores and infrastructure that require real control',
			description: 'Configurable resources, optional administration and a service model focused on reliability, security and speed.',
			highlights: [
				'Preset plans for faster launch',
				'Live configurator for custom workloads',
				'Managed or unmanaged according to the level of control you need',
			],
			featureTitle: 'Control and flexibility without public provider noise',
			tiersTitle: 'Preset VPS tiers',
			tiersDescription: 'Build from proven starting points, then request a tuned quote for your workload.',
			managedTitle: 'Managed VPS plans',
			configuratorTitle: 'Build a tailored VPS request',
			configuratorDescription: 'Adjust the technical parameters and send the request summary for review.',
		},
		admin: {
			title: 'Server administration for updates, hardening and ongoing performance',
			description: 'Recurring or one-off services for Linux infrastructure, optimization, patching and security improvements.',
		},
		design: {
			title: 'Web design built for trust, conversion and speed',
			description: 'Landing pages, company websites and visual refresh projects for brands that need a technical, modern and credible presence.',
		},
		about: {
			title: 'A technical partner that treats hosting as a product, not just disk space',
			description: 'VIP Super Hosting combines infrastructure, administration and design into a service for small and mid-sized businesses.',
		},
		contact: {
			title: 'Contact and sales requests',
			description: 'Send us your project context and we will return with a recommended plan, architecture or tailored offer.',
		},
		legal: {
			title: 'Legal information and policies',
			description: 'Terms, privacy and cookie information for the website and VIP Super Hosting services.',
		},
		auth: {
			loginTitle: 'Sign in',
			registerTitle: 'Create account',
			forgotTitle: 'Reset password',
			accountTitle: 'My account',
		},
	},
	de: {
		seoSuffix: 'VIP Super Hosting',
		nav: {
			primary: [
				{ href: '/shared-hosting', label: 'Web Hosting' },
				{ href: '/vps-hosting', label: 'VPS Hosting' },
				{ href: '/server-administration', label: 'Serververwaltung' },
				{ href: '/web-design', label: 'Web Design' },
				{ href: '/about', label: 'Uber uns' },
				{ href: '/contact', label: 'Kontakt' },
			],
			account: [
				{ href: '/login', label: 'Login' },
				{ href: '/register', label: 'Registrieren' },
				{ href: '/account', label: 'Konto' },
			],
		},
		home: {
			title: 'Schnelles Hosting fur Unternehmen mit Anspruch auf Stabilitat',
			description:
				'Shared Hosting, VPS, Serververwaltung und Web Design in einem Stack fur Geschwindigkeit, Sicherheit und sauberen Betrieb.',
			eyebrow: 'Shared Hosting, VPS und technische Betreuung',
			primaryCta: 'Pakete ansehen',
			secondaryCta: 'Kontakt aufnehmen',
			stats: [
				{ value: '< 2.5s', label: 'LCP-Ziel fur zentrale Seiten' },
				{ value: '24/7', label: 'Support fur kritische Vorfalle' },
				{ value: 'RO / EN / DE', label: 'Lokalisierte Nutzererfahrung' },
			],
			featureIntro: 'Services fur kleine und mittlere Unternehmen, die ohne Improvisation skalieren wollen.',
			features: [
				{ title: 'Klares, skalierbares Shared Hosting', body: 'Vordefinierte Pakete, managed oder unmanaged, plus individuelle Konfiguration fur spezielle Anforderungen.' },
				{ title: 'VPS fur ernsthafte Projekte', body: 'Konfigurierbare Ressourcen, Hardening, Monitoring und Administration passend zu technischen Anforderungen.' },
				{ title: 'Infrastruktur und Web Design in einem Ablauf', body: 'Von stabiler Technik bis zu einem starken Auftritt bleibt alles schnell und konsistent.' },
			],
			faq: [
				{ question: 'Bieten Sie auch individuelle Pakete an?', answer: 'Ja. Neben den Standardpaketen unterstutzen wir individuelle Shared-Hosting- und VPS-Anfragen.' },
				{ question: 'Kann ich zuerst unmanaged starten und spater managed wechseln?', answer: 'Ja. Pakete sind so aufgebaut, dass sie mit dem Projekt wachsen konnen.' },
				{ question: 'Ubernehmen Sie auch Web Design?', answer: 'Ja. Fur Kunden mit Komplettbedarf bieten wir Web Design und UX-Optimierung an.' },
			],
			servicesEyebrow: 'Leistungen',
			comparisonTitle: 'Die richtige Plattform wahlen',
			comparisonDescription: 'Vergleiche die zwei Service-Familien, bevor du eine individuelle Empfehlung anforderst.',
			faqTitle: 'Haufig gestellte Fragen',
			faqDescription: 'Kurze Antworten auf die haufigsten kommerziellen Fragen.',
		},
		managed: {
			title: 'Managed Hosting fur Projekte mit Fokus auf Stabilitat und vollstandiger Verwaltung',
			description: 'Vollstandig verwaltete Hosting- und VPS-Pakete mit taglichen Backups, priorisiertem Support und technischem Betrieb inklusive.',
		},
		shared: {
			title: 'Shared Hosting fur Business-Websites mit Fokus auf Stabilitat und schnellen Support',
			description: 'Vordefinierte oder konfigurierbare Pakete, managed oder unmanaged, mit Fokus auf Performance und sauberen Betrieb.',
			highlights: [
				'Intuitive Verwaltung fur typische Hosting-Aufgaben',
				'Caching und Optimierungen fur schnelle Websites',
				'Managed-Verwaltung fur Teams ohne eigenen Sysadmin',
			],
			featureTitle: 'Shared Hosting fur ruhigen Betrieb',
			tiersTitle: 'Vordefinierte Shared-Hosting-Pakete',
			tiersDescription: 'Starten Sie mit einer sauberen Basis und wechseln Sie bei Bedarf zu individuellen Anforderungen.',
			managedTitle: 'Managed-Hosting-Pakete',
			configuratorTitle: 'Benotigen Sie ein individuelles Shared-Hosting-Angebot?',
			configuratorDescription: 'Passen Sie die Kernparameter an und senden Sie die Zusammenfassung an unser Team.',
		},
		vps: {
			title: 'VPS Hosting fur Anwendungen, Shops und Infrastruktur mit echtem Kontrollbedarf',
			description: 'Konfigurierbare Ressourcen, optionale Administration und ein Service-Modell mit Fokus auf Zuverlassigkeit, Sicherheit und Geschwindigkeit.',
			highlights: [
				'Vordefinierte Pakete fur schnellen Start',
				'Live-Konfigurator fur individuelle Anforderungen',
				'Managed oder unmanaged je nach gewunschtem Kontrollgrad',
			],
			featureTitle: 'Kontrolle und Flexibilitat ohne den Larm offentlicher Anbieter',
			tiersTitle: 'Vordefinierte VPS-Pakete',
			tiersDescription: 'Starten Sie von bewahrten Ausgangspunkten und fordern Sie ein angepasstes Angebot an.',
			managedTitle: 'Managed-VPS-Pakete',
			configuratorTitle: 'Erstellen Sie eine individuelle VPS-Anfrage',
			configuratorDescription: 'Passen Sie die technischen Parameter an und senden Sie die Anfragezusammenfassung zur Prufung.',
		},
		admin: {
			title: 'Serververwaltung fur Updates, Hardening und nachhaltige Performance',
			description: 'Wiederkehrende oder punktuelle Leistungen fur Linux-Infrastruktur, Optimierung, Patching und Sicherheitsverbesserungen.',
		},
		design: {
			title: 'Web Design fur Vertrauen, Conversion und Geschwindigkeit',
			description: 'Landingpages, Unternehmenswebsites und visuelle Refresh-Projekte fur Marken mit technischem Anspruch.',
		},
		about: {
			title: 'Ein technischer Partner, der Hosting als Produkt versteht und nicht nur als Speicherplatz',
			description: 'VIP Super Hosting verbindet Infrastruktur, Administration und Design zu einem Service fur kleine und mittlere Unternehmen.',
		},
		contact: {
			title: 'Kontakt und Vertriebsanfragen',
			description: 'Senden Sie uns den Kontext Ihres Projekts und wir empfehlen ein passendes Paket oder eine individuelle Losung.',
		},
		legal: {
			title: 'Rechtliche Informationen und Richtlinien',
			description: 'AGB, Datenschutz und Cookie-Hinweise fur die Website und die Services von VIP Super Hosting.',
		},
		auth: {
			loginTitle: 'Anmelden',
			registerTitle: 'Konto erstellen',
			forgotTitle: 'Passwort zurucksetzen',
			accountTitle: 'Mein Konto',
		},
	},
} as const satisfies Record<Locale, any>;

export function getPageContent(locale: Locale) {
	return pageContent[locale];
}

export function getSharedPlans(locale: Locale): PricingPlan[] {
	const labels = {
		ro: [['Launch', 'Pentru prezente online curate, cu trafic moderat.'], ['Grow', 'Pentru site-uri de business in crestere si mai multe proiecte.'], ['Scale', 'Pentru magazine si proiecte care au nevoie de buffer real.']],
		en: [['Launch', 'For polished online presence with moderate traffic.'], ['Grow', 'For growing business websites and multi-site setups.'], ['Scale', 'For stores and projects that need serious headroom.']],
		de: [['Launch', 'Fur starke Online-Prasenz mit moderatem Traffic.'], ['Grow', 'Fur wachsende Business-Websites und mehrere Projekte.'], ['Scale', 'Fur Shops und Projekte mit echtem Leistungsbedarf.']],
	} as const;

	const features = {
		ro: [['10 GB NVMe', '1 website inclus', 'SSL si backup automat', 'Managed optional'], ['30 GB NVMe', 'pana la 5 website-uri', 'cache extins', 'prioritate suport'], ['80 GB NVMe', 'resurse generoase', 'medii business cu trafic ridicat', 'optimizare inclusa']],
		en: [['10 GB NVMe', '1 website included', 'SSL and automated backups', 'Managed optional'], ['30 GB NVMe', 'up to 5 websites', 'extended caching', 'priority support'], ['80 GB NVMe', 'generous resources', 'business workloads with higher traffic', 'optimization included']],
		de: [['10 GB NVMe', '1 Website inklusive', 'SSL und automatische Backups', 'Managed optional'], ['30 GB NVMe', 'bis zu 5 Websites', 'erweitertes Caching', 'priorisierter Support'], ['80 GB NVMe', 'groBzugige Ressourcen', 'Business-Workloads mit hohem Traffic', 'Optimierung inklusive']],
	} as const;

	return sharedBasePlans.map((plan, index) => ({
		name: labels[locale][index][0],
		description: labels[locale][index][1],
		priceEur: plan.priceEur,
		accent: index === 1,
		cta: locale === 'ro' ? 'Solicita configurare' : locale === 'en' ? 'Request setup' : 'Konfiguration anfragen',
		features: features[locale][index],
	}));
}

export function getVpsPlans(locale: Locale): PricingPlan[] {
	const labels = {
		ro: [['Ignite', 'Punct bun de pornire pentru workload-uri noi.'], ['Velocity', 'Echilibru puternic intre cost, resurse si scalare.'], ['Summit', 'Pentru aplicatii cu resurse serioase si crestere accelerata.']],
		en: [['Ignite', 'A strong starting point for new workloads.'], ['Velocity', 'A powerful balance between cost, resources and scaling.'], ['Summit', 'For applications with heavier requirements and faster growth.']],
		de: [['Ignite', 'Ein starker Einstieg fur neue Workloads.'], ['Velocity', 'Ein gutes Gleichgewicht aus Kosten, Ressourcen und Skalierung.'], ['Summit', 'Fur Anwendungen mit hoherem Bedarf und schnellem Wachstum.']],
	} as const;

	const features = {
		ro: [['2 vCPU / 4 GB RAM', '80 GB SSD', 'managed optional', 'monitorizare de baza'], ['4 vCPU / 8 GB RAM', '160 GB SSD', 'backup optional', 'hardening inclus la managed'], ['8 vCPU / 16 GB RAM', '320 GB SSD', 'potrivit pentru workload-uri critice', 'suport prioritar']],
		en: [['2 vCPU / 4 GB RAM', '80 GB SSD', 'managed optional', 'basic monitoring'], ['4 vCPU / 8 GB RAM', '160 GB SSD', 'backup optional', 'hardening included on managed'], ['8 vCPU / 16 GB RAM', '320 GB SSD', 'fit for critical workloads', 'priority support']],
		de: [['2 vCPU / 4 GB RAM', '80 GB SSD', 'Managed optional', 'Basis-Monitoring'], ['4 vCPU / 8 GB RAM', '160 GB SSD', 'Backup optional', 'Hardening bei managed inklusive'], ['8 vCPU / 16 GB RAM', '320 GB SSD', 'fur kritische Workloads geeignet', 'priorisierter Support']],
	} as const;

	return vpsBasePlans.map((plan, index) => ({
		name: labels[locale][index][0],
		description: labels[locale][index][1],
		priceEur: plan.priceEur,
		accent: index === 1,
		cta: locale === 'ro' ? 'Configureaza VPS' : locale === 'en' ? 'Configure VPS' : 'VPS konfigurieren',
		features: features[locale][index],
	}));
}

export function getServiceFeatures(locale: Locale): Record<'shared' | 'vps' | 'admin' | 'design', readonly FeatureItem[]> {
	const content = {
		ro: {
			shared: [
				{ title: 'Managed sau unmanaged', body: 'Alegi nivelul de implicare tehnica potrivit proiectului si echipei tale.' },
				{ title: 'Preset sau custom', body: 'Pornesti rapid dintr-un pachet si scalezi cand proiectul o cere.' },
				{ title: 'Optimizare pentru viteza', body: 'Stack-ul este gandit pentru incarcare rapida si experienta buna pe mobil.' },
			],
			vps: [
				{ title: 'Resurse configurabile', body: 'CPU, RAM, storage si administrare aliniate la cerintele reale ale aplicatiei.' },
				{ title: 'Security-first operations', body: 'Hardening, update-uri si practici operationale pentru medii serioase.' },
				{ title: 'Bridge catre control panel', body: 'Contul public si panoul tehnic raman coerente pentru utilizatorul final.' },
			],
			admin: [
				{ title: 'Patch management', body: 'Update-uri periodice pentru pachete si componente critice.' },
				{ title: 'Security improvements', body: 'Hardening, firewall review, servicii si politici ajustate pe risc.' },
				{ title: 'Performance tuning', body: 'Ajustari pentru web server, PHP, cache si load patterns.' },
			],
			design: [
				{ title: 'Design business-first', body: 'Site-uri care inspira incredere si sustin vanzarea fara zgomot inutil.' },
				{ title: 'SEO si continut clar', body: 'Structura pregatita pentru indexare, viteza si scanabilitate.' },
				{ title: 'Compatibil cu hostingul', body: 'UX si performanta gandite impreuna cu mediul de livrare.' },
			],
		},
		en: {
			shared: [
				{ title: 'Managed or unmanaged', body: 'Pick the right level of technical involvement for your team and project.' },
				{ title: 'Preset or custom', body: 'Launch quickly from a package and scale when the workload requires it.' },
				{ title: 'Built for speed', body: 'The stack is designed for fast loads and strong mobile experience.' },
			],
			vps: [
				{ title: 'Configurable resources', body: 'CPU, RAM, storage and administration aligned to real application needs.' },
				{ title: 'Security-first operations', body: 'Hardening, updates and operational practices for serious environments.' },
				{ title: 'Bridge to the control panel', body: 'Public account access and technical panel remain coherent for the end user.' },
			],
			admin: [
				{ title: 'Patch management', body: 'Scheduled updates for packages and critical components.' },
				{ title: 'Security improvements', body: 'Hardening, firewall review and service policies adjusted to risk.' },
				{ title: 'Performance tuning', body: 'Targeted improvements for web server, PHP, caching and load patterns.' },
			],
			design: [
				{ title: 'Business-first design', body: 'Sites that inspire trust and support conversion without unnecessary noise.' },
				{ title: 'SEO and clear content', body: 'Structure built for indexing, speed and better scanability.' },
				{ title: 'Hosting-aware UX', body: 'Performance and user experience designed together with the delivery stack.' },
			],
		},
		de: {
			shared: [
				{ title: 'Managed oder unmanaged', body: 'Wahle den passenden technischen Aufwand fur Team und Projekt.' },
				{ title: 'Vordefiniert oder individuell', body: 'Starte schnell mit einem Paket und skaliere bei Bedarf.' },
				{ title: 'Auf Geschwindigkeit ausgelegt', body: 'Der Stack ist fur schnelle Ladezeiten und starke Mobile-UX aufgebaut.' },
			],
			vps: [
				{ title: 'Konfigurierbare Ressourcen', body: 'CPU, RAM, Storage und Administration passend zum realen Bedarf.' },
				{ title: 'Security-first Betrieb', body: 'Hardening, Updates und operative Standards fur ernsthafte Umgebungen.' },
				{ title: 'Bridge zum Control Panel', body: 'Public Account und technisches Panel bleiben fur Nutzer konsistent.' },
			],
			admin: [
				{ title: 'Patch Management', body: 'Geplante Updates fur Pakete und kritische Komponenten.' },
				{ title: 'Security Improvements', body: 'Hardening, Firewall-Review und angepasste Service-Policies.' },
				{ title: 'Performance Tuning', body: 'Optimierungen fur Webserver, PHP, Cache und Lastprofile.' },
			],
			design: [
				{ title: 'Business-orientiertes Design', body: 'Websites, die Vertrauen schaffen und Conversion ohne visuellen Larm unterstutzen.' },
				{ title: 'SEO und klare Inhalte', body: 'Struktur fur Indexierung, Geschwindigkeit und bessere Scanbarkeit.' },
				{ title: 'Hosting-bewusste UX', body: 'Performance und UX werden gemeinsam mit dem Hosting-Setup gedacht.' },
			],
		},
	} as const;

	return content[locale];
}

export function getFaq(locale: Locale): readonly FAQItem[] {
	return pageContent[locale].home.faq;
}

export function getCurrencyLabels(locale: Locale): Record<Currency, string> {
	return {
		RON: locale === 'de' ? 'Lei' : 'RON',
		EUR: 'EUR',
		USD: 'USD',
	};
}
