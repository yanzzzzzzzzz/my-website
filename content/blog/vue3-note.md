---
title: Vue3 Composition API
toc: true
date: 2023-09-25 12:06:49
tags:
---

## setup

Composition API 功能要寫在`setup`裡面

```javascript
<script>
export defalut {
  setup(){
    //...
  }
}
</script>

```

也可以寫成

```javascript
<script setup>
</script>
```

## ref

* 定義響應性數據
* 參數名稱要+.value來修改資料

```javascript
<template>
  <h1>{{ title }}</h1>
</template> 
<script setup>
import { ref } from 'vue';
const title = ref('title');
title.value = 'new title';
</script>
```
