import useLocalStorage from "./useLocalStorage";

const useInput = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const feildArguments = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };

  return [value, reset, feildArguments];
};

export default useInput;
