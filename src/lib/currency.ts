export const currencies = ['RON', 'EUR', 'USD'] as const;
export type Currency = (typeof currencies)[number];
export type CurrencyLocale = 'ro' | 'en' | 'de';

export const defaultCurrency: Currency = 'RON';
export const currencyByLocale: Record<CurrencyLocale, Currency> = {
	ro: 'RON',
	en: 'USD',
	de: 'EUR',
};

const rates: Record<Currency, number> = {
	EUR: 1,
	USD: 1.09,
	RON: 5.10,
};

const localesByCurrency: Record<Currency, string> = {
	RON: 'ro-RO',
	EUR: 'de-DE',
	USD: 'en-US',
};

export function isCurrency(value: string | undefined | null): value is Currency {
	return Boolean(value && currencies.includes(value as Currency));
}

export function normalizeCurrency(value: string | undefined | null): Currency {
	return isCurrency(value) ? value : defaultCurrency;
}

export function getCurrencyForLocale(locale: CurrencyLocale): Currency {
	return currencyByLocale[locale] ?? defaultCurrency;
}

export function convertPrice(baseEur: number, currency: Currency, ronRate?: number): number {
	const effectiveRates = ronRate ? { ...rates, RON: ronRate } : rates;
	return Number((baseEur * effectiveRates[currency]).toFixed(2));
}

export function formatMoney(baseEur: number, currency: Currency, ronRate?: number) {
	return new Intl.NumberFormat(localesByCurrency[currency], {
		style: 'currency',
		currency,
		maximumFractionDigits: currency === 'RON' ? 0 : 2,
	}).format(convertPrice(baseEur, currency, ronRate));
}

/** Format a price that is already in the target currency — no conversion. */
export function formatMoneyRaw(amount: number, currency: Currency) {
	return new Intl.NumberFormat(localesByCurrency[currency], {
		style: 'currency',
		currency,
		maximumFractionDigits: currency === 'RON' ? 0 : 2,
	}).format(amount);
}
