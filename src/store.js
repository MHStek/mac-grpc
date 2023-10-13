import { createStore } from 'redux'

const customerDefaultInfo = {
  issuccess: false,
  messagesuccessfulorfailed: 'FAILED',
  message: 'Network or system error',
  customerid: '',
  mobilenumber: '',
  emailaddress: '',
  personalbusinessgroup: '',
  personalbusinessgroupvalue: 0,
  firstname: '',
  lastname: '',
  businessname: '',
  countrycode: '',
  languageid: '',
  operatingcountryyesno: '',
  customerprofilepicimageurl: '',
  userjwttoken: '',
  loginerrorcode: '',
  kycdataenc: '',
}
const initialState = {
  sidebarUnfoldable: true,
  sidebarShow: true,
  customerInfo: customerDefaultInfo,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'setCustomerInfo':
      return { ...state, ...rest }
    case 'logOut':
      return { ...state, customerInfo: customerDefaultInfo }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
