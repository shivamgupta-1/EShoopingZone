import React from 'react'
import Login, { validateEmail } from "../Login";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { FaItalic } from 'react-icons/fa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const onSubmit = jest.fn();

it("renders corre<ctly",()=>{
  const {getByTestId} = render( <BrowserRouter>
  <Routes><Route path='*' element={<Login />} /></Routes></BrowserRouter>)

  expect(screen.getByTestId("login-button")).toBeTruthy()
  expect(screen.getByPlaceholderText("username")).toBeTruthy()
})

describe("Test the Login Component", () => {
  test("update Onchange",  () => {
    const {getByTestId} = render( <BrowserRouter>
      <Routes><Route path='*' element={<Login/>} /></Routes></BrowserRouter>)
    const searchInput =  screen.getByPlaceholderText("username");
    fireEvent.change(searchInput,{target:{value:"test"}})
    expect(searchInput.value).toBe("test");
  });
})



