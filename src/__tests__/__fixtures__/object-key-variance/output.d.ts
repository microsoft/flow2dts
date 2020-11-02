declare type ObjectWithKeyVariance = {
  readonly readonlyKey: null

  /*[FLOW2DTS - Warning] This property was a write-only property in the original Flow source.*/
  writeonlyKey: null
}
