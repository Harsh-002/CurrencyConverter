import { useId } from "react";
import PropTypes from "prop-types";

const InputBox = ({
  label,
  amount,
  selectedCurrency = "usd",
  onChangeAmount,
  onChangeCurrency,
  disableAmount = false,
  disableCurrency = false,
  currencyOptions = [],
  className = "",
}) => {
  const amountId = useId();
  const currencyId = useId();

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (onChangeAmount) {
      const decimalValue = parseFloat(value).toFixed(2);
      onChangeAmount(Number(decimalValue));
    }
  };

  return (
    <div
      className={`flex items-center justify-between bg-white p-3 rounded-lg shadow ${className}`}
    >
      <div className="flex flex-col gap-2">
        <label className="text-gray-700" htmlFor={amountId}>
          {label}
        </label>
        <input
          id={amountId}
          type="number"
          onInvalid={(e) => e.preventDefault()}
          placeholder="Amount"
          value={amount}
          disabled={disableAmount}
          onChange={handleAmountChange}
          className="rounded-md pl-1 w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700" htmlFor={currencyId}>
          Currency
        </label>
        <select
          name="currency"
          id={currencyId}
          value={selectedCurrency}
          onChange={
            onChangeCurrency && ((e) => onChangeCurrency(e.target.value))
          }
          disabled={disableCurrency}
          className="cursor-pointer bg-gray-100 p-2 rounded-md"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  selectedCurrency: PropTypes.string,
  onChangeAmount: PropTypes.func,
  onChangeCurrency: PropTypes.func,
  disableAmount: PropTypes.bool,
  disableCurrency: PropTypes.bool,
  currencyOptions: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default InputBox;
