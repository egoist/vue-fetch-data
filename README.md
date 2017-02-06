# vue-fetch-data

[![NPM version](https://img.shields.io/npm/v/vue-fetch-data.svg?style=flat)](https://npmjs.com/package/vue-fetch-data) [![NPM downloads](https://img.shields.io/npm/dm/vue-fetch-data.svg?style=flat)](https://npmjs.com/package/vue-fetch-data) [![Build Status](https://img.shields.io/circleci/project/egoist/vue-fetch-data/master.svg?style=flat)](https://circleci.com/gh/egoist/vue-fetch-data) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

> A simple and declarative way to fetch data for Vue components.

## Features

- Small-size, only 800 bytes gzipped
- Fetch and compose data in a declarative way

## Install

```bash
yarn add vue-fetch-data
```

## Usage

An example component which fetches a GitHub user:

```js
import Vue from 'vue'
import FetchData from 'vue-fetch-data'

Vue.use(FetchData)
```

```vue
<template>
  <div>
    <div v-if="user.pending">Loading...</div>
    <div v-if="user.fulfilled">{{ user.value.login }}</div>
    <div v-if="user.rejected">{{ user.reason.message }}</div>
  </div>
</template>

<script>
  export default {
    props: ['username'],
    // make sure you set the initial value of that property to `{}`
    data: () => ({ user: {} }),
    fetch: {
      user: vm => `https://api.github.com/users/${vm.username}`
    }
  }
</script>
```

Then boom, check out live demo at https://vue-fetch-data.surge.sh

### fetch

The `fetch` in component options is an `Object` which is similar to `computed` option.

#### Examples

The value of each entry can be `string` `Object` or a function which returns those. The returned `Object` could contain any [axios](https://github.com/mzabriskie/axios) option, the returned `string` will be used as `url` and fetched in `GET` method.

```js
export default {
  fetch: {
    user() {
      return `https://api.github.com/users/${this.username}`
    },
    article: 'https://get-article-api.com/api/get_post',
    users: {
      url: 'https://get-users/api/users',
      method: 'POST',
      data: {
        offset: 20
      }
    }
  }
}
```

#### poll

Refetch in every `poll` ms:

```js
export default {
  fetch: {
    posts: vm => ({
      url: '/api/posts',
      poll: 1000, // update every second
      params: {
        limit: vm.limit,
        offset: vm.offset
      }
    })
  }
}
```

### state and value

- pending: initial state, not fulfilled or rejected.
- fulfilled: meaning that the operation completed successfully.
- rejected: meaning that the operation failed.
- value: the data which is fetched by the request
- reason: the reason(Error) why the request failed

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**vue-fetch-data** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/vue-fetch-data/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
