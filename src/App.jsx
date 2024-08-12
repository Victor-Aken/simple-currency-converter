import { useEffect, useState } from "react";
import { InputBox } from "./assets/components/index";
import useCurrencyInfo from "./assets/hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [userSearchFrom, setUserSearchFrom] = useState("");
  const [userSearchTo, setUserSearchTo] = useState("");

  const currencyInfo = useCurrencyInfo(from);
  // console.log(currencyInfo)
  const allCurrencyOptions = Object.keys(currencyInfo);
  // console.log(allCurrencyOptions)
  const searchResultFrom = allCurrencyOptions.filter(search => search.toLowerCase().includes(userSearchFrom.toLowerCase()))

  const searchResultTo = allCurrencyOptions.filter( search => search.toLowerCase().includes(userSearchTo.toLowerCase()))

  useEffect(() => {
    if(userSearchFrom && searchResultFrom.length >= 1){
        setFrom(searchResultFrom[0])
    }
  },[userSearchFrom, searchResultFrom])


  useEffect(() => {
    if(userSearchTo && searchResultTo.length >= 1){
      setTo(searchResultTo[0])
    }
  }, [userSearchTo, searchResultTo])

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className=" bg-[url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className=" w-fit bg-white opacity-90 rounded-md shadow-lg p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            currencyOptions={searchResultFrom || allCurrencyOptions}
            selectedCurrency={from}
            onCurrencyChange={(currency) => setFrom(currency)}
            amount={amount}
            onAmountChange={(amount) => setAmount(amount)}
            search={userSearchFrom}
            onSearchChange={(userSearchFrom) => setUserSearchFrom(userSearchFrom)}
          />
          <div className=" text-center text-red-600 font-semibold">EQUALS</div>
          <InputBox
            currencyOptions={searchResultTo || allCurrencyOptions}
            selectedCurrency={to}
            onCurrencyChange={(currency) => setTo(currency)}
            amount={convertedAmount}
            onAmountChange={(convertedAmount) =>
              setConvertedAmount(convertedAmount)
            }
            search={userSearchTo}
            onSearchChange={(userSearchTo) => setUserSearchTo(userSearchTo)}
            amountDisabled={true}
          />
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md mt-1 hover:bg-blue-900 font-semibold"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
