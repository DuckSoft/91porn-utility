/**
 * Widget interface.
 */
export interface Widget {
  /**
   * The render function of the widget.
   * Will be called before mounting the widget.
   * @returns {() => string} the rendered HTML stream.
   */
  render(): string

  /**
   * The mounting function of the widget.
   * Will be called after DOM elements are injected into HTML.
   */
  mount()
}
