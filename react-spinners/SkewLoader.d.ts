/** @jsx jsx */
import * as React from "react";
import { StyleFunction, LoaderSizeProps } from "./interfaces";
declare class Loader extends React.PureComponent<LoaderSizeProps> {
    static defaultProps: LoaderSizeProps;
    style: StyleFunction;
    render(): JSX.Element | null;
}
export default Loader;
