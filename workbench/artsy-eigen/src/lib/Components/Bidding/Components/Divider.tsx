import React from "react"
import { Flex } from "../Elements/Flex"

export const Divider = (props: any /* STRICTNESS_MIGRATION */) => (
  <Flex width="100%" border={1} borderColor="black10" borderBottomWidth={0} {...props} />
)
