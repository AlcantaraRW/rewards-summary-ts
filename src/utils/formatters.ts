const LOCALE = 'pt-BR';

export const numberFormatter = new Intl.NumberFormat(LOCALE);

export const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'BRL',
});

export const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const dayFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: '2-digit',
  month: '2-digit',
});

export const weekDayFormatter = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'short',
});
