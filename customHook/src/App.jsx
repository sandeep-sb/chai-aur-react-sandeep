import { useState } from 'react';
import './App.css';
import InputBox from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState(0)


  // Object containing currency info
  const currencyInfo = useCurrencyInfo(from);
  // all the keys from currency info for user to select from
  const options = Object.keys(currencyInfo);
  console.log(options);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    // due to some unknown issue, my amount was changing to convertedAmount 
    // but convertedAmount was not changing to amount. Hence I put a delay of 0ms in 
    // setTimeout to let the updation happen.
    setTimeout(()=>{
      setConvertedAmount(amount);
    }, 0)
  }
  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  }

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className="w-full">
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form onSubmit={(e)=>{
            e.preventDefault();
            convert();
          }}>
            <div className="w-full mb-1">
              <InputBox 
                label="FROM"
                amount={amount}
                onAmountChange={(amount)=>setAmount(amount)}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                currencyOptions={options}
              />
            </div>
            <div className="realtive w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >Swap</button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox 
                label="TO"
                amount={convertedAmount}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                currencyOptions={options}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert from {from} to {to}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
