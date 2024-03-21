# Turan Electronics - интернет магазин

Увидеть сайт вы можете по ссылке - [turan-electronics](https://turanelectronics.kg/)

## Запустить проект:

Нужно склонится через команду - `git clone https://github.com/aibekovislam/turan_electronic.git`:

- После установки выполните команду (если установлен node.js) `npm install`
- (Необязательно) Настройте свойство parserOptions верхнего уровня следующим образом. 

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- После этого вы можете запустить проект с помощью команды - `npm run dev`
