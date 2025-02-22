import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Make libraries available globally for all tests
global.React = React;
global.render = render;
global.screen = screen;
