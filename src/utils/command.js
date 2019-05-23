import { setName, getUsersInRoom } from '../firebase/user'
import { changeRoom, getCurrentRoom } from '../firebase/chat'

const CMD_LIST = {
  SET_NAME: {
    prefix: ['set-name'],
    help: [
      'Syntax: /set-name (name)',
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
      ' + set-name  -  Change current name.',
      ' + go  - leave and go to a different room.',
      ' + room  - show name of current room.',
      ' + users  - List name of all user in current room.',
      'type /h without any suffix to show this page again.',
    ],
  },
  GO: {
    prefix: ['go'],
    help: ['Syntax: /go (room name)', 'Leave and go to a different room'],
  },
  ROOM: {
    prefix: ['room'],
    help: ['Syntax: /room', 'Show the name of current room'],
  },
  USERS: {
    prefix: ['users'],
    help: ['Syntax: /users', 'List name of all user in current room.'],
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
      return getRes(false, [e.message])
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
  if (CMD_LIST.GO.prefix.indexOf(prefix) > -1) {
    const room = input.substring(prefix.length + 1).trim()
    changeRoom(room)
    return getRes(true, ['Go to room: ' + getCurrentRoom()])
  }
  if (CMD_LIST.ROOM.prefix.indexOf(prefix) > -1) {
    return getRes(true, ['Current room: ' + getCurrentRoom()])
  }
  if (CMD_LIST.USERS.prefix.indexOf(prefix) > -1) {
    const users = await getUsersInRoom()
    return getRes(true, [
      'Users in room ' + getCurrentRoom() + ':',
      ...(!users || users.length === 0
        ? ['No user found']
        : users.map(item => ' + ' + item)),
    ])
  }
  return false
}

export const getParams = (prefix, str, separator = ' ') => {
  return str.subString(prefix.length + 1).split(separator)
}
