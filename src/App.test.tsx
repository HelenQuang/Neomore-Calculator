import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('Calculator App', () => {
  it('renders without errors', () => {
    render(<App />);
  });

  it('displays numbers when buttons are clicked', () => {
    render(<App />);
    const btn1 = screen.getByRole('button', { name: '1' });
    fireEvent.click(btn1);

    const currentDisplay = screen.getByTestId('current-display');
    expect(currentDisplay.textContent).toBe('1');
  });

  it('performs addition correctly', () => {
    render(<App />);
    const btn2 = screen.getByRole('button', { name: '2' });
    const btn3 = screen.getByRole('button', { name: '3' });
    const btnAdd = screen.getByRole('button', { name: '+' });
    const btnEqual = screen.getByRole('button', { name: '=' });
    fireEvent.click(btn2);
    fireEvent.click(btnAdd);

    const previousDisplay = screen.getByTestId('previous-display');
    expect(previousDisplay.textContent).toBe('2');

    fireEvent.click(btn3);
    fireEvent.click(btnEqual);

    const currentDisplay = screen.getByTestId('current-display');
    expect(currentDisplay.textContent).toBe('5');
  });

  it('performs subtraction correctly', () => {
    render(<App />);
    const btn5 = screen.getByRole('button', { name: '5' });
    const btn6 = screen.getByRole('button', { name: '6' });
    const btnMinus = screen.getByRole('button', { name: '-' });
    const btnEqual = screen.getByRole('button', { name: '=' });

    fireEvent.click(btn5);
    fireEvent.click(btnMinus);

    const previousDisplay = screen.getByTestId('previous-display');
    expect(previousDisplay.textContent).toBe('5');

    fireEvent.click(btn6);
    fireEvent.click(btnEqual);

    const currentDisplay = screen.getByTestId('current-display');
    expect(currentDisplay.textContent).toBe('-1');
  });

  it('performs multiplication correctly', () => {
    render(<App />);
    const btn7 = screen.getByRole('button', { name: '7' });
    const btn8 = screen.getByRole('button', { name: '8' });
    const btnDot = screen.getByRole('button', { name: '.' });
    const btnMultiple = screen.getByRole('button', { name: '*' });
    const btnEqual = screen.getByRole('button', { name: '=' });

    fireEvent.click(btn7);
    fireEvent.click(btnMultiple);

    const previousDisplay = screen.getByTestId('previous-display');
    expect(previousDisplay.textContent).toBe('7');

    fireEvent.click(btnDot);
    fireEvent.click(btn8);
    fireEvent.click(btnEqual);

    const currentDisplay = screen.getByTestId('current-display');
    expect(currentDisplay.textContent).toBe('5.6');
  });

  it('performs division correctly', () => {
    render(<App />);
    const btn7 = screen.getByRole('button', { name: '7' });
    const btn3 = screen.getByRole('button', { name: '3' });
    const btnDivide = screen.getByRole('button', { name: '÷' });
    const btnEqual = screen.getByRole('button', { name: '=' });

    fireEvent.click(btn7);
    fireEvent.click(btnDivide);

    const previousDisplay = screen.getByTestId('previous-display');
    expect(previousDisplay.textContent).toBe('7');

    fireEvent.click(btn3);
    fireEvent.click(btnEqual);

    const currentDisplay = screen.getByTestId('current-display');
    expect(currentDisplay.textContent).toBe('2.33');
  });

  it('clears the display when AC button is clicked', () => {
    render(<App />);
    const btn1 = screen.getByRole('button', { name: '1' });
    const btn2 = screen.getByRole('button', { name: '2' });
    const btn3 = screen.getByRole('button', { name: '3' });
    const btnClear = screen.getByRole('button', { name: 'AC' });

    fireEvent.click(btn1);
    fireEvent.click(btn2);
    fireEvent.click(btn3);
    fireEvent.click(btnClear);

    const previousDisplay = screen.getByTestId('previous-display');
    expect(previousDisplay.textContent).toBe('');

    const currentDisplay = screen.getByTestId('current-display');
    expect(currentDisplay.textContent).toBe('');
  });

  it('deletes the last digit when DEL button is clicked', () => {
    render(<App />);
    const btn1 = screen.getByRole('button', { name: '1' });
    const btn2 = screen.getByRole('button', { name: '2' });
    const btn3 = screen.getByRole('button', { name: '3' });
    const btnDelete = screen.getByRole('button', { name: 'DEL' });

    fireEvent.click(btn1);
    fireEvent.click(btn2);
    fireEvent.click(btn3);
    fireEvent.click(btnDelete);

    const currentDisplay = screen.getByTestId('current-display');
    expect(currentDisplay.textContent).toBe('12');
  });

  it("doesn't allow dividing by zero", () => {
    render(<App />);
    const btn9 = screen.getByRole('button', { name: '9' });
    const btn0 = screen.getByRole('button', { name: '0' });
    const btnDivide = screen.getByRole('button', { name: '÷' });
    const btnEqual = screen.getByRole('button', { name: '=' });

    fireEvent.click(btn9);
    fireEvent.click(btnDivide);
    fireEvent.click(btn0);
    fireEvent.click(btnEqual);

    const message = screen.getByTestId('message');
    expect(message.textContent).toBe("⚠ Can't divide by zero");
  });

  it("doesn't allow entering more than 10 digits", () => {
    render(<App />);
    const btn1 = screen.getByRole('button', { name: '1' });

    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);
    fireEvent.click(btn1);

    const message = screen.getByTestId('message');
    expect(message.textContent).toBe("⚠ Can't enter more than 10 digits");
  });

  it('performs sequential calculation correctly', () => {
    render(<App />);
    const btn2 = screen.getByRole('button', { name: '2' });
    const btn3 = screen.getByRole('button', { name: '3' });
    const btn4 = screen.getByRole('button', { name: '4' });
    const btn5 = screen.getByRole('button', { name: '5' });
    const btn6 = screen.getByRole('button', { name: '6' });
    const btnPlus = screen.getByRole('button', { name: '+' });
    const btnMinus = screen.getByRole('button', { name: '-' });
    const btnMultiple = screen.getByRole('button', { name: '*' });
    const btnDivide = screen.getByRole('button', { name: '÷' });
    const btnEqual = screen.getByRole('button', { name: '=' });

    fireEvent.click(btn2);
    fireEvent.click(btnPlus);
    fireEvent.click(btn3);
    fireEvent.click(btnMinus);
    fireEvent.click(btn4);
    fireEvent.click(btnMultiple);
    fireEvent.click(btn5);
    fireEvent.click(btnDivide);
    fireEvent.click(btn6);
    fireEvent.click(btnEqual);

    const currentDisplay = screen.getByTestId('current-display');
    expect(currentDisplay.textContent).toBe('0.83');
  });
});
