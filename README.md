# generator-direct [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status](https://coveralls.io/repos/github/jeka1985/generator-direct/badge.svg?branch=master)](https://coveralls.io/github/jeka1985/generator-direct?branch=master)

> A scaffolder tool for generating blocks, elements and modifiers files (https://en.bem.info/method/key-concepts/). This generator was created as yandex.direct development tool, but will be usefull for any BEM projects.

## Install 
```
$ npm install (-g) yo
$ npm install (-g) generator-direct
```

## Usage

### Creating files

Generation starts with passing entity informantion. You can do it via cli params or use interactive mode:
For quick start lets begin with interactive mode:
```
yo direct
```
![interactive](https://cloud.githubusercontent.com/assets/3533939/13979794/e2408002-f0eb-11e5-82b1-870a439542e7.png)

After few detailing questions files will be created 

![interactive result](https://cloud.githubusercontent.com/assets/3533939/13979792/e05141a0-f0eb-11e5-86ec-247c681575d4.png)

Also you may pass entity data via params:
```
$ yo direct b-block --tech js
```
For acceptable params documentation run generator with ```--help ``` flag

### Multi-creating 

A quite frequent task is creating tech files for few entites at once, for example create moodifier for block with 2 two values. You can pass comma-separated string as ```--v``` param value to rich this goal. Lets create JS and CSS to both values of ```b-some``` modifier ```view```   

```
$ yo direct b-some --m view --v inline,block --tech js,css
```
4 files will be generated:

```
b-some/_view/b-some_view_inline.js
b-some/_view/b-some_view_block.js
b-some/_view/b-some_view_inline.css
b-some/_view/b-some_view_block.css
```

You may pass comma-setarated strings as block name argument and ```--e```, ```--m```, ```--v``` and ```--t``` params.

As an example the following command run 
```
$ yo direct b-some,b-other --elem wrap,item --m view --v inline,block --tech css,md
```
will create 16 files:

```
b-some/__wrap/_view/b-some__wrap_view_inline.css
b-some/__wrap/_view/b-some__wrap_view_block.css
b-some/__item/_view/b-some__item_view_inline.css
b-some/__item/_view/b-some__item_view_block.css
b-other/__wrap/_view/b-other__wrap_view_inline.css
b-other/__wrap/_view/b-other__wrap_view_block.css
b-other/__item/_view/b-other__item_view_inline.css
b-other/__item/_view/b-other__item_view_block.css
b-some/__wrap/_view/b-some__wrap_view_inline.md
b-some/__wrap/_view/b-some__wrap_view_block.md
b-some/__item/_view/b-some__item_view_inline.md
b-some/__item/_view/b-some__item_view_block.md
b-other/__wrap/_view/b-other__wrap_view_inline.md
b-other/__wrap/_view/b-other__wrap_view_block.md
b-other/__item/_view/b-other__item_view_inline.md
b-other/__item/_view/b-other__item_view_block.md
```

Also you may run sub generators directly. 
```
$ yo direct:css b-some
```
As a result the only tech files will be created.

### Deletion

If generation results does not meet you requirements or you made a mistake in params values, you can delete files with passing ```--d``` flag. 

```
$ yo direct b-block-name --tech js,css,deps --d
```

After building list of existing files matching entity scope, generator will prompt you to delete all or selected files.

![del1](https://cloud.githubusercontent.com/assets/3533939/13980823/98f36972-f0f1-11e5-8a2f-27326b215dc8.png)

After approval, files will be removed.

![del2](https://cloud.githubusercontent.com/assets/3533939/13980802/7a34c206-f0f1-11e5-91b3-682f9fa064e4.png)

## Sub-generators

Available tech sub-generators:

- direct:js
- direct:model
- direct:interface
- direct:bemhtml - suports concise (compact) and JS syntax, use ```bemhtml-syntax``` flag to choose syntax type. 
- direct:bh
- direct:bemtree
- direct:css
- direct:stylus
- direct:test
- direct:md
- direct:utils
- direct:deps

## Arguments

* `blockName` - block name

## Params


* `--elem`,  alias `--e`

  Element name

* `--modName`,  alias `--m`

  Modifier name.

* `--modVal`,  alias `--v`

  Modifier value (will be prompted if blank).
  
* `--tech`,  alias `--t`

  Tech set

* `--baseBlock`,  alias `--bb`

  Base block name.
  If ```deps``` in tech set, will be appended to ```mustDeps``` section. 

* `--baseModel`,  alias `--bm`

  Base model name.
  If ```deps``` in tech set, will be appended to ```mustDeps``` section. 

* `--implements`,  alias `--i`

  Interface name.
  If ```deps``` in tech set, will be appended to ```mustDeps``` section. 
  
* `--delete`,  alias `--d`

  Deletion flag.
  
* `--bemhtml-syntax`

  BEMHTML syntax type (js or compact)

* `--level`,  alias `--l`
  Redefenition level (https://en.bem.info/method/key-concepts/#redefinition-level)
  


## Examples

interactive block files creation

```
yo direct b-some
```

... on defined redefinition level   

```
yo direct b-some --l common.blocks
```

creating block modifier

```
$ yo direct b-some --modName muted --modVal yes
```

creating block element

```
$ yo direct b-some --elem child
```

creating modified block element

```
$ yo direct b-some --elem child --modName view --modVal inline
```

creating few entities at one run
```
$ yo direct:css b-some,b-other --elem item,wrap
```

[npm-image]: https://badge.fury.io/js/generator-direct.svg
[npm-url]: https://npmjs.org/package/generator-direct
[travis-image]: https://travis-ci.org/jeka1985/generator-direct.svg?branch=master
[travis-url]: https://travis-ci.org/jeka1985/generator-direct
[daviddm-image]: https://david-dm.org/jeka1985/generator-direct.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jeka1985/generator-direct
[coveralls-image]: https://coveralls.io/repos/jeka1985/generator-direct/badge.svg
[coveralls-url]: https://coveralls.io/r/jeka1985/generator-direct
