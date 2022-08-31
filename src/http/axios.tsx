import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import { service_api } from 'utils/global';
import { user_logout } from 'utils/PubSubEvents';
import IAjax from './types';
import PubSub from "pubsub-js";
// import { showMessage } from '../common/utilTools';
// import { MsgStatus } from 'src/common/enum';


axios.defaults.baseURL = service_api;
//=>Set the request header
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30*1000;
interface myConfig extends AxiosRequestConfig {
    userConfig?:any
}
// =>Setting up request interceptors
axios.interceptors.request.use((config:myConfig) => {
        if (config.headers) {
            let token = sessionStorage.getItem('token') || "";
            if (token) {
                // config.headers['Authorization'] = token;
                config.headers['token'] = token;
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// =>Setting up response interceptors
axios.interceptors.response.use((response:AxiosResponse<IAjax>):Promise<any> => {
        if (response.status === 200) {
            if (response.data) {
                if (!response.data.success) {
                    //alert(response.data.message);
                    // showMessage(response.data.message,MsgStatus.warn);
                    if (response.data.code === 401) {
                        PubSub.publish(user_logout);
                        
                    }
                    return Promise.reject(response.data);
                } else {
                    return Promise.resolve(response.data);
                }
            } else {
                return Promise.reject("server busy!")
            }
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export  {
    axios
}
