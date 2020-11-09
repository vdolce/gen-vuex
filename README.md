# gen-vuex
**gen-vuex** is an **npm package** that helps to create all **vuex** store files you need for each component/view of your **Vue** application.

The **Vue project** must follow the structure inside the folder 'src/store/' as showed below:

```text
src/
├── store/
    ├── store.js    (it has all modules references )
    ├── modules/
        ├── loginStore
            ├── index.js    (this file links state, actions, mutations, getters all together into store.js)
            ├── state.js
            ├── actions.js
            ├── mutations.js
            ├── getters.js
        ├── homepageStore
            ├── index.js
            ├── state.js
            ├── actions.js
            ├── mutations.js
            ├── getters.js
├── views/
    ├── login.Vue
    ├── homepage.Vue
```
This structure could be used for a medium dimension Vue project.  

## Getting started

### Installation

```shell
npm install gen-vuex
```

### Usage

#### 1. Initialize the store path
```shell
gen-vuex-init <storePath> [--store]
```
This command sets up the store folder path (e.g. "src/store" following the structure above).  
Use the option [- -store] if store.js doesn't exist and you want to create it.


Here is the store.js template that will be created with the [- - store] option
```javascript
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {

  } 
});
```

If you've already set up the store path, you can check it out with the following command:
```shell
gen-vuex-init --show-path
```


#### 2. Create all Vuex files
```shell
gen-vuex-create <componentName>
```
This command will create all Vuex files you need for a specific component or view. Files will be created into the a folder named "modules", that will be located into the store path settled before.  
If the store path folder doesn't exist, it will be created.  
Remember, you need to settle the store path before with the gen-vuex-init command.  


For example,
```shell
gen-vuex-create login
```

will create the folder "loginStore" and all files inside. 
```text
src/
├── store/
    ├── store.js
    ├── modules/
        ├── loginStore
            ├── index.js    (link all files state, actions, mutations, getters together into store.js)
            ├── state.js
            ├── actions.js
            ├── mutations.js
            ├── getters.js
```
