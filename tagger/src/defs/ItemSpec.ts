/**
 * The specification for item specification and additional information.
 *
 * e.g. { "name": "resolution", "value": "2560x1440" }
 */
export interface ItemSpec {
  /**
   * The spec name.
   */
  name: string;

  /**
   * The spec value.
   */
  value: string;
}
