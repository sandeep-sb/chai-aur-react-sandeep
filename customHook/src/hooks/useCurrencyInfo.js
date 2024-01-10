import { useState, useEffect } from "react";

function useCurrencyInfo(currency){

    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/c1440267c7b295c683ad8818/latest/${currency}`)
        .then((res)=>(res.json()))
        .then((res)=>setData(res["conversion_rates"]))

    }, [currency])

    return data;
}

export default useCurrencyInfo;

