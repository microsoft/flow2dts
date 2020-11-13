interface TextInputNativeCommands<
  T extends
    | React.ForwardRefExoticComponent<any>
    | { new (props: any): React.Component<any> }
    | ((props: any, context?: any) => React.ReactElement | null)
    | keyof JSX.IntrinsicElements
> {}
