import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});



test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  
  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const check = screen.getAllByText(/History Test/i);
  expect(check.length).toBe(1);
  
});


 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
     const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
     const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
     const element = screen.getByRole('button', { name: /Add/i });
     const dueDate = "05/30/2023";
     fireEvent.change(inputTask, { target: { value: "" } });
     fireEvent.change(inputDate, { target: { value: dueDate } });
     fireEvent.click(element);
 });


test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: "" } });
  fireEvent.click(element);


});


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
   const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
   const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
   const element = screen.getByRole('button', { name: /Add/i });
   const dueDate = "05/30/2022";
   fireEvent.change(inputTask, { target: { value: "History Test" } });
   fireEvent.change(inputDate, { target: { value: dueDate } });
   fireEvent.click(element);
   const historyCheck2 = screen.getByTestId("History Test").style.background;
   console.log(historyCheck2)
   expect(historyCheck2).toBe("red")
 });


test('test that App component can be deleted thru checkbox', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });


  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  const checkBox = screen.getByRole('checkbox')
  fireEvent.click(checkBox);

  const check = screen.getByText(/You have no todo's left/);
  expect(check).toBeInTheDocument();

});
