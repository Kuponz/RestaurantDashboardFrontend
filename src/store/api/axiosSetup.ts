import axios from "axios";
import { GenericResponse } from "./types";

const BASE_URL = "https://etoposqa.up.railway.app/";   //QA URL
//  const BASE_URL = "https://backendetopos.azurewebsites.net/"; //Main URL
// const BASE_URL = "http://localhost:5000/"; //LocalHost Url

const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

// {
//   headers: {
//     Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
//   }
//  }
export const loginUserFn = async (user: any) => {
  const response = await authApi.post("user/login", user);
  return response;
};
export const addDiscount = async (disc)=>{
  const response = await authApi.post(
    "order/applyDiscount",
    disc.val,
    {
      headers: {
        Authorization: "Bearer " + disc?.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
}
export const logoutuserfunction = async (headerAuth: any) => {
  const response = await authApi.post(
    "user/logOut",
    {},
    {
      headers: {
        Authorization: "Bearer " + headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};
export const createUser = async (props) => {
  // console.log({props, userData:props.userObj.userData});
  const response = await authApi.post(
    "user/createUser",
    {
      userData: props.userObj.userData
    },
    {
      headers: {
        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
}
export const createCategory = async (props) =>{
  // console.log({props, userData:props.userObj.userData});
  const response = await authApi.post(
    "menu/createCategoryByRestaurantId",
    {
      ...props.sendData
    },
    {
      headers: {
        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
}
export const createItem = async (props) =>{
  // console.log({props, userData:props.userObj.userData});
  const response = await authApi.post(
    "menu/createMenuByRestaurantId",
    {
      ...props.sendData
    },
    {
      headers: {
        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
}
export const deleteItem = async (props) =>{
  // console.log({props, userData:props.userObj.userData});
  const response = await authApi.post(
    "menu/deleteMenuByRestaurantId",
    {
      "menuId":props.menuId,
      "restaurantId" : props.restaurantId,
    },
    {
      headers: {
        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
}

export const getTables = async (headerAuth, restaurantId) => {
  let reId = restaurantId.length != 0 ? restaurantId[0] : "";
  const response = await authApi.get(
    `restaurant/getTable?restaurantId=${reId}`,
    {
      headers: {
        Authorization: "Bearer " + headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};
export const getMenu = async (table, restaurantId, edit) => {
  let reId = restaurantId.length != 0 ? restaurantId[0] : "";
  const response = await authApi.get(
    `menu/getAllMenuByRestaurantId?tableId=${table}&restaurantId=${reId}&edit=${edit}`,
    {}
  );
  return response;
};
export const getWorkMenu = async (props) => {
  const response = await authApi.get(
    `menu/getCategoryByRestaurantId?restaurantId=${props.restaurantId}`,
    {
      headers: {
        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};
export const getWorkUsers = async (props) => {
  const response = await authApi.get(
    `restaurant/getAllUserByRestaurantId?restaurantId=${props.restaurantId}`,
    {
      headers: {

        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      }
    }
  );
  return response;
};
export const createFloorAdmin = async (props) => {
  const response = await authApi.post(
    `restaurant/createFloor`,
    {
      ...props.req
    },
    {
      headers: {

        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      }
    }
  );
  return response;
};
export const createTableAdmin = async (props) => {
  const response = await authApi.post(
    `restaurant/createTable`,
    {
      ...props.req
    },
    {
      headers: {

        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      }
    }
  );
  return response;
};
// http://localhost:5000/restaurant/getRestaurant?restaurantId=63cb0c2b3f68cb3a0cd577e7
export const getRestaurantById = async (headerAuth, restaurantId) => {
  let reId = restaurantId.length != 0 ? restaurantId[0] : "";
  const response = await authApi.get(
    `restaurant/getRestaurant?restaurantId=${reId}`,
    {
      headers: {
        Authorization: "Bearer " + headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};

export const getCurrentOrderByRestaurantId = async (
  headerAuth,
  restaurantId
) => {
  let reId = restaurantId.length != 0 ? restaurantId[0] : "";
  const response = await authApi.get(
    `order/getCurrentOrder?restaurantId=${reId}`,
    {
      headers: {
        Authorization: "Bearer " + headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};

// order/getOrder?orderId=63cd87dc3d605181ccab6ba2&restaurantId=63cb0c2b3f68cb3a0cd577e7
export const getorderById = async (headerAuth, orderId, restaurantId) => {
  const response = await authApi.get(
    `order/getOrder?orderId=${orderId}&restaurantId=${restaurantId}`,
    {
      headers: {
        Authorization: "Bearer " + headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};
export const getorderHistory = async (props) => {
  const response = await authApi.get(
    `order/getOrderHistory?restaurantId=${props.restaurantId}&startDate=${props.startDate}&endDate=${props.endDate}&pageNumber=${props.pageNumber}&pageSize=${props.pageSize}`,
    {
      headers: {
        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};
export const getdashboardHistory = async (props) => {
  const response = await authApi.get(
    `restaurant/getMainDashboard?restaurantId=${props.restaurantId}&startDate=${props.startDate}&endDate=${props.endDate}`,
    {
      headers: {
        Authorization: "Bearer " + props.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};

export const createOrder = async (details) => {
  const response = await authApi.post(
    "order/createOrder",
    details.orderDetail,
    {
      headers: {
        Authorization: "Bearer " + details.token, //the token is a variable which holds the token
      },
    }
  );
  return response;
};
export const updateOrderStatus = async (details) => {
  const response = await authApi.post(
    "order/changeOrderStatus",
    details.orderDetail,
    {
      headers: {
        Authorization: "Bearer " + details.token, //the token is a variable which holds the token
      },
    }
  );
  return response;
};
export const swapTable = async (details) => {
  console.log(details)
  const response = await authApi.post(
    "order/transferTable",
    {
      "newTableId":details.newTableId,
      "oldTableId":details.oldTableId
    },
    {
      headers: {
        Authorization: "Bearer " + details.headerAuth, //the token is a variable which holds the token
      },
    }
  );
  return response;
};

export const completeOrderStatus = async (details) => {
  const response = await authApi.post("order/completeOrder", details, {
    headers: {
      Authorization: "Bearer " + details.token, //the token is a variable which holds the token
    },
  });
  return response;
};
export const cancelOrderStatus = async (details) => {
  const response = await authApi.post("order/cancelOrder", details.body, {
    headers: {
      Authorization: "Bearer " + details.token, //the token is a variable which holds the token
    },
  });
  return response;
};

export default authApi;
