### Options

| Key      | Type | Description |
| ----------- | ----------- | ----------- |
| width      | number       | width of editor, require if the supplied element is div. default use the width of the supplied textarea      |
| height   | number        | height of editor, require if the supplied element is div. default use the height of the supplied textarea       |
| autoGrow      | boolean       | the height of editor will grow along with content change if this value is true     |
| value   | string        | the default content value of editor      |
| onChange   | function        | the callback function for every occation of content change       |
| instance   | function        | the callback function for accepting current instance       |
| css   | string        | your own customized css string      |
| skipCss   | boolean        | default:false = replace css style generated by previous instance.      |
| toolbarList   | string[]        | the list of enabled toolbar item, you will also need to enable the associated plugin along with the build-in toolbar item for the feature to work       |
| pluginList   | string[]        | the list of enabled plugin, you will also need to enable the associated plugin along with the build-in toolbar item for the feature to work       |
| langList   | {[key: string]:{[key: string]: string}}        | the new language list       |
| lang   | string        | editor display language       |
| ln   | function        | the customized translation function       |
| cfgList   | string[]        | the list of enabled plugin, you will also need to enable the associated plugin along with the build-in toolbar item for the feature to work       |

### onChange

example onChange function:   
```js
const onChange = (changed) => {
    console.log(changed.key, //the auto increment of change index
    changed.content, //the final content value after changed
    changed.change //the changed delta compare to previous version
    );
}
```

### instance

In application such as React, it might be handy for parent level to receive the current instance of editor.

```js

var _editor;


const instance = (editor) => {
    _editor = editor;
}

var subeditor = new SubEditor(elm, {instance : instance});

console.log(_editor === subeditor );
//true
```

### css

css style will be injected into document head upon initialization. your customized css should overwrite default style. For multiple instances within the same page, setting skipCss=true will prevent current instance from overwritting previous generated css style.   

### toolbarList

The full build-in list of toolbar items are listed as follow, you may change the order as you see fit:   
   
"undo","redo","text","format","link","remove_format","indent","outdent","color","backgroundcolor","align","ol","ul","image", "library","table","hr","source","fullscreen"   

Additonal style items:   
- "seperator" or "|" : a divider with 1px width
- "spacer" : a blank icon width of empty space
- "nextline" : a horizontal line with 1px width moving all the rest of icons to next line


Grouped items:
- "text" : contains "bold", "italic", "underline", "strikethrough", "superscript", and "subscript" which can also be used by their own.
- "format" : contains "paragraph", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", and "code" which can also be used by their own.
- "align" : contains "align_left", "align_center", "align_right", and "align_justify" which can also be used by their own.
   
*note that image and library will require additional config variable setup

### pluginList

The full build-in list of plugins are listed as follow:   
   
"fullscreen","hr", "color","source","align","text","undo","redo","indent","format","remove_format","link", "paste","list", "table","image"

### langList

This is for creating new language or making changes to existing language. The current default English language can be accessed by calling SubEditor.langList.en. All current avaiable languages are en, zhCN, zhTW.

```js

    const langFr = {
        "bold" : "audacieux"
        //...more
    }
    //this will create a new language and set the current display language to fr
    new SubEditor(element, {langList : {fr : langFr}, lang : "fr"});
```

### lang

Default is en, if you want to alter the display language you should change this value, provided that you supply the new language.

### ln

A callback function to translate every language during runtime. This is useful for large project that has its own language settings.

```js
    const lnFunction = (str) => {
        switch(str) {
            case "bold":
                return "bboolldd";
            break;
            default:
                return str;
            break;
        }
    }
    new SubEditor(element, {ln : lnFunction});
```
   
### cfgList

Variables for plugins. Image and library comes with required variables for them to work. Please refer to the image plugin page for detail example.

```js
var imageCfg = {
        //the features to enable, can set to [] if only url is supported
        "image.features" : ["url","upload","library"],

        //the accepted file types (mime format)
        "image.accept.types" : "image/jpeg, image/jpg, image/png, image/apng, image/gif, image/webp",
        "image.library.fetch" : null,
        "image.library.per.page" : 20,
        "image.library.allow.paging" : true,
        "image.library.allow.search" : true,
        "image.upload.url" : "",
        //number in mb, 0: no limit
        "image.upload.max.size" : 0,
        //number in mb, 0: no limit
        "image.upload.max.size.per.file" : 0,
        //0:accept multiple files, 1: accept 1 file
        "image.upload.accept.files" : 0, 
        "image.upload.handler" : null,
        "image.url.rewrite.handler" : (u : string) => { return u.replace('http://','//').replace('https://','//')},
    };
    new SubEditor(element, {cfgList : imageCfg});
```
