/**
  * @desc Typographic utilities
*/

const stacks = {
  primary: 'Poppins, helvetica, sans-serif',
  // secondary: 'serif',
}

const getFontFamily = (stack='primary') => ({ 'font-family': stacks[stack] })

export default {
  ff: getFontFamily,
}
