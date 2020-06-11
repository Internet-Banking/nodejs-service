import keyMirror from 'keymirror'

export const MESSAGE = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  OK: 'OK'
}

export const ACCOUNT_TYPES = keyMirror({
  PAYMENT: null,
  SAVING: null
})

export const BANK_CODE = '88'
export const VN_DESIGNATION_CODE = '9704'

export const TRANSACTION_FEE_PAYER = keyMirror({
  SENDER: null,
  RECEIVER: null
})
