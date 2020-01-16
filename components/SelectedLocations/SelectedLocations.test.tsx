import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { SelectedLocations } from ".";
import { App } from "../App";

afterEach(() => {
    cleanup();
});

describe("<SelectedLocations />", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <App>
                <SelectedLocations />
            </App>
        );

        expect(container).toMatchSnapshot();
    });

    it("should render one selected city", () => {
        const { getAllByTestId } = render(
            <App
                // @ts-ignore
                selectedLocations={[
                    {
                        location: "Punjabi Bagh",
                        city: "Delhi",
                        country: "IN",
                        measurements: [
                            {
                                parameter: "so2",
                                value: "7.8",
                                lastUpdated: "2015-07-24T11:30:00.000Z",
                                unit: "µg/m3",
                                sourceName: "Punjabi Bagh",
                                averagingPeriod: {
                                    unit: "hours",
                                    value: 0.25
                                }
                            },
                            {
                                parameter: "co",
                                value: 1.3,
                                lastUpdated: "2015-08-18T23:30:00.000Z",
                                unit: "mg/m3",
                                sourceName: "CPCB",
                                averagingPeriod: {
                                    unit: "hours",
                                    value: 0.25
                                }
                            },
                            {
                                parameter: "pm25",
                                value: 79,
                                lastUpdated: "2015-10-02T21:45:00.000Z",
                                unit: "µg/m3",
                                sourceName: "CPCB",
                                averagingPeriod: {
                                    unit: "hours",
                                    value: 0.25
                                }
                            }
                        ]
                    }
                ]}
            >
                <SelectedLocations />
            </App>
        );

        expect(getAllByTestId("selected-location").length).toEqual(1);
    });

    it("should remove the selected city when the remove button is clicked", () => {
        const { queryByTestId, queryAllByTestId } = render(
            <App
                // @ts-ignore
                selectedLocations={[
                    {
                        location: "Punjabi Bagh",
                        city: "Delhi",
                        country: "IN",
                        measurements: [
                            {
                                parameter: "so2",
                                value: "7.8",
                                lastUpdated: "2015-07-24T11:30:00.000Z",
                                unit: "µg/m3",
                                sourceName: "Punjabi Bagh",
                                averagingPeriod: {
                                    unit: "hours",
                                    value: 0.25
                                }
                            },
                            {
                                parameter: "co",
                                value: 1.3,
                                lastUpdated: "2015-08-18T23:30:00.000Z",
                                unit: "mg/m3",
                                sourceName: "CPCB",
                                averagingPeriod: {
                                    unit: "hours",
                                    value: 0.25
                                }
                            },
                            {
                                parameter: "pm25",
                                value: 79,
                                lastUpdated: "2015-10-02T21:45:00.000Z",
                                unit: "µg/m3",
                                sourceName: "CPCB",
                                averagingPeriod: {
                                    unit: "hours",
                                    value: 0.25
                                }
                            }
                        ]
                    }
                ]}
            >
                <SelectedLocations />
            </App>
        );

        const button = queryByTestId("remove-btn");

        if (button !== null) {
            fireEvent.click(button);
        }

        expect(queryAllByTestId("selected-location").length).toEqual(0);
    });
});
