# generator-direct [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

>  scaffolding инструмент для yandex.direct


# Гененрруемые технологии

```bash
css
js
md
deps
test
utils
bemtree
bemhtml
interface
model

```

# Параметры

```bash
--elem      - название элемента
--modName   - название модификатора
--modVal    - значение модификатора
--baseBlock - базовый блок
--baseModel - базовая модель
--tech      - набор технологий

```

# Создание сущностей

```bash
yo direct b-some
```

# Создание модификатора блока

```bash
yo direct b-some --modName view --modVal inline
```

# Создание элемента блока

```bash
yo direct b-some --elem item
```

# Создание модифицированного элемента блока

```bash
yo direct b-some --elem item --modName view --modVal inline
```

## License

 © [Eugene Yemelin]()

[npm-image]: https://badge.fury.io/js/generator-qwe.svg
[npm-url]: https://npmjs.org/package/generator-qwe
[travis-image]: https://travis-ci.org/jeka1985/generator-qwe.svg?branch=master
[travis-url]: https://travis-ci.org/jeka1985/generator-qwe
[daviddm-image]: https://david-dm.org/jeka1985/generator-qwe.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jeka1985/generator-qwe
[coveralls-image]: https://coveralls.io/repos/jeka1985/generator-qwe/badge.svg
[coveralls-url]: https://coveralls.io/r/jeka1985/generator-qwe
