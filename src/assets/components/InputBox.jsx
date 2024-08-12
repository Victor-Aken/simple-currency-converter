import React, { useId } from "react";

const InputBox = ({
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  search = "",
  onSearchChange,
  className = "",
}) => {
  const id = useId();
  const id2 = useId()
  return (
    <div
      className={`flex items-center justify-between border border-black rounded-md px-1 py-4 my-2 font-semibold ${className}`}
    >
      <input
        id={id}
        type="number"
        min={0}
        name=""
        placeholder="Amount"
        className="outline-none bg-gray-300 py-2 rounded-md mr-12 pl-2"
        disabled={amountDisabled}
        value={amount}
        onChange={(e) =>
          onAmountChange && onAmountChange(Number(e.target.value))
        }
      />
      <div>
        <input
          type="text"
          name=""
          id={id2}
          placeholder="Search"
          className="outline-none w-28 bg-gray-300 py-2 rounded-md mr-2 pl-2"
          value={search}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
        <select
          name=""
          id=""
          className=" outline-none p-1 cursor-pointer bg-gray-300 py-2 rounded-md"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
