# flow2dts

This tool aims to convert [Flow](https://flow.org) [declaration files](https://flow.org/en/docs/declarations/) to [TypeScript](https://www.typescriptlang.org) [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html). This means that the tool does **not** convert implementation code written in the Flow language, but solely library API signatures.

The primary goal is to provide up-to-date and high-quality TypeScript typings for [React Native](https://reactnative.dev), which can be found in the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/index.d.ts) repository. These have historically been maintained in a manual fashion, which is labor intensive, have lagged behind React Native releases, and have been incomplete at best.

### Limitations

Ideally the tool would be usable with _any_ library implemented using the Flow language, however at this time the Flow compiler does not make the ability to generate declaration files available to the general public. (For React Native we rely on Facebook to generate these declaration files for us.) Until then, this tool should theoretically be able to convert manually maintained Flow declaration files, such as those in the [flow-typed](https://github.com/flow-typed/flow-typed) repository.

Even though we explicitly aim to convert declaration files only, it should theoretically be possible to generate TypeScript declaration files from Flow implementation code when _all_ APIs are typed **explicitly**. This would likely require _some_ alteration to this tool, but not in any significant way. (Please let us know if you end up making these changes.)

### Acknowledgements

We would like to point out that while our project only targets declaration files, there are other active efforts that aim to convert Flow implementation code. Because of the different stated goals our project makes some different trade-offs than these; for instance, typically their aim is to convert one’s own project implemented in Flow to TypeScript far enough such that converting the remaining bits can be performed manually. Having said that, if the goal is to convert a codebase you should absolutely take a look at these:

- https://github.com/Khan/flow-to-ts
- https://github.com/bcherny/flow-to-typescript
- https://github.com/zxbodya/flowts

### React Native specific considerations

TODO Flesh this out.

- Describe migration path.
- Consider how to deal with different RN platforms, specifically how to use them in user projects.

## Usage of the tool

```
flow2dts --root path/to/flow/inputs --out path/to/ts/outputs [FILES]

FILES can be a list of include patterns or exclude by prepending the ! operator.

Options:
  --version    Show version number                                     [boolean]
  --rootDir    The root directory of the Flow sources        [string] [required]
  --outDir     Where the TS sources should be written        [string] [required]
  --platform   Determines which platform specific files to include
                                 [string] [required] [choices: "ios", "android"]
  --cwd        The working directory from which to expand relative paths[string]
  --overrides  A file that exports a OverridesVisitor object used to provide
               project specific overrides where conversion cannot accurately be
               made                                                     [string]
  --help       Show help                                               [boolean]
```

### Workbench

For the time being, examples of using the tool to convert React Native typings can be found in [the `workbench` directory](./workbench).

- `react-native`: Contains Flow declaration dumps for React Native v0.63.3 and a recent main-line commit.
- `artsy-eigen`: Contains the TypeScript sources of a OSS iOS application by [Artsy Inc.](https://github.com/artsy/eigen). This application uses React Native v0.63.3 + TypeScript and thus serves as a good real-world test-bed.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).

## Security

See [the security documentation](./SECURITY.md).

## License

This tool is available under [the MIT license](./LICENSE).

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow Microsoft's Trademark & Brand Guidelines. Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party's policies.
