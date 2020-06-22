/* eslint-disable no-console */
import { AxiosError } from 'axios';

class AxiosHandler {
  public exception(err: AxiosError): void {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
    console.log(err);
  }
}

export default AxiosHandler;
