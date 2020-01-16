import * as React from "react";
import Layout from "../components/Layout/Layout";
import { NextPage } from "next";
import { Search } from "react-feather";

// Todo: Titan Tooling needs type definintions added to the npm module.
// @ts-ignore
import { Region, RegionInner, Grid, GridItem } from "@titan-tooling/ui";

import "@titan-tooling/ui/dist/css/main.css";
import "../styles/index.css";
import { Intro } from "../components/Intro";
import { SelectedLocations } from "../components/SelectedLocations";
import { LocationsProvider } from '../components/LocationsContext';
import { InputWrapper, Input, Label } from "../components/Input";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Compare your Air">
      <LocationsProvider>
        <Region
          style={{
            "--region-text-color": "var(--white)"
          }}
        >
          <RegionInner additionalClassNames="o-region--full-height o-region--center-screen">
            <Grid>
              <GridItem columns={{ xs: '12' }}>
                <Intro title="Composer of Air">
                  Compare air quality between cities in the UK. <br />
                  Select cities to compare using the search tool below. 
                </Intro>
                <InputWrapper hasIcon width="thin">
                  <Search size={30} />
                  <Input name="search-term" id="search-term" placeholder="Enter a city name" />
                  <Label htmlFor="search-term" additionalClassNames="u-visually-hidden">Enter a city name</Label>
                </InputWrapper>
              </GridItem>
              <GridItem columns={{ xs: '12' }}>
                <SelectedLocations />
              </GridItem>
            </Grid>
          </RegionInner>
        </Region>
      </LocationsProvider>
    </Layout>
  );
};

export default IndexPage;
