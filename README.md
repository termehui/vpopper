# Popper

PopperJs powered popup for vue 3

## Installation

**Note**: this package require `@popperjs/core` and `animejs` npm package.

### CDN

This package published as `vPopper` module in umd.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@termehui/vpopper/dist/style.css"
/>
<script src="https://unpkg.com/@termehui/vpopper"></script>
```

### NPM

```bash
npm i @termehui/vpopper
```

Install popper container ,popup and tooltip component with default name (popper, popup and tooltip):

```ts
import { createApp } from "vue";
import App from "./App.vue";
import vPopper from "@termehui/vpopper";

createApp(App).use(vPopper).mount("#app");
```

Install popper container, popup and tooltip component with custom name:

```ts
import { createApp } from "vue";
import App from "./App.vue";
import { Popper, Popup, Tooltip } from "@termehui/vpopper";
createApp(App)
  .component("v-popper", Popper)
  .component("v-popup", Popup)
  .component("v-tooltip", Tooltip)
  .mount("#app");
```

## Options

Popper has two level options:

- global options (used by default for all popper)
- popper options (passed as popper property and override global options)

| Property       | Type                               | Description                               | Default   |
| :------------- | :--------------------------------- | :---------------------------------------- | :-------- |
| enterAnimation | `AnimeParams\|PopperFullAnimation` | show animation (animejs animation option) | slide in  |
| leaveAnimation | `AnimeParams\|PopperFullAnimation` | hide animation (animejs animation option) | slide out |

### Change Global Options

You can change global options using `setGlobalOptions` helper.

```ts
import { setGlobalOptions } from "@termehui/vpopper";
setGlobalOptions({
  enterAnimation: {
    opacity: [0, 1],
    duration: 200,
  },
});
```

## Popper Animation

popper use `animejs` for animating. you can use single anime js options or use a object contains four `top`, `left`, `right` and `bottom` animation for different popup placement.

```ts
// Single animation (use for all placements in popper)
const singleAnimation = {
  opacity: [0, 1],
  duration: 200,
};
// Select animation based on popper placement
const fullAnimation = {
  top: {
    translateY: [-20, 0],
    duration: 200,
  },
  left: {
    translateX: [-20, 0],
    duration: 200,
  },
  bottom: {
    translateY: [20, 0],
    duration: 200,
  },
  right: {
    translateX: [20, 0],
    duration: 200,
  },
};
```

## Usage

### Popper (Wrapper Component)

Popper is main container for popper plugin. It contains reference element, popup and configurations of popper. Popper contains two slot:

- the default slot (reference content)
- the popup slot (popup content)

**Note**: reference element can be a single element or a set of elements. if you need to use single element as reference you can change `tag` property and put content inside default slot.

#### Scoped Slots

Default slot contains following attributes:

- **open**: function to show popup
- **close**: function to hide popup
- **action**: function to call popup action handler
- **loading**: reactive object of loading state

**Note**: you can use default slot attributes with manual mode to show/hide popup with custom functionality.

#### Popper Component Properties

| Property | Type                                                | Description                                                                            | Default |
| :------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------- | :------ |
| tag      | `string`                                            | reference element tag. you can set tag name for single element reference (e.g. button) | `span`  |
| trigger  | `"click" \| "focus" \| "hover" \| "manualy"`        | popup show/hide trigger mode                                                           | `hover` |
| onAction | `(key: string, data?: unknown) => Promise<boolean>` | action handler function                                                                | `null`  |
| closable | `boolean`                                           | close popup when click outside of popper                                               | true    |
| options  | `PopperOptions`                                     | popper options                                                                         | `{}`    |
| config   | `PopperJsOptions`                                   | popperJs options                                                                       | `{}`    |

#### Popper Component Events

| Event       | Signature                                       | Description                                                                                 |
| :---------- | :---------------------------------------------- | :------------------------------------------------------------------------------------------ |
| initialized | `(instance: popperJs) => void`                  | triggered when popper component initialized and pass popperJs created instance as event arg |
| show        | `() => void`                                    | triggered after popup opened                                                                |
| hide        | `(mode: "auto" \| "click" \| "action") => void` | triggered after popup closed                                                                |

```html
<!-- Single element -->
<popper tag="button" trigger="hover">
  Hover me
  <template #popup>
    <p>This paragraph shown on element hover</p>
  </template>
</popper>
<!-- Multiple Element -->
<popper tag="div" trigger="focus" :config="{ placement: 'right' }">
  <input type="text" value="first input" />
  <input type="text" value="second input" />
  <input type="text" value="third input" />
  <template #popup>
    <div>This div shown on right side when any of inputs got focus</div>
  </template>
</popper>
```

### Popup (Popup UI Element)

Popup is a graphical popup component and can used inside Popper container as popup ui.

#### Scoped Slots

Default slot contains following attributes:

- **close**: function to hide popup
- **action**: function to call popup action handler
- **loading**: reactive object of loading state

**Caution** if you want to using this functionality in your popup, use `stop` modifier on action button events.

#### Popup Properties

| Property | Type      | Description                          | Default |
| :------- | :-------- | :----------------------------------- | :------ |
| closable | `boolean` | close popup when click on popup body | true    |

#### Popup Events

| Event | Signature                                 | Description             |
| :---- | :---------------------------------------- | :---------------------- |
| show  | `() => void`                              | trigger when popup show |
| hide  | `("blur" \| "click" \| "action") => void` | trigger when popup hide |

```html
<popper trigger="manualy" :closable="false">
  <template #default="{open, close}">
    <button class="is-error" @click.stop="close">Close</button>
    <button class="is-success" @click.stop="open">Open</button>
  </template>
  <template #popup>
    <popup :closable="false">
      <template #default="{ close }">
        This popup shown manualy. <span @click.stop="close">X</span>
      </template>
    </popup>
  </template>
</popper>
```

### Tooltip (Tooltip UI Element)

Tooltip is a graphical popup component and can used inside Popper container as popup ui.

#### Scoped Slots

Default slot contains following attributes:

- **close**: function to hide popup
- **action**: function to call popup action handler
- **loading**: reactive object of loading state

**Caution** if you want to using this functionality in your popup, use `stop` modifier on action button events.

#### Popup Properties

| Property | Type      | Description                          | Default |
| :------- | :-------- | :----------------------------------- | :------ |
| closable | `boolean` | close popup when click on popup body | true    |

#### Popup Events

| Event | Signature                                 | Description             |
| :---- | :---------------------------------------- | :---------------------- |
| show  | `() => void`                              | trigger when popup show |
| hide  | `("blur" \| "click" \| "action") => void` | trigger when popup hide |

```html
<popper trigger="hover">
  <div>Hover me to view tooltip</div>
  <template #popup>
    <tooltip>This is a simple tooltip</tooltip>
  </template>
</popper>
```

### Custom Popup

To create custom popup you need define a normal vue component with popper library composition api `usePopup` helper.

**Note**: for arrow element define a element with `data-popper-arrow` attribute inside your component.

**Note**: use scoped slot for passing usePopup functionality to template.

**Cation**: use `stop` modifier on events otherwise global functionality failed!

#### usePopup Return Values

| Name    | Type                                    | Description                                           |
| :------ | :-------------------------------------- | :---------------------------------------------------- |
| close   | `() => void`                            | close popup                                           |
| action  | `(key: string, data?: unknown) => void` | helper method to call popup action handler            |
| loading | `boolean`                               | loading state                                         |
| onShow  | (cb: MinimalFunction) => void           | helper function to register a callback for show event |
| onHide  | (cb: CloseHandler) => void              | helper function to register a callback for hide event |

```vue
<template>
  <div class="v-popup" :class="{ 'is-loading': loading }" @click.stop="close">
    <!-- Pass usePopup functionality as scoped slot -->
    <slot :action="action" :close="close" :loading="loading" />
    <!-- Define arrow -->
    <div class="arrow" data-popper-arrow></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePopup } from "@termehui/vpopper";
export default defineComponent({
  emits: ["show", "hide"],
  setup(props, { emit }) {
    const { close, action, loading, onShow, onHide } = usePopup();
    onShow(() => emit("show"));
    onHide((mode: "blur" | "click" | "action") => emit("hide", mode));
    return { loading, action, close };
  },
});
</script>
```

## Styling

for using default styles you can use one of static (CSS) or termeh (SCSS) predefined files.

**Note**: advanced feature (change default vars, padding classes and color classes) only available in termeh version of style.

```SCSS
// Static
@import "@termehui/vpopper/style.css";
@import "@termehui/vpopper/dist/style.css"; // old node version
// Termeh
@import "@termehui/vpopper/style.scss";
@import "@termehui/vpopper/dist/style.scss"; // old node version
```

### Popup Styles

Popup by default can contains following parts:

- **arrow**: arrow element.
- **separator**: separator line.
- **attachment**: section for putting content.

**Note**: this elements must placed directly as popup child.

```html
<div class="v-popup">
  <div class="attachment">{{ topContent }}</div>
  <div class="separator"></div>
  <div class="gaper is-auto">
    <button class="is-simple">Cancel</button>
    <button class="is-primary">Approve</button>
  </div>
  <div class="attachment is-footer is-secondary">{{ footerContent }}</div>
  <div class="arrow" data-popper-arrow></div>
</div>
```

#### Popup Classes

You could style your custom component by `v-popup` class.

- **is-loading**: add loading ui to popup.
- **is-{gap}-gaped**: set popup gap (padding and spacing) to registered iterable gaps (Termeh only).
- **is-{color}**: set popup color scheme to registered iterable colors (Termeh only).

#### Attachment Classes

- **is-header**: attach attachment to top of popup.
- **is-footer**: attach attachment to bottom of popup.
- **is-secondary**: make section with darker background.

### Tooltip Styles

Tooltip by default can contains following parts:

- **arrow**: arrow element.

**Note**: this elements must placed directly as popup child.

```html
<div class="v-tooltip">
  <p>{{ content }}</p>
  <div class="arrow" data-popper-arrow></div>
</div>
```

#### Tooltip Classes

You could style your custom component by `v-tooltip` class.

- **is-loading**: add loading ui to tooltip.
- **is-{gap}-padded**: set popup padding to registered iterable gaps (Termeh only).
- **is-{color}**: set popup color scheme to registered iterable colors (Termeh only).

#### Customize Styling

You can override following pre-defined component variable to override default popup styling.

```scss
@include _var("popup", "border", none);
@include _var("tooltip", "primary-shadow", none);
```

| Component | Variable              | Description                                              | Default                         |
| :-------- | :-------------------- | :------------------------------------------------------- | :------------------------------ |
| `popup`   | `border`              | default popup border                                     | `1px solid _color("separator")` |
| `popup`   | `shadow`              | default popup shadow                                     | a soft shadow                   |
| `popup`   | `arrow-color`         | default popup arrow color                                | `_color("shade")`               |
| `popup`   | `gap`                 | default popup padding                                    | `1em`                           |
| `popup`   | `gaps`                | list of non-iterable gaps to include in popup gaps       | `()`                            |
| `popup`   | `colors`              | list of non-iterable colors to include in popup colors   | `()`                            |
| `popup`   | `{color}-border`      | colored popup border                                     | `1px solid $color`              |
| `popup`   | `{color}-shadow`      | colored popup shadow                                     | same as default popup           |
| `popup`   | `{color}-arrow-color` | colored popup arrow color                                | `$color`                        |
| `tooltip` | `background`          | tooltip background color                                 | `rgb(0, 0, 0, 0.9)`             |
| `tooltip` | `shadow`              | default tooltip shadow                                   | a soft shadow                   |
| `tooltip` | `overlay`             | tooltip overlay color                                    | `rgba(0, 0, 0, 0.75)`           |
| `tooltip` | `gaps`                | list of non-iterable gaps to include in tooltip gaps     | `()`                            |
| `tooltip` | `colors`              | list of non-iterable colors to include in tooltip colors | `()`                            |
| `tooltip` | `{color}-shadow`      | colored tooltip shadow                                   | same as default tooltip         |
