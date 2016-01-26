# generator-direct
> генератор файлов для директа

## Как пользоваться

Генератор умеет создавать файлы 9 технологий для блока или элемента 

Простейший вариант создания блока:

```bash
yo direct:block b-name
```

Блок с модификатором muted yes:

```bash
yo direct:block b-name muted yes 
```

Блок c заданым набором технологий:

```bash
yo direct:block b-name --tech css,js,deps 
```

Блок c декларированным базовым блоком:

```bash
yo direct:block b-name --baseBlock --tech js 
```

Блок c декларированным интерфейсом:

```bash
yo direct:block b-name --implement i-interface
```

Модель блока с декларированной базовой моделью:

```bash
yo direct:block b-name --baseModel --tech vm 
```

## License

 © [Eugene Yemelin]()

