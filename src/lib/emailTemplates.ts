export function emailHeaderCss() {
  return `
            .logo-section { text-align: center; padding: 20px; background-color: #ffffff; }
            .logo-section img { max-width: 100px; height: auto; display: block; margin: 0 auto; }
            .tagline { text-align: center; color: #666; font-style: italic; font-size: 14px; margin-top: 6px; }
  `;
}

export function logoSectionHtml(logoUrl: string) {
  return `
            <div class="logo-section">
              <img src="${logoUrl}" alt="Home Glazer Logo" />
              <div class="tagline">We Paint Your Imagination</div>
            </div>
  `;
}

export default {
  emailHeaderCss,
  logoSectionHtml,
};
