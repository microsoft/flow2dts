import { UnknownType } from "UnknownType"
declare type AliasedString = string
declare type AliasedNumber = number
declare type StringIndexed = {
  [key: string]: AliasedNumber
}
declare type NumberIndexed = {
  [key: number]: AliasedString
}
declare type UnknownIndexed = {
  /*[FLOW2DTS - Warning] The key type 'UnknownType' was unresolvable in the original Flow source.*/
  [key: string]: UnknownType
  [key: number]: UnknownType
}
declare type GenericIndexed<T> = {
  /*[FLOW2DTS - Warning] The key type 'T' was unresolvable in the original Flow source.*/
  [key: string]: T
  [key: number]: T
}
