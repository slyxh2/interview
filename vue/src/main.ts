import { createApp } from 'vue';
import App from './App.vue';
import HelloWorldVue from './components/HelloWorld.vue';

const app = createApp(App);

app.component('Hello', HelloWorldVue); // register global component
const a = app.component('Hello'); // get global component if exist
console.log(a);

app.mount('#app');