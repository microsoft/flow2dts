declare type AliasedString = string
declare type AliasedNumber = number
declare type StringIndexed = {
  [key: string]: AliasedNumber
}
declare type NumberIndexed = {
  [key: number]: AliasedString
}
