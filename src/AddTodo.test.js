import { render, screen, fireEvent} from '@testing-library/react';
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


test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Complete my IBM Homework"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/Complete my IBM Homework/i);
  //const checkDate = screen.getByText(new RegExp("5/30/2023", "i"));
  expect(check).toBeInTheDocument();
  //expect(checkDate).toBeInTheDocument();
 });



 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: {value: "Complete my IBM Homework"}});
  fireEvent.change(inputDate, {target : {value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, {target : {value: "Complete my IBM Homework"}});
  fireEvent.change(inputDate, {target : {value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByText(/Complete my IBM Homework/i);
  expect(check).toBeInTheDocument();
  const checkLength = screen.getAllByText(/Complete my IBM Homework/i);
  expect(checkLength.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, {target : {value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, {target : {value: "Complete my IBM Homework"}});
  fireEvent.change(inputDate, { target: { value: null}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});  
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value : "Complete my IBM Homework"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkTask = screen.getByRole('checkbox');
  fireEvent.click(checkTask);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy")
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2022";
  fireEvent.change(inputTask, { target: { value : "Complete my IBM Homework"}})
  fireEvent.change(inputDate, { target: { value: dueDate}})
  fireEvent.click(element);

  const check = screen.getByTestId(/Complete my IBM Homework/i).style.background;
  expect(check).toBe("white");
 });

