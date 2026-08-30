const colors = {
  names: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'],
  shade: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '900', 'a100', 'a200', 'a400', 'a700'],
  semantic: ['black', 'white', 'light', 'base', 'dark', 'focus', 'error', 'warning', 'success'],
}


export const makeColors = () => {
  const colorList: string[] = [];

  colors.semantic.forEach(name => {
    colorList.push(`${name}`);
  });

  colors.names.forEach(name => {
    colors.shade.forEach(item => {
      colorList.push(`${name}-${item}`);
    });
  });

  return colorList;
}
