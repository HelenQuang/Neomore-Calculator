import React, { useState } from 'react';

type ButtonData = {
  label: string;
  onClick: () => void;
  className?: string;
};

const App: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<string>('');
  const [previousDisplay, setPreviousDisplay] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [operation, setOperation] = useState<string | undefined>();
  const [isNewCalculation, setIsNewCalculation] = useState<boolean>(false);

  const clearDisplay = () => {
    setCurrentDisplay('');
    setPreviousDisplay('');
    setOperation(undefined);
    setMessage('');
    setIsNewCalculation(false);
  };

  const deleteDigit = () => {
    setCurrentDisplay((prev) => prev.slice(0, -1));
    setMessage('');
  };

  const appendNumber = (number: string) => {
    if (number === '.' && currentDisplay.includes('.')) return;
    if (currentDisplay.length > 9) {
      setMessage("⚠ Can't enter more than 10 digits");
      return;
    }

    if (isNewCalculation) {
      setCurrentDisplay(number);
      setIsNewCalculation(false);
    } else {
      setCurrentDisplay((prev) => prev + number);
    }

    setMessage('');
  };

  const performSequentialCalculation = (
    current: string,
    previous: string,
    op: string | undefined,
    msg: string
  ) => {
    let computation;
    const previousNum = parseFloat(previous);
    const currentNum = parseFloat(current);

    if (isNaN(previousNum) || isNaN(currentNum)) {
      setMessage('⚠ Invalid calculation');
      return { current, previous, op, msg: '⚠ Invalid calculation' };
    }

    switch (op) {
      // Round up the results to 2 decimals
      case '+':
        computation = Math.round((previousNum + currentNum) * 100) / 100;
        break;
      case '-':
        computation = Math.round((previousNum - currentNum) * 100) / 100;
        break;
      case '*':
        computation = Math.round(previousNum * currentNum * 100) / 100;
        break;
      case '÷':
        if (currentNum === 0) {
          setMessage("⚠ Can't divide by zero");
          return { current, previous, op, msg: "⚠ Can't divide by zero" };
        }
        computation = Math.round((previousNum / currentNum) * 100) / 100;
        break;
      default:
        return { current, previous, op, msg };
    }

    setCurrentDisplay(computation.toString());
    setPreviousDisplay('');
    setOperation(undefined);
    setMessage('');

    return {
      current: computation.toString(),
      previous: '',
      op: undefined,
      msg,
    };
  };

  const calculateResult = () => {
    const { current, previous, op, msg } = performSequentialCalculation(
      currentDisplay,
      previousDisplay,
      operation,
      message
    );

    setCurrentDisplay(current);
    setPreviousDisplay(previous);
    setOperation(op);
    setMessage(msg);
    setIsNewCalculation(true);
  };

  const chooseOperation = (op: string) => {
    if (currentDisplay.length <= 0) {
      if (op !== '-') {
        setOperation(op);
      } else {
        appendNumber(op);
      }
      return;
    }

    const { current } = performSequentialCalculation(
      currentDisplay,
      previousDisplay,
      operation,
      message
    );

    setOperation(op);
    setPreviousDisplay(current);
    setCurrentDisplay('');
    setMessage('');
  };

  const buttonData: ButtonData[] = [
    { label: 'AC', onClick: clearDisplay, className: 'span-two' },
    { label: 'DEL', onClick: deleteDigit },
    { label: '+', onClick: () => chooseOperation('+') },
    { label: '1', onClick: () => appendNumber('1') },
    { label: '2', onClick: () => appendNumber('2') },
    { label: '3', onClick: () => appendNumber('3') },
    { label: '-', onClick: () => chooseOperation('-') },
    { label: '4', onClick: () => appendNumber('4') },
    { label: '5', onClick: () => appendNumber('5') },
    { label: '6', onClick: () => appendNumber('6') },
    { label: '*', onClick: () => chooseOperation('*') },
    { label: '7', onClick: () => appendNumber('7') },
    { label: '8', onClick: () => appendNumber('8') },
    { label: '9', onClick: () => appendNumber('9') },
    { label: '÷', onClick: () => chooseOperation('÷') },
    { label: '.', onClick: () => appendNumber('.') },
    { label: '0', onClick: () => appendNumber('0') },
    { label: '=', onClick: calculateResult, className: 'span-two' },
  ];

  return (
    <main className='calculator'>
      <div className='displays'>
        {message && (
          <p className='message' data-testid='message'>
            {message}
          </p>
        )}
        <div className='previous-display' data-testid='previous-display'>
          {previousDisplay}
        </div>
        <div className='current-display' data-testid='current-display'>
          {operation ? `${operation} ${currentDisplay}` : `${currentDisplay}`}
        </div>
      </div>

      <div className='button-grid'>
        {buttonData.map((button, index) => (
          <button
            type='button'
            name={button.label}
            key={index}
            className={button.className}
            onClick={button.onClick}
          >
            {button.label}
          </button>
        ))}
      </div>
    </main>
  );
};

export default App;
