import {VN_DESIGNATION_CODE, BANK_CODE} from '../constants'

const generateAccountID = () => {
  return VN_DESIGNATION_CODE + BANK_CODE + Math.random().toString().slice(2, 12)
  /*
  Math.random()     ->  0.12345678901234
      .toString()   -> "0.12345678901234"
      .slice(2,12)  ->   "1234567890"
 */
}

export default generateAccountID
