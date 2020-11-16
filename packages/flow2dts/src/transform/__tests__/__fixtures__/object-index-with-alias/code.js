type AliasedString = string
type AliasedNumber = number
type StringIndexed = {
  [key: AliasedString]: AliasedNumber,
}
type NumberIndexed = {
  [key: AliasedNumber]: AliasedString,
}
