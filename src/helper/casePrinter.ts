export const caseDataPrinter = (valueForm: String):String=>{
    let str="";
    switch (valueForm) {
        case "restaurantName":
            str = "Restaurant Name"
            break;
        case "restaurantAddress":
            str = "Restaurant Address"
            break;
        case "restaurantMobileNumber":
            str = "Restaurant Mobile Number"
            break;
        case "billEndMessage":
            str = "End Message"
            break;
        case "kotEndMessage":
            str = "Kot End Message"
            break;
        case "topMessage":
            str = "Kot Top Message"
            break;
        case "restaurantShorts":
            str = "In Short Desc."
            break;
        default:
            str = ""
            break;
    }
    return str;
}