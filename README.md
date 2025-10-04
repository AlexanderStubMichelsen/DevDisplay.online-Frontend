# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

You can access the api swagger site on https://devdisplay.online/swagger/index.html

## 3D Art Page Model Hosting

Place any `.glb` assets you want to feature on the `/art` page in `src/assets/art/3dmodels`.

- The viewer automatically discovers files in that folder at build time via Vite's `import.meta.glob`.
- If more than one model exists, a dropdown lets you choose which one to preview.
- The download button links directly to the bundled asset so visitors can save the currently previewed file.
