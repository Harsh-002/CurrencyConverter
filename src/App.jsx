import { useState } from "react";
import "./App.css";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyOptions = useCurrencyInfo(from);
  const options = Object.keys(currencyOptions);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount((amount * currencyOptions[to]).toFixed(2));
  };
  return (
    <>
      <div
        className="w-screen h-screen flex items-center justify-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800")`,
          backgroundSize: "100%",
        }}
      >
        <div className="bg-transparent w-1/3 backdrop-opacity-100 backdrop-blur-lg p-3 rounded-lg border-2 border-amber-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
            className="flex flex-col items-center"
          >
            <div className="w-full my-2">
              <InputBox
                label={"From"}
                amount={amount}
                selectedCurrency={from}
                currencyOptions={options}
                onChangeAmount={(amount) => setAmount(amount)}
                onChangeCurrency={(e) => {
                  setFrom(e.target.value);
                }}
              />
            </div>

            <div
              onClick={swap}
              className="bg-sky-500 text-white font-bold p-2 m-auto rounded-md cursor-pointer hover:bg-sky-400"
            >
              Swap
            </div>
            <div className="w-full my-2">
              <InputBox
                label={"To"}
                amount={convertedAmount}
                selectedCurrency={to}
                disableAmount={true}
                currencyOptions={options}
                onChangeCurrency={(e) => {
                  setFrom(e.target.value);
                }}
              />
            </div>
            <button
              onClick={() => convert()}
              className="bg-sky-500 hover:bg-sky-400 text-white font-bold p-2 rounded-md cursor-pointer"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
