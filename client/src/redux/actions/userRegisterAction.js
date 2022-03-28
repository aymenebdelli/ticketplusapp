import {registrationFullfil,registrationPending,registrationRejected} from '../slices/userRegisterSlice'
import { userRegistration } from '../../api/userApi';

export const newUserRegistration = (frmDt) => async (dispatch) => {
    try {
      dispatch(registrationPending());
  
      const result = await userRegistration(frmDt);
      result.status === true
        ? dispatch(registrationFullfil(result.message))
        : dispatch(registrationRejected(result.message));
  
      console.log(result);
    } catch (error) {
      dispatch(registrationRejected(error.message));
    }
  };