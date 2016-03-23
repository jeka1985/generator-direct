# generator-direct [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status](https://coveralls.io/repos/github/jeka1985/generator-direct/badge.svg?branch=master)](https://coveralls.io/github/jeka1985/generator-direct?branch=master)

>  Direct генератор для Yeoman берет на себя рутинные действия при создании блоков, элементов и модификаторов.
В работе генератор использует самостоятельные саб-генераторы для создания файлов технологий, это позволяет создавать как наборы  так и отдельные файлы. Может быть полезен проектам, использующим BEM

## Установка 
```
$ npm install (-g) yo
$ npm install (-g) generator-direct
```

## Использование
### Создание
Для создания файлов технологий предоставьте генератору данные сущностей. Вы можете работать в интерактивном режиме, либо передать значения парметров заранее.

Начать можно с интерактивного режима, для этого запустите команду
```
yo direct
```
![interactive](https://cloud.githubusercontent.com/assets/3533939/13979794/e2408002-f0eb-11e5-82b1-870a439542e7.png)

Генератор уточнит необходимую информацию, запоминает ваши ответы, чтобы съэкономить ваше время при следующих запусках и создаст файлы технологий.

![interactive result](https://cloud.githubusercontent.com/assets/3533939/13979792/e05141a0-f0eb-11e5-86ec-247c681575d4.png)

Также вы можете передать информацию как параметры:
```
$ yo direct b-block --tech js
```
Для информации о принимаемых параметрах выполните команду 
```
$ yo direct --help 

```
Так как обычно требуется создать сразу несколько технологий для сущностей, используйте основной генератор (app).
Следующая команда, подключив саб-генераторы, создаст файлы перечисленных технологий 

```
$ yo direct b-block-name --tech js,css,deps
```

Также вы можете использовать саб генераторы напрямую. 
```
$ yo direct:css b-some
```
В результате будет создан толлко файл стилей для блока.

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
- direct:bemhtml
- direct:bemtree
- direct:css
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
  

## Создание сущностей

создать блока

```
yo direct b-some
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
