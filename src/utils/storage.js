/*
封装本地存储模块
*/

/*
存储数据
*/
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/*
获取数据
*/
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data) // 取出若果是字符串则解析成对象返回，若果解析失败则执行catch
  } catch (error) {
    return data
  }
}

/*
删除数据
*/

export const removeItem = key => {
  window.localStorage.removeItem(key)
}
