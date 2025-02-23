import React from "react";
import { ThemeProvider, useColorMode } from "theme-ui";
import { Global } from "@emotion/core";
import styled from "@emotion/styled";

import NavigationFooter from "@components/Navigation/Navigation.Footer";
import NavigationHeader from "@components/Navigation/Navigation.Header";

import { globalStyles } from "@styles";
import theme from "../../gatsby-plugin-theme-ui";
import colors from "../../gatsby-plugin-theme-ui/colors";

interface LayoutProps {
  children: React.ReactChild;
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
function Layout({ children }: LayoutProps) {
  const [colorMode] = useColorMode();
  let finalTheme = theme;

  if (colorMode === "dark") {
    finalTheme = Object.assign({}, theme, { colors: colors.modes[colorMode] });
  }

  return (
    <ThemeProvider theme={finalTheme}>
      <Container>
        <Global styles={globalStyles} />
        <NavigationHeader />
        {children}
        <NavigationFooter />
      </Container>
    </ThemeProvider>
  );
}

export default Layout;

const Container = styled.div`
  position: relative;
  background: ${p => p.theme.colors.background};
  transition: background 0.25s var(--ease-in-out-quad);
  min-height: 100vh;
`;
