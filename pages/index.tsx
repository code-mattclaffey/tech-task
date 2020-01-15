import * as React from "react";
import Layout from "../components/Layout/Layout";
import { NextPage } from "next";

// Todo: Titan Tooling needs type definintions added to the npm module.
// @ts-ignore
import { Region, RegionInner, Grid, GridItem } from "@titan-tooling/ui";

import "@titan-tooling/ui/dist/css/main.css";
import "../styles/index.css";
import { Intro } from "../components/Intro";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Compare your Air">
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
            </GridItem>
          </Grid>
        </RegionInner>
      </Region>
    </Layout>
  );
};

export default IndexPage;
