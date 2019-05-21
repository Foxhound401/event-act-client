import { setName } from '../firebase/user'

const CMD_LIST = {
  SET_NAME: 'set-name',
}

export const getPrefix = (str = '') => {
  return str.split(' ')[0].substring(1)
}

const getRes = (success, msg) => {
  return {
    success,
    msg,
  }
}

export const isCmd = (input = '') => {
  if (!input.startsWith('/') && input.length < 4) return false

  const prefix = getPrefix(input)
  return Object.keys(CMD_LIST).some(key => CMD_LIST[key] === prefix)
}

export const processCmd = async (input = '') => {
  const prefix = getPrefix(input)
  switch (prefix) {
    case CMD_LIST.SET_NAME: {
      try {
        const newName = input.substring(prefix.length + 1)
        if (await setName(newName.trim())) {
          return getRes(true, 'Set Name to ' + newName)
        }
      } catch (e) {
        return getRes(false, e.message)
      }
      break
    }
    default: {
      return false
    }
  }
}

export const getParams = (prefix, str, separator = ' ') => {
  return str.subString(prefix.length + 1).split(separator)
}
