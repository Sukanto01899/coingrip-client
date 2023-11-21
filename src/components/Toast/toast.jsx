import { notifications } from "@mantine/notifications";

const toast = {};

toast.error = ({title, message})=>{
  const ttl = title ? title : 'Something went wrong.'
  const msg = message ? message : 'Try again later.'
  notifications.show({title, message, color: 'red'})
};

toast.success = ({title, message})=>{
  const ttl = title ? title : 'Something went wrong.'
  const msg = message ? message : 'Try again later.'
  notifications.show({title, message: msg, color: 'green'})
}

export default toast;