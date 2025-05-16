---
title: Vue.js 學習筆記
toc: true
date: 2023-01-19 15:53:49
tags:
---


## 聲明式渲染 Declarative Rendering

vue核心功能是聲明式渲染:不用關心渲染過程怎麼樣，只要告訴機器最終結果是甚麼就好

在template標籤內的語法用`{{ }}`渲染動態文字, 可以根據js當前狀態去改變現在HTML的樣子

```javascript
<script>
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>

<template>
  <h1>{{ message }}</h1>
</template>
```

`{{ }}`內可以執行任何js表達式, ex:

```javascript
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<!--more-->

## 屬性綁定 Attribute Bindings

屬性綁定要用`v-bind`指令

```javascript
<div v-bind:id="dynamicId"></div>
```

簡寫用`:` 代替 `v-bind`

用屬性綁定html標籤class類別名稱, 名稱在data组件控制

```javascript
<script>
export default {
  data() {
    return {
      titleClass: 'title'
    }
  }
}
</script>

<template>
  <h1 :class=titleClass>Make me red</h1>
</template>

<style>
.title {
  color: red;
}
</style>
```

## 事件監聽器 Event Listeners

事件監聽綁定用`v-on`

```javascript
<button v-on:click="increment">{{ count }}</button>
```

簡寫用`@`代替`v-on`

```javascript
<button @click="increment">{{ count }}</button>
```

新增按鈕綁定累加功能, 顯示在畫面

```javascript
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods:{
    increment(){
      this.count++
    }
  }
}
</script>

<template>
  <button @click="increment">count is: {{ count }}</button>
</template>
```

## 表單綁定 Form Bindings

延續事件監聽方式,可以實作出表單填入後即時顯示輸入文字功能

```javascript
<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onInput(e) {
      this.text = e.target.value
    }
  }
}
</script>

<template>
  <input :value="text" @input="onInput" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```

簡化`v-bind`與`v-on`的雙向綁定方法是`v-model`

```javascript
<input v-model="text">
//等同於以下程式碼
<input :value="text" @input="text = $event.target.value" />
```

雙向綁定:與text參數自動同步不需額外寫事件

组件適用於text inputs、checkboxes, radio buttons, select dropdowns
[更多範例](https://vuejs.org/guide/essentials/forms.html)

## 條件渲染 Conditional Rendering

使用`v-if`來渲染一個元素

```javascript
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

## 表單渲染 List Rendering

使用`v-for`指令來依序渲染儲存在陣列中的元素

```javascript
//todos: [
//        { id: 1, text: 'Learn HTML' },
//        { id: 2, text: 'Learn JavaScript' },
//        { id: 3, text: 'Learn Vue' }
//      ]
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

## 計算屬性 Computed Property

在Vue中寫聲明式渲染

```javascript
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

把上述的判斷式移到computed Property, 以function化的方式呼叫

```javascript
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}

<p>Has published books:</p>
<span>{{ publishedBooksMessage  }}</span>
```

### Computed Caching vs. Methods

```javascript
// in component
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
},
computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
```

以上兩個function輸出結果一模一樣, 差異在於computed內的function有快取的機制

當computed內使用的原始資料沒有更動時, 會回傳前一次計算好的結果,但Method每次都會計算一次

## Lifecycle and Template Refs 生命週期與模板引用

要對DOM元素的操作,使用模板引用

```javascript
<p ref="p">hello</p>
```

在生命週期初始化Vue组件之後會到`mounted`狀態
`this.$refs`中的`this.$refs.p`就會等同於`<p>`標籤的元素

在掛載後可以在`mounted`改變`<p>`標籤的元素的值

```javascript
<script>
export default {
  mounted(){
    this.$refs.p.textContent = "123"
  }
}
</script>

<template>
  <p ref="p">hello</p>
</template>
```

這稱為生命週期掛鉤，它允許我們註冊一個callback，以便在組件生命週期的特定時間調用

## Watchers 監聽器

監聽參數的數值變化, 當數值變化時進行額外操作

```javascript
<script>
export default {
  data() {
    return {
      todoId: 1,
      todoData: null
    }
  },
  methods: {
    async fetchData() {
      this.todoData = null
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${this.todoId}`
      )
      this.todoData = await res.json()
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    todoId(){
      this.fetchData()
    }
  }
}
</script>

<template>
  <p>Todo id: {{ todoId }}</p>
  <button @click="todoId++">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <pre v-else>{{ todoData }}</pre>
</template>
```

### Computed  vs. Watch

```javascript
  data: () => ({
    blogPosts: ["123", "456", "214"],
    count: 3,
  }),
  computed: {
     count() {
       return this.blogPosts.length;
     },
  },
  watch: {
    blogPosts: {
      handler(newVal) {
        this.count = newVal.length;
      },
    },
  }
```

computed與watch都可以實現顯示當前部落格數量的功能, computed很簡單的可以完成, 但watch需要監聽`blogPosts`, 還要手動修改另一個參數的值

## Components 组件

把模組化的组件引用近來

```javascript
<script>
import ChildComp from './ChildComp.vue'
export default {
  components: {
    ChildComp
  }
  // register child component
}
</script>

<template>
  <ChildComp />
</template>
```

### 讓組件支持v-model指令

在子組件上使用v-model, 子組件中設定`props: ['modelValue']`把參數接起來, 宣告`emits: ['update:modelValue']`事件更新值

`modelValue`名稱固定

```javascript
//parent.vue
<template>
  <main>
    <SearchInput v-model="searchTerm" />
    <p>{{ searchTerm }}</p>
  </main>
</template>

<script>
import SearchInput from './components/SearchInput.vue';
export default {
  components: { SearchInput },
  data() {
    return {
      searchTerm: '',
    };
  }
};
</script>
```

```javascript
//SearchInput.vue
<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
};
</script>
```

vue 2.x版本跟3.x本版差異:

* prop:value -> modelValue
* event:input ->update:modelValue

更多參考[Vue 3 Migration Guide v-model](https://v3-migration.vuejs.org/breaking-changes/v-model.html)

### 組件使用多個v-model

跟使用一個v-model相似, 在`v-model`後新增`v-model:參數名稱`綁定子組件指定props參數

```javascript
// parent.vue
<template>
  <main>
    <SearchInput v-model:searchTerm="searchTerm" v-model:category="category" />
    <p>searchTerm:{{ searchTerm }}</p>
    <p>category:{{ category }}</p>
  </main>
</template>

<script>
import SearchInput from './components/SearchInput.vue';
export default {
  components: { SearchInput },
  data() {
    return {
      searchTerm: '',
      category: '',
    };
  }
};
</script>
```

```javascript
//SearchInput.vue
<template>
  <input
    type="text"
    :value="searchTerm"
    @input="$emit('update:searchTerm', $event.target.value)"
  />

  <select
    :value="category"
    @change="$emit('update:category', $event.target.value)"
  >
    <option v-for="option in options" v-bind:value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>
<script>
export default {
  props: ['searchTerm', 'category'],
  emits: ['update:searchTerm', 'update:category'],
  data() {
    return {
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' },
      ],
    };
  },
};
</script>
```

## Props 傳參數

父组件可以透過props來傳遞參數到子组件中

```javascript
// in child component
export default {
  props: {
    msg: String
  }
}
```

```javascript
<ChildComp :msg="greeting" />
```

props內的參數值是唯讀的,不能被子組件修改,用來確保`單向的資料流`

傳遞動態參數用`v-bind`

### 參數類型及驗證

驗證規則可定義以下參數:

* type: 資料型態
* default: 預設值
* validator:驗證器設定
* required:是否必填

資料型態可傳遞:

* String
* Number
* Boolean
* Array
* Object
* Date
* Function
* Symbol

可以設定其他參數來對傳進來的props進行驗證,
例如參數name必填, 類型是字串

```javascript
// in child component
export default {
  props: {
    name: {
      type: String,
      required: true,
    }
  }
}
```

對數字進行驗證, 如果驗證沒有通過, 會跳出`[Vue warn]: Invalid prop: custom validator check failed for prop XXX`的警告, 不會影響程式執行

```javascript
// in child component
export default {
  props: {
    age: {
      type: Number,
      validator(value) {
        return value > 0;
      }
    }
  }
}

```

### 傳遞未定義參數

如果傳遞未定義在props內的參數到子组件, 會把參數加在`<template>`內第一層元素上

通常用來直接定義樣式, 或是用來參數到傳遞到子子子组件, 增加方便性

可以用`this.$attrs.XXX` 參數名來取得未定義的props值

範例: 賦予子组件class

```javascript
//子组件
<template>
  <div>
    <a :href="link">{{ title }}</a>
  </div>
</template>
```

```javascript
<BlogPostItem
    v-for="post in BlogPostList"
    :key="post.id"
    :title="post.title"
    :link="post.link"
    class="blogLink"
/>

<style>
.blogLink a {
  color: hsl(29, 50%, 60%);
}
</style>
```

如果要取消這個特性, 在子组件中輸入

```javascript
export default{
  inheritAttrs: false
}
```

## Emits 發出事件

子组件觸發父组件事件, 使用`$emit`, 可傳遞參數

```javascript
Vue.component('my-element', {
  template: '<button @click="$emit(\'my-event\')">Click me</button>'
})

```

```javascript
<my-element @my-event="doSomething"></my-element>

//...
methods:{
  doSomething(){
    //...
  }
}
//...
```

傳遞function用`@`,`v-on`

## Slots 插槽

父组件傳Content給子组件的方法,可以自定義樣式

```javascript
<script>
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  data() {
    return {
      msg: 'from parent'
    }
  }
}
</script>

<template>
  <ChildComp><h1>Message: {{ msg }}</h1></ChildComp>
</template>
```

child.vue

```javascript
<template>
  <slot></slot>
</template>
```

### 傳遞多個slot

可以用v-slot傳遞多個slot

```javascript
//parent
<my-component>
  <template v-slot:header>
    <h1>My Component</h1>
  </template>
  <p>This is the default slot</p>
  <template v-slot:footer>
    <p>This is the footer slot</p>
  </template>
</my-component>

```

```javascript
//child
<template>
  <div class="my-component">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

```

## slot取得子组件的屬性

使用slot時可以在子组件中直接傳入參數來讓父组件使用,
概念像是把子组件中的`slot`區塊當成使用一個新的子组件, 提供參數時就使用v-bind`:` 綁定, 而提供者是父组件中的`<template v-slot:default>`區塊, 最後用`=`接起對應參數名

```javascript
//parent
<template>
  <div>
    <ContactList>
      <template v-slot:default="{ contact }">
        <p>{{ contact.name }}</p>
        <p>{{ contact.email }}</p>
      </template>
    </ContactList>
  </div>
</template>

```

```javascript
//child ContactList
<template>
  <ul>
    <li v-for="contact in contacts" :key="contact.id">
      <slot :contact="contact" />
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: 'asd',
          email: 'asdsa@wewq.com',
        },
        {
          id: 2,
          name: 'qwecxz',
          email: 'qweasdzx@sdsad.com',
        }
      ],
    };
  },
};
</script>
```

## Computed vs Watch vs Methods比較

| Computed | Watch | Methods
|:---------:|:----:|:----:|
| 簡單的業務邏輯計算 |耗時的操作和API執行 |可以在Watch, Computed中使用|
| 可以直接在HTML中使用|不可以直接在HTML中使用|可以直接在HTML中使用|
|根據依賴的數據計算得出新的數據|監聽數據的變化,並在數據變化時執行相應的操作|定義可調用的方法,通常用於執行交互性操作或計算響應data數據變化
|有返回值/getter|沒有返回值|可以有返回值|
|可以使用setter修改data中的參數值|可以修改data中的參數值|可以修改data中的參數值

## Provide/inject

父组件傳遞給子孫组件的方法, 解決多層傳遞問題

範例:
`MoiveCard`裡面有`MovieItem`组件, `MovieItem`组件裡面有`MovieTitle`组件
要從`MovieCard`內傳遞參數到`MovieTitle`, 使用`provide`讓子孫组件可以透過`inject`讀取

```javascript
//MovieCard.vue
<template>
  <MovieItem />
</template>
<script>
import MovieItem from './MovieItem.vue';
export default {
  components: { MovieItem },
  data() {
    return {
      movie: {
        title: 'this is title',
        content: 'content123',
      },
    };
  },
  provide() {
    return { title: this.movie.title, content: this.movie.content };
  },
};
</script>

```

```javascript
//MovieItem.vue
<template>
  <MovieTitle />
  <h2>content by Movie item {{ content }}</h2>
</template>
<script>
import MovieTitle from './MovieTitle.vue';
export default {
  components: { MovieTitle },
  inject: ['content'],
};
</script>
```

```javascript
//MovieTitle.vue
<template>
  <h2>{{ title }}</h2>
</template>
<script>
export default {
  inject: ['title'],
};
</script>

</script>

```

## Style

### 组件内的多種樣式處裡方法：scoped, module 和 Sass

為屬性加上style的方法有很多種, 在组件中幫p標籤加上style, 直接在`<style>`標籤內宣告即可, 所有子组件都會被`style`內的樣式渲染

```javascript
<template>
  <div>
    <p>app vue style</p>
  </div>
</template>
<style>
p {
  background-color: hsl(200deg, 100%, 60%, 0.7);
  color: white;
  padding: 2rem;
  border-radius: 10px;
}
</style>
```

新增一個组件, 並加上`<style scoped>`, 讓樣式只能在组件內有效, 不會影響其他组件的樣式

```javascript
<template>
  <p>this is scoped style , style只在這個组件內有效</p>
</template>
<script></script>
<style scoped>
p {
  background-color: hsl(260deg, 100%, 60%, 0.7);
  padding: 1em;
  border-radius: 4px;
}
</style>
```

也可以使用SCSS, 但要先安裝Sass `npm install -D sass`

```javascript
<template>
  <div>
    <p>use sass</p>
  </div>
</template>
<style lang="scss" scoped>
div {
  p {
    background-color: hsl(280deg, 100%, 60%);
  }
}
</style>
```

跟`style scope`類似的還有`style module`, 樣式也是僅僅在组件內有效, 但綁定方式不同, 需要用`:class="$style.className"`來綁定

```javascript
<template>
  <div :class="$style.moduleClass">Module Style</div>
</template>

<style module>
.moduleClass {
  color: blue;
}
</style>
```

### 在scoped的style中修改子組件的樣式

`deep`, `slotted`來修改子組件內深層的標籤的樣式

`deep(a)`也等於`::v-deep a`,  `>>> a`

```javascript
<-Parent.vue->
<template>
  <TextComp><div>some text</div></TextComp>
  <TextComp>
    <p>This is some slotted content.</p>
  </TextComp>
</template>
<script>
import TextComp from './TextComp.vue';
export default {
  components: {
    TextComp,
  },
};
</script>
<style scoped>
.text :deep(a) {
  color: gray;
}
</style>

```

```javascript
<-TextComp.vue->
<template>
  <div class="text">
    <a href="#">other element</a>
    <slot></slot>
  </div>
</template>
<style scoped>
:slotted(div) {
  color: red !important;
}
:slotted(p) {
  color: green !important;
}
</style>
```

### 在樣式中綁定響應性數據

使用Range Sliders控制方塊旋轉角度, 在style區塊使用v-bind綁定旋轉角度

```javascript
<template>
  <main>
    <div class="box"></div>
    <div class="control">
      <input type="range" min="0" max="360" v-model="degree" />
    </div>
    <p>degree:{{ degree }}</p>
  </main>
</template>
<script>
export default {
  data() {
    return { degree: 0 };
  },
  computed: {
    degreeStr() {
      return this.degree + 'deg';
    },
  },
};
</script>

<style>
.box {
  width: 250px;
  height: 250px;
  border-radius: 8px;
  background-color: hsl(280deg, 100%, 60%);
  box-shadow: 0 0 24px hsl(280deg, 100%, 70%, 0.5);
  transform: rotate(v-bind(degreeStr));
}
.control {
  margin-top: 64px;
}
</style>
```

## Refs

可以直接訪問DOM元素

以下範例執行特定功能:在網頁打開後, 自動選取畫面上的輸入框, 過5秒後, 移除輸入框的焦點並在主控台顯示輸入值

程式實作邏輯:

1. 在子組件宣告`<input type="text" v-model="inputText" ref="inputControl" />`定義ref名稱
1. 使用`$this.$refs.inputControl`訪問指定輸入框執行focus與blur功能
1. 在父元件使用`<AutoFocus ref="autofocus" />`定義子組件ref名稱
1. 調用`$this.$refs.autofocus`執行子組件內的function

```javascript
//parent.vue
<template>
  <main>
    <AutoFocus ref="autofocus" />
  </main>
</template>

<script>
import AutoFocus from './components/AutoFocus.vue';
export default {
  components: { AutoFocus },
  mounted() {
    setTimeout(() => {
      console.log(this.$refs.autofocus.inputText);
      this.$refs.autofocus.blur();
    }, 5000);
  },
};
</script>
```

```javascript
//AutoFocus.vue
<template>
  <input type="text" v-model="inputText" ref="inputControl" />
</template>
<script>
export default {
  data() {
    return {
      inputText: '',
    };
  },
  mounted() {
    this.$refs.inputControl.focus();
  },
  methods: {
    blur() {
      this.$refs.inputControl.blur();
    },
  },
};
</script>

```

## 參考

[vuejs.org tutorial](https://vuejs.org/tutorial)
