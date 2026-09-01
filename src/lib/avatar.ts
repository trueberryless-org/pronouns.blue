export function loadAvatar(
  element: HTMLElement,
  imageUrl: string | undefined,
  fallback: string,
) {
  element.textContent = fallback.charAt(0).toUpperCase();
  element.style.removeProperty("background-image");
  if (!imageUrl) return;
  const image = new Image();
  image.addEventListener("load", () => {
    if (!element.isConnected) return;
    element.textContent = "";
    element.style.backgroundImage = `url("${imageUrl}")`;
  });
  image.src = imageUrl;
}
