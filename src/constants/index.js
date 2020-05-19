import keyMirror from 'keymirror'

export const MESSAGE = {
  INTERNAL_SERVER_ERROR: 'Hệ thống lỗi',
  OK: 'OK'
}

export const ACCOUNT_TYPES = keyMirror({
  PAYMENT: null,
  SAVING: null
})
