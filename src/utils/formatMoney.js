const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
});

function formatMoney(cents) {
  return formatter.format(cents / 100);
}

export default formatMoney;
