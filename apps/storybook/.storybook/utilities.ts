const colors = {
  base: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'],
  shade: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '900', 'a100', 'a200', 'a400', 'a700'],
  borders: ['black', 'white', 'light', 'base', 'dark', 'focus', 'error', 'warning', 'success'],
  fonts: ['base', 'secondary', 'tertiary', 'quaternary', 'link', 'active', 'error', 'warning', 'success', 'disabled', 'inverse-base', 'inverse-secondary', 'inverse-tertiary', 'inverse-quaternary', 'inverse-link', 'inverse-active', 'inverse-error', 'inverse-warning', 'inverse-success', 'inverse-disabled'],
  brands: ['primary-lighter', 'primary-light', 'primary-base', 'primary-dark', 'primary-darker', 'secondary-lighter', 'secondary-light', 'secondary-base', 'secondary-dark', 'secondary-darker'],
  backgrounds: ['base', 'alt', 'disabled', 'inverse', 'success', 'error', 'warning', 'info', 'link', 'low-priority'],
}

export const makeFontColors = () => {
  const colorList: string[] = [];

  colors.brands.forEach(name => {
    colorList.push(`${name}`);
  });

  colors.fonts.forEach(name => {
    colorList.push(`${name}`);
  });

  colors.base.forEach(name => {
    colors.shade.forEach(item => {
      colorList.push(`${name}-${item}`);
    });
  });

  return colorList;
}

export const makeBackgroundColors = () => {
  const colorList: string[] = [];

  colors.brands.forEach(name => {
    colorList.push(`${name}`);
  });

  colors.backgrounds.forEach(name => {
    colorList.push(`${name}`);
  });

  colors.base.forEach(name => {
    colors.shade.forEach(item => {
      colorList.push(`${name}-${item}`);
    });
  });

  return colorList;
}

export const makeBorderColors = () => {
  const colorList: string[] = [];

  colors.borders.forEach(name => {
    colorList.push(`${name}`);
  });

  colors.base.forEach(name => {
    colors.shade.forEach(item => {
      colorList.push(`${name}-${item}`);
    });
  });

  return colorList;
}
