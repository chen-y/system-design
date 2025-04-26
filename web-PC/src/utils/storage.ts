class StorageValue<V = any> {
  t?: number
  v: V | null

  constructor(v: V | null, t?: number) {
    this.v = v
    this.t = t
  }
}

class Storage {
  prefix = 'sys_'

  constructor() {}

  getKey(key: string) {
    return `${this.prefix ?? ''}${key}`
  }

  getItem<T>(key: string): StorageValue<T> {
    try {
      const value = window.localStorage.getItem(this.getKey(key))
      if (value) {
        const parseValue = JSON.parse(value) as StorageValue<T>
        return new StorageValue(parseValue.v, parseValue.t)
      }

      return new StorageValue(null as T)
    } catch (e) {
      console.info('Get localstorage error', e)
      return new StorageValue(null as T)
    }
  }

  setItem<T>(key: string, value: T) {
    const sV = new StorageValue(value, Date.now())
    window.localStorage.setItem(this.getKey(key), JSON.stringify(sV))
  }

  clearItem(key: string) {
    window.localStorage.removeItem(this.getKey(key))
  }

  getOriginItem(key: string) {
    return window.localStorage.getItem(this.getKey(key))
  }

  setOriginItem(key: string, value: string) {
    window.localStorage.setItem(this.getKey(key), value)
  }
}

const storage = new Storage()
export default storage
