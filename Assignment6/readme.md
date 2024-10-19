# Assignment 6

## Folder Structure
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   ├── _variables.scss
├── components/
│   ├── _button.scss
│   ├── _destination-card.scss
│   ├── _footer.scss
│   ├── _header.scss
│   ├── _destination-detail.scss
├── layouts/
│   ├── _flexbox.scss
│   ├── _grid.scss
│   ├── _main.scss
├── styles/
│   └── style.scss

## Features Implemented
### destination-grid
a grid layout in the homepage to display travel destinations

### footer-grid
footer 

### destination-flex
display the image and text side by side

### hero
centered title

### variables
Store variables such as color, font-size, etc.

### Nesting
Keep the CSS organized. For example, &hover in btn

### Interpolation
Code Snippet:
.section-title {
  font-#{size}: 2rem;
}

### Placeholder Selectors
define reusable layout components
Code Snippet:
%centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

### Mixins
Code Snippet:
@mixin button-styles($bg-color, $text-color) {
  padding: 10px 20px;
  background-color: $bg-color;
  color: $text-color;
  border-radius: $border-radius;
  &:hover {
    background-color: lighten($bg-color, 10%);
  }
}

### Functions
The lighten() and darken() SASS functions are used to design colors for hover effects in buttons and links.

### Math
ensure correct margin spacing for headings