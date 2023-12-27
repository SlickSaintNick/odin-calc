# odin-calc

A simple calculator with a 'terminal' theme. Key features:
- Keyboard support enabled. Keys supported:
    - 0-9 keys (main or numpad)
    - / * + - (main or numpad)
    - % (Shift-5)
    - p (*P*lus or Minus toggle)
    - Enter (equals - main or numpad)
    - Escape (AC, clear)

If the calculation reaches a number above 8 digits or 7 decimal places, it will display the result in
exponential notation and disable all buttons except Escape / clear.

Repeated presses of "equals" will repeat the previous calculation e.g.:
* 2 * 2 = 4
* = 8
* = 16
* ...

The percent symbol is different to a traditional small calculator, and simply divides the
display by 100 rounding to 2 decimal places.