# flow2dts

## Setup

```
git clone https://github.com/alloy/flow2dts.git
cd flow2dts
yarn install
```

## When needing to patch a package

We use [patch-package](https://github.com/ds300/patch-package#usage) to make local changes to packages that we will send upstream before releasing this package.

## Resources

- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
- [AST Explorer](https://astexplorer.net) allows you to easily inspect the Babel AST of both Flow and TypeScript code, which makes it trivial to know what to visit and what to transform it to.
  For instance, [here’s some Flow source](https://astexplorer.net/#/gist/5d27669987216a0746d90a6b6c42c8c7/6280b99ca19bcde8b5e7304b14271085cbcc46e8) and the expected converted [TypeScript ambient declaration](https://astexplorer.net/#/gist/5d27669987216a0746d90a6b6c42c8c7/848c3e201e6ba3614f5a96d42fc14da6d7b0a393).
  1. Select language `JavaScript`
  2. Select parser `@babel/parser`
  3. Select from the parser’s settings either `Flow` or `TypeScript`.
