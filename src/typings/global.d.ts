export { }

declare global {
  interface Window {
    // renderGallery: (elementId: string) => (elementId) => void
    renderGallery: (elementId: string) => void
    renderButton: Render
  }
}

interface Render {
  (elementId: string): void
}
