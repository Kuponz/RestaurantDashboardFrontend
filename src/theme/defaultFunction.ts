interface flexBox{
    display:String | undefined;
    justifyContent:String | undefined;
    flexDirection:String | undefined;
    alignItems:String | undefined;
}

interface size{
    width:String | Number,
    height:String | Number,
}



export const flexBox = (
    flexDirection:String = "row",
    justifyContent:String = "center",
    alignItems:String = "center",
):flexBox => {
    return ({
        display:"flex",
        justifyContent,
        flexDirection,
        alignItems
    })
}




export const size = (
    height:String | Number = "100%",
    width:String | Number = "100%",
) :size=>
{
    return ({
        height,
        width 
    })
}