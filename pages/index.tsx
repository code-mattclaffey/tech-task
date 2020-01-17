import * as React from "react";
import Layout from "../components/Layout/Layout";
import { NextPage } from "next";

// Todo: Titan Tooling needs type definintions added to the npm module.
// @ts-ignore
import { Region, RegionInner, Grid, GridItem } from "@titan-tooling/ui";

import "@titan-tooling/ui/dist/css/main.css";
import "../styles/index.css";
import { Intro } from "../components/Intro";
import { SelectedLocations } from "../components/SelectedLocations";
import { App } from '../components/App';
import { SearchSuggestions } from "../components/SearchSuggestions";
import { SearchContextProvider } from "../components/SearchContext/SearchContext";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Compare your Air">
      <App>
        <SearchContextProvider>
          <Region
            style={{
              "--region-text-color": "var(--white)"
            }}
            additionalClassNames="o-region--center-screen"
          >
            <RegionInner>
              <Grid>
                <GridItem columns={{ xs: '12' }}>
                  <Intro title="Composer of Air">
                    Compare air quality between cities in the UK. <br />
                    Select cities to compare using the search tool below. 
                  </Intro>
                  <SearchSuggestions />
                </GridItem>
                <GridItem columns={{ xs: '12' }}>
                  <SelectedLocations />
                </GridItem>
              </Grid>
            </RegionInner>
          </Region>
        </SearchContextProvider>
      </App>
    </Layout>
  );
};

export default IndexPage;
