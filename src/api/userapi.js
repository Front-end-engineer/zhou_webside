import request from "@/utils/request";

export function askapi(url, method, data = {}) {
  let parm = {
    url: url,
    method: method,
  };
  if (method == "get" || method == "GET") {
    parm.params = {
      ...data,
    };
  }
  if (method == "post" || method == "POST") {
    parm.data = data;
  }
  return request(parm);
}

// export function askapi(data) {
//     return request({
//         url: '/user/register',
//         method: 'POST',
//         data
//     })
// }
