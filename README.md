# AVIT — Landing Page · Foquier Desarrollos

Landing page del proyecto residencial **AVIT** (Av. Italia y Francisco Simón, Montevideo), desarrollado por **Foquier Desarrollos**.

Sitio 100% estático (HTML + CSS + JS vanilla), sin dependencias ni build. Listo para GitHub Pages.

## Estructura

```
avit-landing/
├── index.html          # Página única (one-page)
├── css/styles.css      # Estilos
├── js/main.js          # Menús desplegables, animaciones, lightbox, contadores
└── assets/
    ├── brand/          # Logos Foquier y AVIT (teal y blanco) + favicon
    ├── icons/          # Iconos de amenities (extraídos del brochure)
    └── img/            # Renders y mapa (extraídos del brochure)
```

## Identidad

- **Color primario:** `#00B8AA`
- **Tipografía:** Rotunda Variable vía Adobe Fonts (`https://use.typekit.net/oit7xxm.css`, familia `rotunda-variable`, peso variable 75–900). El dominio donde se publique debe estar autorizado en el proyecto web de Adobe Fonts.

## Publicar en GitHub Pages

1. Crear un repositorio y subir el contenido de esta carpeta a la raíz:
   ```bash
   git init
   git add .
   git commit -m "Landing AVIT"
   git branch -M main
   git remote add origin https://github.com/USUARIO/avit-landing.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. Agregar el dominio de GitHub Pages (`usuario.github.io`) a los dominios permitidos del proyecto en [Adobe Fonts](https://fonts.adobe.com) para que cargue la tipografía.

## Contacto

- +(598) 2409 0579 · +(598) 9399 0474 · info@foquier.com.uy
- Oficina Comercial: Canelones 1748, CP 11200, Montevideo
- Oficina Administrativa: WTC, Avda. Dr. Luis Alberto de Herrera 1248, Of. 1805, CP 11300, Montevideo
