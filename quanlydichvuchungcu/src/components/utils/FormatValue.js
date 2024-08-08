export function formatCurrency(value, locale = 'en-US', currency = 'USD'){
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
}

// export function formatTime (time){
//   const dateObject = new Date(time)
//   return dateObject.toLocaleString()
// }

export function formatTime (time){
  
  const dateObject = new Date(time)
  const day = String(dateObject.getDate()).padStart(2,'0')
  const month = String(dateObject.getMonth()+1).padStart(2,'0')
  const year = dateObject.getFullYear()
  const hours = String(dateObject.getHours()).padStart(2,'0')
  const minutes = String(dateObject.getMinutes()).padStart(2,'0')
  const seconds = String(dateObject.getSeconds()).padStart(2,'0')
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}