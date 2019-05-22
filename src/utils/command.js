import { setName } from '../firebase/user'

const CMD_LIST = {
  SET_NAME: {
    prefix: ['set-name'],
    help: [
      'Syntax: /set-name xxxxx',
      '',
      'Result of name changing will be displayed along with reasons in case of reject',
      '',
      'Name is available only if: ',
      ' - No one is online using that name',
      ' - There is 1 min limit between each name change.',
    ],
  },
  HELP: {
    prefix: ['help', 'h'],
    help: [
      'Syntax: /h (cmd) | /help (cmd)',
      'example, to get directions for set-name cmd, type: /h set-name',
      '',
      'List of available command:',
      ' - set-name',
      'type /h without any suffix to show this page again.',
    ],
  },
}

export const getPrefix = (str = '') => {
  return str.split(' ')[0].substring(1)
}

const getRes = (success, msg = []) => {
  return {
    success,
    msg,
  }
}

export const isCmd = (input = '') => {
  if (!input.startsWith('/') && input.length < 4) return false

  const prefix = getPrefix(input)
  return Object.keys(CMD_LIST).some(
    key => CMD_LIST[key].prefix.indexOf(prefix) > -1
  )
}

export const processCmd = async (input = '') => {
  const prefix = getPrefix(input)
  if (CMD_LIST.SET_NAME.prefix.indexOf(prefix) > -1) {
    try {
      const newName = input.substring(prefix.length + 1)
      if (await setName(newName.trim())) {
        return getRes(true, ['Set Name to ' + newName])
      }
    } catch (e) {
      return getRes(false, e.message)
    }
  }
  if (CMD_LIST.HELP.prefix.indexOf(prefix) > -1) {
    const cmd = input.substring(prefix.length + 1).trim()
    if (!cmd) {
      return getRes(null, CMD_LIST.HELP.help)
    }
    const foundCmd = Object.keys(CMD_LIST).find(
      key => CMD_LIST[key].prefix.indexOf(cmd) > -1
    )
    if (foundCmd) {
      return getRes(null, CMD_LIST[foundCmd].help)
    }
    return getRes(false, ['command not found'])
  }
  return false
}

export const getParams = (prefix, str, separator = ' ') => {
  return str.subString(prefix.length + 1).split(separator)
}
