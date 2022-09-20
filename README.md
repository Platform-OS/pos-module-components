# Component Library Module

Provides [atomic](https://atomicdesign.bradfrost.com/table-of-contents/) Liquid components for pOS projects and renders a dynamic style guide.

## Usage

Once you installed the module you can use the atomic buiding blocks with [theme_render_rc](https://documentation.platformos.com/api-reference/liquid/platformos-tags#theme_render_rc) or a standard `render` tag.
If you'd like to use the component override functionality provided by `theme_render_rc` you can set up the search path preference order in your project's `config.yml`:

```
theme_search_paths:
  - overrides
  - modules/{{ context.constants.THEME }}
  - modules
```

In your project, you can render the component like this:

```
{% liquid
  assign button_params = '{}' | parse_json | hash_merge: weight: 'primary', content: 'Click me'
  theme_render_rc 'components/atoms/button', params: button_params
%}
```

This way `theme_render_rc` will first look for component overrides in the `app/views/partials/overrides` folder. This is where you can define your project-specific component overrides if needed, following the naming convention of `app/views/partials/overrides/components/{atoms|molecules|organisms}/{componentName}.liquid`
Your project-level component overrides have the highest priority, giving you the ability to match your project requirements while still using the shared component library.

The next search path is `modules/{{ context.constants.THEME }}` which is a dynamic path pointing to the currently selected / active theme provided by the [Theme Manager Module](https://github.com/Platform-OS/pos-module-theme-manager). This allows [theme modules](https://github.com/Platform-OS/pos-theme-module-template) to have their own theme-specific component overrides that'd take precedence over the default components.

The last path is `modules` which (based on the Component Library Module's machine name being "components") will render the provided component from the Component Library as a fallback.

## Colors and configuration

If you use a standard theme and the Theme Manager Module then they can provide you the necessary configuration context from the current theme.  
Check the Theme Manager Module's documentation: https://github.com/Platform-OS/pos-module-theme-manager/blob/master/README.md for more details.

## Hooks

The Component Libarary Module implements the `hook_admin_menu` hook to add the style guide page link to the admin if the [Admin Module](https://github.com/Platform-OS/pos-module-admin) is added to your project.
It also implements the `hook_module_info` hook to register itself to the Module registry provided by the [Core Module](https://github.com/Platform-OS/pos-module-core) and implements `hook_permission` to use [access control](https://github.com/Platform-OS/pos-module-permission) in the styleguide page.

## Style guide and Component meta

The module provides a dynamically rendered style guide page at the `/styleguide` url.
The style guide renders every component that is available in your project, and applies the currently selected theme (if available) via the [Theme Manager Module](https://github.com/Platform-OS/pos-module-theme-manager) (it's an optional dependency). If there is no theme in the current project, or the theme manager module is not available then it'll use its fallback theme settings and colors from [/src/colors.default.js](https://github.com/Platform-OS/pos-module-components/blob/master/src/colors.default.js).

The style guide uses the component metadata to show the docs section for every component and to display the component variants automatically.
The component meta is a standard frontmatter section in the component source which serves two purposes: It shows the available params you can pass to the component, and it acts as a "component config blueprint" for the style guide for the component variants.

It's possible that for a component we don't want to show every combination of the possible param values in the style guide. In this case, you as a component developer can provide a _styleguide params_ object in the following format:

```
---
metadata:
  name: Human-readable name of the component
  params:
    param1: param1 value
    param2:
      - param2 value 1
      - param2 value 2
    content: Example content
  styleguide:
    params:
      param1: param1 value to be used in the styleguide
      param2: param2 value to be used in the styleguide
---
```

## Development

The component library is a standalone module and it has its own frontend stack and frontend build system.  
It uses Tailwind CSS under the hood but that doesn't mean that you have to use it in your project. During the frontend build it generates its own minified CSS bundle which you can add to the `<head>` of your app source: https://github.com/Platform-OS/pos-module-components/blob/master/public/assets/components.css.  
If you take a look at the [Tailwind config file](https://github.com/Platform-OS/pos-module-components/blob/master/src/tailwind.config.js) you'll notice that it doesn't have any hardcoded colors or other design tokens. It uses [CSS custom properties (CSS variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) instead which makes it possible to change the look&feel of the components in run time -- by providing the necessary CSS propery declarations in your app. This is exactly how the Theme Manager Module provides the theme configuration to your app.

If you also prefer to use Tailwind in your platformOS project then you can reuse the Tailwind config file from the component library source folder and add it to your root app's frontend build. The only thing you need to remember is to add a default colorscheme file and modify your Tailwind content configuration in your main frontend build to include CSS rules from the Component Library Module's view files (and other sources if needed). For more details on content configation see https://tailwindcss.com/docs/content-configuration.  
In this case you don't need to add the production CSS bundle from the component library, as your main project CSS will contain everything you need.

The frontend build uses [Parcel.js](https://parceljs.org/) as a module bundler.  
You can start Parcel’s builtin dev server in development mode by running `npm run start` from the `src` folder.
This way Parcel will pick up your JS and CSS changes and update development bundle which you can sync to your instance via `pos-cli sync [environment]`.  
For a production build you should run `npm run build`.  
The parcel build produces two separate bundles for the main Component lib and for the style guide. The main entry point for the library is `modules/components/src/components.js`, the entry point for the style guide related modules is `modules/components/src/styleguide.js`.

Please never change the source files or the configuration in the `modules/components` folder (this is also true for every other module).  
Monkey-patching can lead to unexpected results or make it hard to update your modules.  
If you need a component to look different you can always create an override for that specific component in your app or as a custom module in your project repository.  
If you find a bug or you have a suggestion please open a GitHub issue. Thank you! 

## Contribution rules and standards

### Atomic
As a core contributor you should follow the [Atomic Design pattern](https://atomicdesign.bradfrost.com/table-of-contents/). Sometimes it's not easy to categorize a component but you should try to do your best to provide atomic, reusable, customizable building blocks as you write the core components in this library.  

### Try to be DRY
Don't Repeat Yourself (DRY)  
If you repeat anything that has already been defined in code, refactor it so that it only ever has one representation in the codebase. If you stick to this principle, you will ensure that you will only ever need to change one implementation of a feature without worrying about needing to change any other part of the code.  
The rule of thumb here is: Don't over-engineer it, but at least try to be DRY.

### Readability
The code must be easily readable and understandable by ourselves and other developers. Follow the principles of ['Keep It Simple, Stupid' (KISS)](https://en.wikipedia.org/wiki/KISS_principle). Hard to read or obfuscated code is difficult to maintain and debug. Don't be too clever, write code to be read.

### Accessibility
Accessibility is a first-class citizen in the component library.  
Some useful resources and examples:  
https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics#practical_wai-aria_implementations  
https://www.w3.org/WAI/ARIA/apg/  

### Code styling and Linters 
Make sure to enable `.editorconfig` support in your IDE: https://editorconfig.org/#download  
