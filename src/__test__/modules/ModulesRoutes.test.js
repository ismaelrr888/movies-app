import "@testing-library/jest-dom";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ModulesRoutes } from "../../modules/ModulesRoutes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Test in <ModulesRoutes />", () => {
  test("should show Whait...", () => {
    const initState = {
      auth: {
        loading: false,
        checking: true,
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <ModulesRoutes />
      </Provider>
    );
    expect(wrapper.find("h5").exists()).toBe(true);
  });

  test("should show the public route", () => {
    const initState = {
      auth: {
        loading: false,
        checking: false,
        uid: null,
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <ModulesRoutes />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("#public-route").exists()).toBe(true);
  });

  test("should show the private route", () => {
    const initState = {
      calendar: {
        events: [],
      },
      auth: {
        loading: false,
        checking: false,
        uid: "123",
        name: "ismael",
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <ModulesRoutes />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("#movies-container").exists()).toBe(true);
  });
});
