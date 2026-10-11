// Shared personal mark. Link wrappers retain their existing home destination and label.
export function personalLogo(sizeClass, {focusable = false} = {}) {
  return `<span class="personal-logo ${sizeClass}" ${focusable ? 'tabindex="0" role="img" aria-label="Yuwen Chen logo"' : 'aria-hidden="true"'}><span class="personal-logo-shape"><span class="logo-petal"></span><span class="logo-petal"></span><span class="logo-petal"></span><span class="logo-petal"></span></span></span>`;
}
