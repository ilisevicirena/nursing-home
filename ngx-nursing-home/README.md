# ngx-nursing-home — Frontend

Angular 15 single-page application for the **Nursing Home Management System**.

➡️ **See the [root README](../README.md)** for the full project overview, features, architecture,
screenshots and live demo.

## Quick start

```bash
npm install
npm start            # http://localhost:4200  (talks to the API)
npm run start:demo   # Demo Mode — seeded in-memory data, no backend required
```

## Notes

- Built on the [ngx-admin](https://github.com/akveo/ngx-admin) template (MIT, © Akveo) for the base
  theme and layout. All application code — feature modules, services, data model and business logic —
  is original work by the author and is covered by the [project license](../LICENSE).
- Demo Mode lives in `src/app/@core/demo/` and is toggled by a build flag, keeping it fully isolated
  from the real application.
