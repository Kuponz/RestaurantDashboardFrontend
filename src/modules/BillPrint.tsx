import { useRef } from "react";
import { Printer, Text } from "react-thermal-printer";



export const BillPrint = ({order}) => {

  return (
  <>
    <Text>{order.orderAmount.total}</Text>  
    {order.order.map(orderItem=>(
      <>
        <Text>{orderItem.menuId.itemName}</Text>
        <Text>{orderItem.quantity}</Text>
        <Text>{orderItem.cost}</Text>

      </>
      
    ))}
  </>
  )
}


