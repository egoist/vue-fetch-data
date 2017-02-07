import axios from 'axios'

export default function (Vue) {
  Vue.prototype.$fetch = function (key) {
    if (this._fetchHandlers && this._fetchHandlers[key]) {
      this._fetchHandlers[key]()
    } else {
      console.error(`[vue-fetch-data] Unknown data property: ${key}`)
    }
  }

  Vue.prototype.$http = axios

  Vue.mixin({
    created() {
      const {fetch} = this.$options

      if (fetch) {
        this._fetchHandlers = {}
        for (const key in fetch) {
          const fetchData = fetch[key]
          let poll

          this._fetchHandlers[key] = () => {
            const value = typeof fetchData === 'function' ? fetchData.call(this, this) : fetchData
            if (typeof value === 'string') {
              handle(this, axios.get(value), key)
            } else if (typeof value === 'object') {
              poll = value.poll
              delete value.poll
              const commit = value.commit
              delete value.commit

              handle(this, axios(value), key, commit)
            }
          }

          this.$fetch(key)
          if (poll) {
            setInterval(() => this.$fetch(key), poll)
          }
        }
      }
    }
  })

  function handle(vm, promise, key, commit) {
    const update = newValue => {
      if (commit) {
        vm.$store.commit(commit, newValue)
      } else {
        vm[key] = newValue
      }
    }

    update({
      pending: true,
      fulfilled: false,
      rejected: false
    })

    promise
      .then(res => {
        update({
          pending: false,
          fulfilled: true,
          rejected: false,
          value: res.data
        })
      })
      .catch(err => {
        update({
          pending: false,
          fulfilled: false,
          rejected: true,
          reason: err
        })
      })
  }
}

