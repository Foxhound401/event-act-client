// import { checkIn, checkOff } from '../firebase/user'

// Set the name of the hidden property and the change event for visibility
let hidden
let visibilityChange
if (typeof document.hidden !== 'undefined') {
  // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden'
  visibilityChange = 'visibilitychange'
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden'
  visibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  visibilityChange = 'webkitvisibilitychange'
}

let checkInTimeout = getTimeout()
let away = false

function getTimeout() {
  return setTimeout(() => {
    // if (!away) {
    //   checkIn && checkIn()
    // }
    checkInTimeout = getTimeout()
  }, 60000)
}

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
    away = true
  } else {
    away = false
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
  // TODO no visibility check
} else {
  // Handle page visibility change
  document.addEventListener(visibilityChange, handleVisibilityChange, false)
}

// window.addEventListener('beforeunload', checkOff)
