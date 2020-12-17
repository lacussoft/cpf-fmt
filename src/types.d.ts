
export type CpfFormattingOptions = {
  delimiters?: {
    dot?: string;
    dash?: string;
  };
  hiddenRange?: {
    start?: number;
    end?: number;
  };
  onFail?: (value: string) => any;
  hiddenKey?: string;
  hidden?: boolean;
  escape?: boolean;
};

export const cpfFmt: (cpfString: string, options?: CpfFormattingOptions) => string
export default cpfFmt
