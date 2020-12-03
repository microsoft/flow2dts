# Contributing to flow2dts

We greatly appreciate feedback, bug reports, and pull-requests; just make sure they adhere to [Microsoft’s Code of Conduct](https://opensource.microsoft.com/codeofconduct).

### Setup

```
git clone https://github.com/microsoft/flow2dts.git
cd flow2dts
yarn install
```

### Iterate

After making changes, be sure to test them with:

```
yarn test
```

…and while the React Native typings still exist in this repo, update them _or_ ensure no unexpected changes occur:

```
yarn workbench
```

### When needing to patch a package

We make liberal use of [patch-package](https://github.com/ds300/patch-package#usage) to make local changes to packages that **need** to be sent upstream before a new release of the tool can be made. (Or, worst case, it should alternatively be decided to make use of a forked package instead.)

### Helpful resources

- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md) which documents how to use Babel's tooling to transform AST.
- [AST Explorer](https://astexplorer.net) which allows you to easily inspect the Babel AST of both Flow and TypeScript code, making it trivial to know what AST node types to visit and what AST node types to transform it to.
  For instance, [here’s some Flow source](https://astexplorer.net/#/gist/5d27669987216a0746d90a6b6c42c8c7/6280b99ca19bcde8b5e7304b14271085cbcc46e8) and the expected converted [TypeScript ambient declaration](https://astexplorer.net/#/gist/5d27669987216a0746d90a6b6c42c8c7/848c3e201e6ba3614f5a96d42fc14da6d7b0a393).
  1. Select language `JavaScript`
  2. Select parser `@babel/parser`
  3. Select from the parser’s settings either `Flow` or `TypeScript`.
