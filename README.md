# VTEX Product Specification Video

## Description

VTEX Store Components is a collection of components that can be used to create/extend others VTEX apps.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
- [CSS Handles](#css-handles)


## Usage

To use this app, you need to import in your dependencies on `manifest.json`.

```json
  "dependencies": {
    "vtex.product-specification-video": "0.x"
  }
```

Then, you can add a component block into your app theme on your product detail page. You can use props to define both the fallback video as well as the specification name to look into for videos.
you will need to select the group name the specification is stored in. (otherwise the code loops through ALL specification, which is not really performant)

```json
"productvideo":{
    "props":{
      "specification": "trailervideo",
      "fallbackvideo": "https://www.youtube.com/watch?v=NQ0HkV4Zp_o",
      "group": "ProductMeta"
      
    }
  }
```


## BONUS 👌💕
You can use any prop that you find on the [VTEX store Video](https://developers.vtex.com/vtex-developer-docs/docs/vtex-store-video) App, except for the VideoURL itself (Src).

## CSS handles
The following CSS handles can be used for styling:

```js
'containerEmpty'
'videoContainer'
```




