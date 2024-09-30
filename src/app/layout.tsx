"use client";

import Head from "next/head";
import { Suspense } from "react";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { PersistGate } from "redux-persist/integration/react";

import "@/styles/global.css";
import "@/styles/reset.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

import { Loading } from "@/components";
import { store, persistor } from "@/store";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <Head>
        <link rel="shortcut" href="./favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <CssBaseline />
            <ToastContainer />
            <Box className={styles.containerIndex}>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </Box>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
