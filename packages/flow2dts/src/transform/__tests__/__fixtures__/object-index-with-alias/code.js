import { UnknownType } from "UnknownType"
type AliasedString = string
type AliasedNumber = number
type StringIndexed = {
  [key: AliasedString]: AliasedNumber,
}
type NumberIndexed = {
  [key: AliasedNumber]: AliasedString,
}
type UnknownIndexed = {
  [key: UnknownType]: UnknownType,
}
type GenericIndexed<T> = {
  [key: T]: T,
}
