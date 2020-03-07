/**
 * Interface to modify delimiters
 *
 * @interface
 */
export interface CpfFormatingDelimiters {
  dot?: string
  dash?: string
}

/**
 * Interface to define hidden characters range
 *
 * @interface
 */
export interface CpfFormatingHiddenRange {
  start?: number
  end?: number
}

export interface CpfFormatingOnFailCallback {
  (value: string): any
}

/**
 * Interface to modify main function behavior
 *
 * @interface
 */
export interface CpfFormatingOptions {
  delimiters?: CpfFormatingDelimiters
  hiddenRange?: CpfFormatingHiddenRange
  onFail?: CpfFormatingOnFailCallback
  hiddenKey?: string
  hidden?: boolean
  escape?: boolean
}
