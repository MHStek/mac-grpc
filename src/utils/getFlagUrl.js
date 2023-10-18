export default function flagUrl(countryCode, countryOption) {
  const flagObj = countryOption.find((obj) => {
    return obj.value === countryCode
  })
  return flagObj?.flag
}
