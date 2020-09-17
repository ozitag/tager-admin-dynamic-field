import { setAccessToken } from '@tager/admin-services';
import '@tager/admin-ui/dist/admin-ui.css';

const accessToken = process.env.VUE_APP_ACCESS_TOKEN;

if (accessToken) {
  setAccessToken(accessToken);
}
