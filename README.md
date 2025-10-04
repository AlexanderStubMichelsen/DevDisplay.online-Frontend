# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

You can access the api swagger site on https://devdisplay.online/swagger/index.html

## 3D Art Page Model Hosting

The `/art` page includes a carousel-like grid of interactive 3D viewers powered by
[`<model-viewer>`](https://modelviewer.dev/). To showcase your own models, update the
`cadModels` array near the top of `src/components/pages/Art.jsx` with publicly reachable
`.glb` URLs.

- Each entry can provide a `title`, optional `description`, and credit link shown below the viewer.
- Files are streamed directly from their source, so make sure the host supports cross-origin requests.
- A download button is generated automatically, allowing visitors to save the underlying GLB.
