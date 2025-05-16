---
title: 使用Vue Teleport實作提示框功能
date: 2023-08-23 17:35:04
tags:
---

實作在右下角顯示多個提示框功能

修改index.html部分, 在body區域新增一個`messages`用來放置提示框的位置

```html
//index.html
<!doctype html>
//...
<body>
  <div id="app"></div>
  <div id="messages"></div>
  <script type="module" src="/src/main.js"></script>
</body>
//...
```
<!--more-->
建立提示框組件:

* 使用`Teleport`將組件傳送到原生DOM的`message`位置
* 使用`show`參數決定是否顯示, button手動關閉提示框
* 提供slot區塊讓父元件填入自定義訊息
* `mounted`內設定自動關閉時間
* style區塊定義提示框長寬, 顏色, 預留間距

```javascript
//AlertBox.vue
<template>
  <Teleport to="#messages">
    <div v-if="show" class="alertBox">
      <div @click="show = false">X</div>
      <slot></slot>
    </div>
  </Teleport>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 3000);
  },
};
</script>

<style scoped>
.alertBox {
  width: 350px;
  height: 80px;
  border: 1px solid hsl(280, 100%, 50%);
  border-radius: 8px;
  padding: 24px;

  position: relative;
}
</style>

```

父元件定義message樣式:

* `position: absolute`, `right: 12px`, `bottom: 12px` 將message起始位置定義在畫面右下角
* `display: flex;`啟用Flexbox布局模式, `flex-direction: column-reverse;`指定主軸方向以及在主軸上的排列方式, 讓較晚加入的訊息依序向上顯示
* `gap: 12px`設定訊息框與框之間的間隔

父元件呼叫組件, 在按下button時加入提示框到陣列中, 使用陣列將現有提示框顯示出來, 生成後會自動顯示在畫面右下角

```javascript
<template>
  <button @click="msgs.push(`test message${msgs.length + 1}`)">
    Add message
  </button>
  <AlertBox v-for="msg in msgs">{{ msg }}</AlertBox>
</template>

<script>
import AlertBox from './components/AlertBox.vue';
export default {
  components: { AlertBox },
  data() {
    return {
      msgs: [],
    };
  }
};
</script>

<style>
#messages {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
}
</style>

```
