# generator-direct [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status](https://coveralls.io/repos/github/jeka1985/generator-direct/badge.svg?branch=master)](https://coveralls.io/github/jeka1985/generator-direct?branch=master)

> Данный генератор для Yeoman берет на себя рутинные действия при создании блоков, элементов и модификаторов.
В работе генератор использует самостоятельные саб-генераторы для создания файлов технологий, это позволяет создавать как наборы так и отдельные файлы. Может быть полезен проектам, использующим BEM.

## Установка 
```
$ npm install (-g) yo
$ npm install (-g) generator-direct
```

## Использование

### Создание
Для создания файлов технологий генератору передаются данные сущности. Их можно задать в интерактивном режиме, либо передать значения в виде параметров.

Работа в интерактивном режиме начинается с команды
```
yo direct
```
![interactive](https://cloud.githubusercontent.com/assets/3533939/13979794/e2408002-f0eb-11e5-82b1-870a439542e7.png)

Генератор уточнит необходимую информацию и создаст файлы технологий.

![interactive result](https://cloud.githubusercontent.com/assets/3533939/13979792/e05141a0-f0eb-11e5-86ec-247c681575d4.png)

Также вы можете передать данные в параметрах:
```
$ yo direct b-block --tech js
```
Для получения информации о принимаемых параметрах, запустите генератор с флагом ```--help ```

### Создание файлов для нескольких сущностей

На практике часто требуется создать файлы технологии сразу для нескольких сущностей, например, шаблоны для нескольких модификаций блока. Для этого передайте строку, разделенную запятыми, в значении параметра ```--v```.В примере ниже создаются файлы CSS и JS сразу для двух модификаторов блока.

```
$ yo direct b-some --m view --v inline,block --tech js,css
```
Результатом выполнения будет создание 4 файлов:

```
b-some/_view/b-some_view_inline.js
b-some/_view/b-some_view_block.js
b-some/_view/b-some_view_inline.css
b-some/_view/b-some_view_block.css
```

Множественные значения можно передавать аргументу с именем блока, параметра ```--e```, ```--m```, ```--v``` и ```--t```.

Например команда 
```
$ yo direct b-some,b-other --elem wrap,item --m view --v inline,block --tech css,md
```
создаст уже 16 файлов:

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

Также вы можете использовать саб генераторы напрямую. 
```
$ yo direct:css b-some
```
В результате будет создан только файл стилей для блока.

### Удаление

Если результат генерации не соответсвует требованиям, можно удалить созданные файлы.
Для этого запустите команду с флагом ```--d```. 

```
$ yo direct b-block-name --tech js,css,deps --d
```
Генератор сформирует список существующих файлов для удаления.
Удалить можно все сразу, или выбрать файлы из списка

![del1](https://cloud.githubusercontent.com/assets/3533939/13980823/98f36972-f0f1-11e5-8a2f-27326b215dc8.png)

Подтвердив удаление, файлы будут удалены.

![del2](https://cloud.githubusercontent.com/assets/3533939/13980802/7a34c206-f0f1-11e5-91b3-682f9fa064e4.png)

## Саб-Генераторы

доступные генераторы технологий:

- direct:js
- direct:model
- direct:interface
- direct:bemhtml - поддерживает компактный и JS синтаксис, для настройки используйте флаг ```bemhtml-syntax```
- direct:bh
- direct:bemtree
- direct:css
- direct:stylus
- direct:sass (scss)
- direct:test
- direct:md
- direct:utils
- direct:deps

## Аргументы

* `blockName` - имя блока

## Параметры


* `--elem` или `--e`

  Название элемента.

* `--modName` или `--m`

  Название модификатора.

* `--modVal` или `--v`

  Значение модификатора (если не указано, генератор уточнит его).
  
* `--tech` или `--t`

  Список технологий

* `--baseBlock` или `--bb`

  Название базового блока.
  Если создается deps файл, то базовый блок будет автоматически включен в секцию mustDeps

* `--baseModel` или `--bm`

  Название базовой модели.
  Если создается deps файл, то базовая модель будет автоматически включена в секцию mustDeps

* `--implements` или `--i`

  Название интерфейса.
  Если создается deps файл, то интерфейс будет автоматически включен в секцию mustDeps
  
* `--delete` или `--d`

  Флаг удаления.
  
* `--bemhtml-syntax`

  Синтакс BEMHTML шаблона (js или compact)

* `--level` или `--l`
  Уровень переопределения (https://en.bem.info/method/key-concepts/#redefinition-level)
  

## Создание сущностей

создать блока

```
yo direct b-some
```

создание блока на заданом уровне переопределения 

```
yo direct b-some --l common.blocks
```

создать модификатор блока

```
$ yo direct b-some --modName muted --modVal yes
```

создать элемент блока

```
$ yo direct b-some --elem child
```

создать модифицированный элемент блока

```
$ yo direct b-some --elem child --modName view --modVal inline
```

За один раз можно создавать несколько сущностей
```
$ yo direct:css b-some,b-other --elem item,wrap
```

в результате будет создано 4 файла


## Прикладные примеры

При генерации файла модели учитывается имя блока

```
$ yo direct dm-model --tech model // dm-model/dm-model.js
```

```
$ yo direct b-some --tech model // b-some/b-some.vm.js
```

создать модель с базовой моделью

```
$ yo direct b-some --tech model,deps --baseModel m-some
```

создать блок с i-glue

```
$ yo direct b-some --tech js,deps --baseBlock i-glue
```

создать интерфейс

```
$ yo direct i-interface --tech interface,deps
```

удаление технологий

```
$ yo direct b-some --tech interface,deps,md --d
```

[npm-image]: https://badge.fury.io/js/generator-direct.svg
[npm-url]: https://npmjs.org/package/generator-direct
[travis-image]: https://travis-ci.org/jeka1985/generator-direct.svg?branch=master
[travis-url]: https://travis-ci.org/jeka1985/generator-direct
[daviddm-image]: https://david-dm.org/jeka1985/generator-direct.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jeka1985/generator-direct
[coveralls-image]: https://coveralls.io/repos/jeka1985/generator-direct/badge.svg
[coveralls-url]: https://coveralls.io/r/jeka1985/generator-direct
