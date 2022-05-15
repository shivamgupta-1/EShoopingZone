import React from 'react'
import Register, { validateEmail } from "../Register";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { FaItalic } from 'react-icons/fa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';




it("renders corre<ctly",()=>{
  const {getByTestId} = render( <BrowserRouter>
  <Routes><Route path='*' element={<Register />} /></Routes></BrowserRouter>)

  expect(screen.getByTestId("register-button")).toBeTruthy()
  expect(screen.getByPlaceholderText("full name")).toBeTruthy()
})

describe("Test the register Component", () => {
  test("update Onchange",  () => {
    const {getByTestId} = render( <BrowserRouter>
      <Routes><Route path='*' element={<Register/>} /></Routes></BrowserRouter>)
    const searchInput =  screen.getByPlaceholderText("full name");
    fireEvent.change(searchInput,{target:{value:"test"}})
    expect(searchInput.value).toBe("test");
  });
})