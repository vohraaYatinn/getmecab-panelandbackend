export const returnTripType = (data) => {
    if(data == "one_way"){
        return "One Way"
    }
    if(data == "round_trip"){
        return "Round Trip"
    }
    if(data == "airport"){
        return "Airport"
    }
    if(data == "local"){
        return "local"
    }
    else{
        return ""
    }
}