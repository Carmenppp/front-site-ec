export const formatCurrency = (value) => {
    return new Intl.NumberFormat("de-DE").format(value)
  }
  