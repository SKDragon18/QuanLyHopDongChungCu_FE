export function formatCurrency(value, locale = 'en-US', currency = 'USD'){
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
}

export function formatTime (time){
  const dateObject = new Date(time)
  return dateObject.toLocaleString()
}